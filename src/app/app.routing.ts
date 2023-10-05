import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { LandingComponent } from './examples/landing/landing.component';
import { LoginComponent } from './examples/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';

import { PaymentgatewayComponent } from "./examples/services/paymentgateway/paymentgateway.component";
import { ForexTradingComponent } from "./examples/services/forex-trading/forex-trading.component";
import { Mt4ExpertComponent } from "./examples/services/mt4-expert/mt4-expert.component";
import { Mt5ExpertComponent } from "./examples/services/mt5-expert/mt5-expert.component";
import { PmoComponent } from "./examples/services/pmo/pmo.component";
import { PayrollingComponent } from "./examples/services/payrolling/payrolling.component";

const routes: Routes =[
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/login',       component: LoginComponent },
    { path: 'examples/contactus',     component: ProfileComponent },
    { path: 'examples/payment',     component: PaymentgatewayComponent },
    { path: 'examples/forex',     component: ForexTradingComponent },
    { path: 'examples/mt4',       component: Mt4ExpertComponent },
    { path: 'examples/mt5',     component: Mt5ExpertComponent },
    { path: 'examples/pmo',     component: PmoComponent },
    { path: 'examples/payroll',     component: PayrollingComponent }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
