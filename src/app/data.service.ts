import { Injectable } from '@angular/core';
import { RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result;
  ratesbody: any;
  keybody: any;

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

  deleteRates(curr) {

  var body = {
    [curr]: 1
  }

let options = new RequestOptions({
   body: body
});
   
   return this._http.delete('/rates', options)
   .map(res => res.json());
  }

}
