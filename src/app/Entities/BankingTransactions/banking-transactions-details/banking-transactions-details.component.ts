import { Component, OnInit } from '@angular/core';
import {BankingTransactionsService} from "../services/banking-transactions.service";
import {ActivatedRoute} from "@angular/router";
import {BankingTransactionsModel} from "../../../models/banking-transactions.model";

@Component({
  selector: 'app-banking-transactions-details',
  templateUrl: './banking-transactions-details.component.html',
  styleUrls: ['./banking-transactions-details.component.scss']
})
export class BankingTransactionsDetailsComponent implements OnInit {
  // @ts-ignore
  bankingTransactions: BankingTransactionsModel;

  constructor(private crudService: BankingTransactionsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let bankingTransactionsId = '';
    if(this.activatedRoute.snapshot.params['bankingTransactionsId']){
      let bankingTransactionsId = this.activatedRoute.snapshot.params['bankingTransactionsId'];
      if(bankingTransactionsId !== ''){
        this.loadBankingTransactionsDetails(bankingTransactionsId);
      }
    }
  }

  loadBankingTransactionsDetails(bankingTransactionsId: any){
    this.crudService.loadBankingTransactionsInfo(bankingTransactionsId).subscribe(res => {
      this.bankingTransactions = res;
    })
  }
}
