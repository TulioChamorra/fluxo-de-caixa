import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Spent} from "../models/spent";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Savings} from "../models/savings";
import {Earnings} from "../models/earnings";

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private httpClient: HttpClient) { }

// Soma de gastos
  loadSpents(): Observable<Spent>{
    const url = environment.API_EndPoint + 'apis/spent.php';
    return this.httpClient.get<Spent>(url).pipe(map(data => data));
  }

  // Soma de gastos
  loadSavings(): Observable<Savings>{
    const url = environment.API_EndPoint + 'apis/savings.php';
    return this.httpClient.get<Savings>(url).pipe(map(data => data));
  }

  // Soma de gastos
  loadEarnings(): Observable<Earnings>{
    const url = environment.API_EndPoint + 'apis/earnings.php';
    return this.httpClient.get<Earnings>(url).pipe(map(data => data));
  }



}
