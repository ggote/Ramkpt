import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
// import * as os from 'os';

import { PaymentService } from "../../service/payment.service";
import { HmacJwsSignService } from "../../service/hmacjwssign.service";
import { environment } from "../../../environments/environment";
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  zoom: number = 14;
  lat: number = 44.445248;
  lng: number = 26.099672;
  styles: any[] = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
    data : Date = new Date();
    focus;
    focus1;

    // Get network interfaces
  // networkInterfaces = os.networkInterfaces();
  ipAddress= environment.ipv4;
  macAddress= environment.macAddress;
  secretKey = environment.secreatekey;
  clientId = environment.clientId;
  merchandId = environment.merchandId;
  amount;
  userAgent: string;

    constructor(
      private paymentService:PaymentService,
      private hmacJwsSignService:HmacJwsSignService
    ) { }

    ngOnInit() {
      var rellaxHeader = new Rellax('.rellax-header');

        var body = document.getElementsByTagName('body')[0];
        body.classList.add('profile-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');

        // this.paymentService.getIpAddress().subscribe(
        //   (response: any) => {
        //     this.ipAddress = response.ip;
        //     console.log('IP address:', this.ipAddress);
        //   },
        //   (error) => {
        //     console.error('Error fetching IP address:', error);
        //     this.ipAddress = 'Error fetching IP address';
        //   }
        // );
        this.userAgent = navigator.userAgent;
        console.log('userAgent:', this.userAgent);
      }
    
    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('profile-page');
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
    makePayment = async() => {


      const prefix = 'order';
      const timestamp = new Date().getTime();
      const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      const orderNumber = `${prefix}${timestamp}${randomSuffix}`;
      
      const data =
      {
        "mercid": this.merchandId,
        "orderid": orderNumber,
        "amount": this.amount,
        "order_date": new Date(),
        "currency": 356,
        "ru" : "https://merchant.com",
        "additional_info": {
        "additional_info1": "Details1",
        "additional_info2": "Details2"
        },
        "itemcode": "DIRECT",
        "device": {
          "init_channel" : "internet",
          "ip": this.ipAddress,
          "mac": this.macAddress,
          //"imei": "990000112233445",
          "accept_header": "text/html",
          //"fingerprintid": "61b12c18b5d0cf901be34a23ca64bb19"
        }
        }

        const headers ={
          'Content-Type': 'application/jose',
          'Accept':'application/jose',
          'BD-Traceid': orderNumber,
          'BD-Timestamp': timestamp.toString()
          //'Access-Control-Allow-Origin': '*'
          // Add any additional headers if needed
        };
      
      const encryptPayload = await this.hmacJwsSignService.encryptAndSignJWSWithHMAC(data.toString(),this.secretKey,this.clientId);
      console.log(data,"encryptPayload",encryptPayload);
      // const decryptPayload = await this.hmacJwsSignService.verifyAndDecryptJWSWithHMAC(encryptPayload,this.secretKey);
      // console.log("decryptPayload",decryptPayload);
      const encryptHeaders = await this.hmacJwsSignService.encryptAndSignJWSWithHMAC(headers.toString(),this.secretKey,this.clientId);
      console.log(headers,"encryptHeaders",encryptHeaders);
      // const decryptHeader = await this.hmacJwsSignService.verifyAndDecryptJWSWithHMAC(encryptHeaders,this.secretKey);
      // console.log("decryptHeader",decryptHeader);
      this.paymentService.initiatePayment(encryptPayload,encryptHeaders).subscribe(
        response => {
          console.log('API Response:', response);
          // Handle the response as needed
        },
        error => {
          console.error('API Error:', error);
          // Handle the error as needed
        }
      );
    }

    createOrder = async(timeStamp,traceId,orderNumber) => {
      try {
        let header={
          "content-type": "application/jose",
          "bd-timestamp": timeStamp,
          "accept": "application/jose",
          "bd-traceid": traceId
        }
        let createOrderObj = {
          "mercid":environment.merchandId,
          "orderid":orderNumber,
          "amount":this.amount,
          "order_date":new Date(),
          "currency":"356",
          "ru":"https://www.example.com/merchant/api/pgresponse",
          "additional_info":{
          "additional_info1":"Details1",
          "additional_info2":"Details2"
          },
          "itemcode":"DIRECT",
          // "invoice":{
          //   "invoice_number":orderNumber,
          //   "invoice_display_number":orderNumber,
          //   "customer_name":"John",
          //   "invoice_date":new Date(),
          //   "gst_details":{
          //   "cgst":"8.00",
          //   "sgst":"8.00",
          //   "igst":"0.00",
          //   "gst":"16.00",
          //   "cess":"0.00",
          //   "gstincentive":"5.00",
          //   "gstpct":"16.00",
          //   "gstin":"12344567"
          // }
          // },
          "device":{
          "init_channel":"internet",
          "ip":this.ipAddress,
          "mac":this.macAddress,
          "imei":"990000112233445",
          "user_agent":this.userAgent
          
          ,
          "accept_header":"text/html",
          "fingerprintid":"61b12c18b5d0cf901be34a23ca64bb19"
          }
          }

          const encryptObjHeader = await this.hmacJwsSignService.encryptAndSignJWSWithHMAC(header.toString(),this.secretKey,this.clientId);
          console.log("encryptObjHeader",encryptObjHeader);
          const encryptObjPayload = await this.hmacJwsSignService.encryptAndSignJWSWithHMAC(createOrderObj.toString(),this.secretKey,this.clientId);
          console.log("encryptPayload",encryptObjPayload);

          this.paymentService.createOrder(encryptObjHeader,encryptObjPayload).subscribe(
            response => {
              console.log('API Response:', response);
              // Handle the response as needed
            },
            error => {
              console.error('API Error:', error);
              // Handle the error as needed
            }
          );

      } catch (error) {
        console.error('API Error:', error);
      }
    }

}

