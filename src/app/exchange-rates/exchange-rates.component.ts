import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.css']
})
export class ExchangeRatesComponent implements OnInit {
  exchangeRatesSavedToDB: boolean = false;
  exchangeRatesAvailable: boolean = false;
  username: string;

  arrLength = 0;
  dataToDisplay: any;
  baseCurrency: string;
  note: string = "In above table Month 1 will indicate today's exchange rates. After that each month will show exchange rate on 30 days prior to previous one.";

  arrayTwo(n: number): number[] {
    return [...Array(n).keys()];
  }

  constructor(private http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username")
    this.http.get(
      "http://localhost:8080/api/v1/exchange-rates",     {observe: 'response'}
    ).subscribe((response) =>  {
      if (response.status == 200) {
        this.exchangeRatesSavedToDB = true;
      }
    });
  }

  onDisplayExchangeRates(): void {
    let obs = this.http.get("http://localhost:8080/api/v1/exchange-rates/months");
    obs.subscribe((response) => {
      this.populateDataToDisplay(response)
    });
  }

  private populateDataToDisplay(response: Object) {
    let currencyRatesMap = response["currencyRatesMap"];
    this.baseCurrency = response["baseCurrency"]
    this.dataToDisplay = [];
    let currencies: any = Object.keys(currencyRatesMap);
    this.arrLength = currencyRatesMap[currencies[0]].length;
    let cols = this.arrLength + 1;
    for (let counter =0; counter < currencies.length; counter++) {
      let arr = [currencies[counter]].concat(currencyRatesMap[currencies[counter]])
      this.dataToDisplay.push(arr)
    }
    this.exchangeRatesAvailable = true;
  }

  onLogout(): void {
    sessionStorage.clear();
    this._router.navigate(['login'])
  }
}
