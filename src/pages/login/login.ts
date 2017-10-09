import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { OAuthService } from 'angular-oauth2-oidc';

import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';

declare const OktaAuth: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({height: 0, opacity: 0}),
        animate('300ms', style({height: '*', opacity: 1}))
      ]),
      transition(':leave', [
        style({height: '*', opacity: 1}),
        animate('300ms', style({height: 0, opacity: 0}))
      ])
    ])
  ]
})

export class LoginPage {

  loginForm: FormGroup;
  private username: string;
  private password: string;
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private oauthService: OAuthService, private toastController: ToastController) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])]
    })

    oauthService.redirectUri = window.location.origin;
    oauthService.clientId = '0oacb7ekc0h4rMZyL0h7';
    oauthService.scope = 'openid profile email';
    oauthService.oidc = true;
    oauthService.issuer = 'https://dev-745257.oktapreview.com';
  }

  login(): void {

    this.submitAttempt = true;

    if (this.loginForm.valid) {

      this.oauthService.createAndSaveNonce().then(nonce => {

        const authClient = new OktaAuth({
          clientId: this.oauthService.clientId,
          redirectUri: this.oauthService.redirectUri,
          url: this.oauthService.issuer
        });

        authClient.signIn({
          username: this.username,
          password: this.password
        }).then((response) => {

          if (response.status === 'SUCCESS') {
            authClient.token.getWithoutPrompt({
              nonce: nonce,
              responseType: ['id_token', 'token'],
              sessionToken: response.sessionToken,
              scopes: this.oauthService.scope.split(' ')
            }).then((tokens) => {
              localStorage.setItem('access_token', tokens[1].accessToken);
              this.oauthService.processIdToken(tokens[0].idToken, tokens[1].accessToken);
              this.navCtrl.setRoot(HomePage);
            }).catch(error => console.error(error));
            
          } else {
            throw new Error('Something went wrong. ' + response.status);
          }

        }).fail((error) => {
          console.error(error);
          let invalidLogin = this.toastController.create({
            message: "Authorization failed! Username or password invalid.",
            duration: 3000
          })
          invalidLogin.present();
        });
      });
    }
    
  }

}
