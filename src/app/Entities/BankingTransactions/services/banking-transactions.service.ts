import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {HttpResponse} from "../../../models/http-response";
import {BankingTransactionsModel} from "../../../models/banking-transactions.model";
import {Spent} from "../../../models/spent";

@Injectable({
  providedIn: 'root'
})
export class BankingTransactionsService {

  constructor(private httpClient: HttpClient) { }

  loadBankingTransactions(){
    const url = environment.API_EndPoint + 'bankTransaction/view.php';
    return this.httpClient.get(url).pipe(map(data => data));
  }

  createBankingTransactions(data: any): Observable<HttpResponse>{
    const url = environment.API_EndPoint + 'bankTransaction/create.php';
    return this.httpClient.post<HttpResponse>(url, data).pipe(map(data => data));
  }

  loadBankingTransactionsInfo(bankingTransactionsId: any): Observable<BankingTransactionsModel>{
    const url = environment.API_EndPoint + 'bankTransaction/view_one.php?id=' + bankingTransactionsId;
    return this.httpClient.get<BankingTransactionsModel>(url).pipe(map(data => data));
  }

  updateBankingTransactionsDetails(data: any): Observable<HttpResponse>{
    const url = environment.API_EndPoint + 'bankTransaction/update.php';
    return this.httpClient.post<HttpResponse>(url, data).pipe(map(data => data));
  }

  deleteBankingTransactions(bankingTransactionsId: any): Observable<HttpResponse>{
    const url = environment.API_EndPoint + 'bankTransaction/delete.php?id=' + bankingTransactionsId
    return this.httpClient.get<HttpResponse>(url).pipe(map(data => data));
  }

  //////Filtro
  filtro(values: any){
    const url = environment.API_EndPoint + 'bankTransaction/filter.php?categoria=' + values.categoria + '&tipo=' + values.tipo_gasto;
    return this.httpClient.get(url).pipe(map(data => data));
  }

}
