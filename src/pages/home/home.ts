import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OAuthService } from 'angular-oauth2-oidc'
import { WellsProvider } from '../../providers/well/well';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public wells = [];

  constructor(public navCtrl: NavController, private wellsProvider: WellsProvider, public oauthService: OAuthService) {

  }

  ionViewDidLoad() {
    this.wellsProvider.getWells()
    .subscribe(res => {
      this.wells = res;
      console.log(this.wells)
    });
  }

  ionViewWillEnter() {
    let wellCards = Array.from(document.getElementsByTagName('ion-card'));

    for (let i = 0; i < wellCards.length; i++) {
      let el = <HTMLElement>wellCards[i]; // Work around Typescript
      el.style.animationDelay = Number(i*.05).toString()+'s';
      el.style.width = 'calc(50% -24px)';
    }
  }

  logout() {
    this.oauthService.logOut();
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

}
