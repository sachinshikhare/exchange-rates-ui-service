import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponentComponent } from "./login-component/login-component.component"
import {ExchangeRatesComponent} from "./exchange-rates/exchange-rates.component";


const routes: Routes = [
  {
    path: "showExchangeRates", component: ExchangeRatesComponent
  }, {
    path: "login", component: LoginComponentComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
