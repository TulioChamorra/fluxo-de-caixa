import { Component, OnInit } from '@angular/core';
import {SavingsService} from "./services/savings.service";
import {ActivatedRoute} from "@angular/router";
import {Spent} from "../../models/spent";
import {SavingsModel} from "../../models/savings.model";

@Component({
  selector: 'app-banking-transactions-details',
  templateUrl: './savings-details.component.html',
  styleUrls: ['./savings-details.component.scss']
})
export class SavingsDetailsComponent implements OnInit {
  // @ts-ignore
  savingsModel: SavingsModel;

  // @ts-ignore
  spents: Spent;

  constructor(private crudService: SavingsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let savingsId = '';
    if(this.activatedRoute.snapshot.params['savingsId']){
      let savingsId = this.activatedRoute.snapshot.params['savingsId'];
      if(savingsId !== ''){
        this.loadSavingsDetails(savingsId);
      }
    }
  }

  loadSavingsDetails(savingsId: any){
    this.crudService.loadSavingsInfo(savingsId).subscribe(res => {
      this.savingsModel = res;
    })
  }

}
