import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { OAuthService } from 'angular-oauth2-oidc';

import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';

// This is because you're including an external JS library in a TypeScript project
declare const OktaAuth: any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  private username: string;
  private password: string;
  private error: string;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private oauthService: OAuthService) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSubmit() {
    
  }

  login(): void {

    this.submitAttempt = true;

    if (this.loginForm.valid) {
      console.log("Valid form")

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
              this.navCtrl.push(HomePage);
            }).catch(error => console.error(error));
          } else {
            throw new Error('Something went wrong. ' + response.status);
          }
        }).fail((error) => {
          console.error(error);
          this.error = error.message;
        });
      });
    }
    
  }

}
