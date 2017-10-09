import { Component } from '@angular/core';
import { trigger, style, animate, transition, keyframes, stagger, query } from '@angular/animations';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { OAuthService } from 'angular-oauth2-oidc'
import { WellsProvider } from '../../providers/well/well';

import { LoginPage } from '../login/login';
import { WellModalComponent } from '../../components/well-modal/well-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('bubbleIn',[
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: 'scale(1)'}), {optional: true}),
        query(':enter', [
            stagger('150ms', [animate('.65s linear', keyframes([
            style({opacity: 0, transform: 'scale(.5)', offset: 0}),
            style({transform: 'scale(1.1)', offset: .5}),
            style({opacity: 1, offset: .57}),
            style({transform: 'scale(.96)', offset: .7}),
            style({transform: 'scale(1.02)', offset: .86}),
            style({opacity: 1, transform: 'scale(1)', offset: 1.0})
          ])
          )])
        ], {optional: true})
        ,
      ])
    ])
  ]
})

export class HomePage {

  wells = [];

  constructor(
    public navCtrl: NavController, 
    private wellsProvider: WellsProvider, 
    public oauthService: OAuthService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Loading Wells...'
    });
    loading.present();
    this.wellsProvider.getWells()
    .subscribe(res => {      
      loading.dismiss()
      for (let i = 0; i < res.length; i++) {
        this.wells.push(res[i])
      }
   }); 
  }

  logout() {
    this.oauthService.logOut();
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

  presentModal(item) {
    const wellModal = this.modalCtrl.create(WellModalComponent, {well: item.name});
    wellModal.present();
  }

}
