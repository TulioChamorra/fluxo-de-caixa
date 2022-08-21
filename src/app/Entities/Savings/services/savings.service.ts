import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {HttpResponse} from "../../../models/http-response";
import {SavingsModel} from "../../../models/savings.model";

@Injectable({
  providedIn: 'root'
})
export class SavingsService {

  constructor(private httpClient: HttpClient) { }

  loadSavings(){
    const url = environment.API_EndPoint + 'savings/view.php';
    return this.httpClient.get(url).pipe(map(data => data));
  }

  createSavings(data: any): Observable<HttpResponse>{
    const url = environment.API_EndPoint + 'savings/create.php';
    return this.httpClient.post<HttpResponse>(url, data).pipe(map(data => data));
  }

  loadSavingsInfo(savingsId: any): Observable<SavingsModel>{
    const url = environment.API_EndPoint + 'savings/view_one.php?id=' + savingsId;
    return this.httpClient.get<SavingsModel>(url).pipe(map(data => data));
  }

  updateSavingsDetails(data: any): Observable<HttpResponse>{
    const url = environment.API_EndPoint + 'savings/update.php';
    return this.httpClient.post<HttpResponse>(url, data).pipe(map(data => data));
  }

  deleteSavings(savingsId: any): Observable<HttpResponse>{
    const url = environment.API_EndPoint + 'savings/delete.php?id=' + savingsId
    return this.httpClient.get<HttpResponse>(url).pipe(map(data => data));
  }
}
