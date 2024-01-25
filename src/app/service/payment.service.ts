// api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from "../../environments/environment";



@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private bdTraceUrl = environment.bdTraceUrl + ''; 
  private ipAddressApiUrl = 'https://api.ipify.org?format=json'; // IPify is a free IP address API
  private createOrderUrl = environment.baseUrl +'payments/ve1_2/orders/create';

  constructor(private http: HttpClient) { }

  // Function to perform the POST API call
  initiatePayment(data: any,header): Observable<any> {
   
    const headers:any = new HttpHeaders(header);
    return this.http.post<any>(this.createOrderUrl, data, headers);
  }

  //get ip address
  getIpAddress(): Observable<any> {
    return this.http.get(this.ipAddressApiUrl);
  }

  // Function to perform the POST API call for create order
  createOrder(header:any,data: any): Observable<any> {
    const headers = new HttpHeaders(header);

    return this.http.post<any>(this.createOrderUrl, data, { headers });
  }
}
