import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  username: string = "";
  password: string = "";
  usernameErrorMessage: string = "";
  passwordErrorMessage: string = "";

  constructor(private _router: Router) { }

  ngOnInit(): void {
    console.log("ngOnInit called...")
  }


  onLoginClick() {
    this.usernameErrorMessage = "";
    this.passwordErrorMessage = "";
    if (this.validateUsernameAndPassword()) {
      sessionStorage.setItem("username", this.username);
      sessionStorage.setItem("password", this.password);
      this._router.navigate(['showExchangeRates'])
    }
  }i

  private validateUsernameAndPassword():boolean {
    let result: boolean = true;
    if (this.username.length < 5) {
      this.usernameErrorMessage = "Username should be at least 5 char long";
      result = false;
    }
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!this.password.match(passwordRegex)) {
      this.passwordErrorMessage = "password contains 8 characters, at least one small letter, at least one capital letter, at least one number";
      result = false;
    }
    return result;
  }
}
