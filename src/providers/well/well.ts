import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WellsProvider {

  constructor(public http: Http) {
  }

  getWells() {
    return this.http.get('/assets/wells.json')
      .map(res => res.json())
  }

}
