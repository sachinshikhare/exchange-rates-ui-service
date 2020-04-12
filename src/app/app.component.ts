import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'exchange-rates-app';

  constructor(private _router: Router,
              private zone: NgZone,) { }

  ngOnInit(): void {
    this._router.navigate(['login'])
  }
}
