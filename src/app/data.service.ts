import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class DataService {

  result;
  ratesbody: any;

  constructor(private _http: Http) {}

  getRates() {
    return this._http.get('/rates').map(result => this.result = result.json().data);

  }

  getFixer() {

    return this._http.get('https://api.fixer.io/latest')
    .map(res => res.json());

  }

  saveRates(ratesbody) {

    this.ratesbody = ratesbody;
    

    return this._http.post('/rates', this.ratesbody)
    .map(res => res.json());
  }

  deleteRates(id) {

   return this._http.delete('/rates/' + id)
   .map(res => res.json());
  }

}
