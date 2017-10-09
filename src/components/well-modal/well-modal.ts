import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'well-modal',
  templateUrl: 'well-modal.html'
})
export class WellModalComponent {

  public well: string;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.well = this.navParams.get("well");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
