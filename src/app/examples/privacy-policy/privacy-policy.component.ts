import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  data : Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
