import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavParams, ViewController } from 'ionic-angular';

import { WellService } from '../../providers/well-service/well.service';

@Component({
  selector: 'add-well-modal',
  templateUrl: 'add-well-modal.html',
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
  ],
  providers: [WellService]
})
export class AddWellModalComponent {

  wellForm: FormGroup;
  private name: string;
  private location: string;
  private age: number;
  private temperature: number;
  private shutdowns: number;
  submitAttempt: boolean = false;


  constructor(public viewCtrl: ViewController, public navParams: NavParams, public formBuilder: FormBuilder, private wellService: WellService) {
      this.wellForm = formBuilder.group({
          name: ['', Validators.compose([Validators.required])],
          location: ['', Validators.compose([Validators.required])],
          age: ['', Validators.compose([Validators.required])],
          temperature: ['', Validators.compose([Validators.required])],
          shutdowns: ['', Validators.compose([Validators.required])]
      })
  }

  addWell() {
      this.submitAttempt = true;

      if (this.wellForm.valid) {

          let newWell = {
              name: this.name.trim(),
              location: this.location.trim(),
              age: this.age,
              temperature: this.temperature,
              shutdowns: this.shutdowns
          }

        this.wellService.create(newWell)
            .then(well => {
                this.viewCtrl.dismiss(well);
            })
        }
    }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}