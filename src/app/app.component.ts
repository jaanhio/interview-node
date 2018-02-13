import { Component } from '@angular/core';
import { DataService } from './data.service';

interface Forex {
currency: string,
value: number
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  curr_rates: any;
  results: Array<Forex>;
  
  constructor(private _dataservice: DataService) {
     
     this._dataservice.getFixer().subscribe(res => {
        
        this.curr_rates = res.rates;
        
        this._dataservice.saveRates(this.curr_rates).subscribe(response => {
          
        });
     });
  }
  
  getRatesapi(){

    this._dataservice.getRates().subscribe(response => {

     this.results = response

      console.log(this.results);
    });
  }

  deleteForex(id){
   
    //this._dataservice.deleteRates(id).subscribe(response => {
    console.log("The Array number is: " + id);
  }
}
