import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Well } from '../../models/well';

import 'rxjs/add/operator/toPromise'

@Injectable()

export class WellService {
    private wellsUrl = 'api/wells';
    private headers = new Headers({'Content-Type': 'application/json'})

    constructor(private http: Http) {}

    getWells(): Promise<Well[]> {
        return this.http.get(this.wellsUrl)
                .toPromise()
                .then(response => response.json() as Well[])
                .catch(this.handleError);
    }

    create(well: any): Promise<Well> {
        return this.http
                .post(this.wellsUrl, JSON.stringify(well), {headers: this.headers})
                .toPromise()
                .then(res => res.json() as Well)
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error ocurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}