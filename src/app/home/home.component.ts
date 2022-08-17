import { Component, OnInit } from '@angular/core';
import {Spent} from "../models/spent";
import {ApisService} from "../apis_services/apis.service";
import {Savings} from "../models/savings";
import {Earnings} from "../models/earnings";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // @ts-ignore
  spents: Spent;

  // @ts-ignore
  savings: Savings;

  // @ts-ignore
  earns: Earnings;

  constructor(private apiservice: ApisService) { }

  ngOnInit(): void {
    this.loadSpents();
  }

  loadSpents(){
    this.apiservice.loadSpents().subscribe(res => {
      this.spents = res;
    })

    this.apiservice.loadSavings().subscribe(res => {
      this.savings = res;
    })

    this.apiservice.loadEarnings().subscribe(res => {
      this.earns = res;
    })
  }
}
