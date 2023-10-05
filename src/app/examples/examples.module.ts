import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AgmCoreModule } from '@agm/core';
import {RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamplesComponent } from './examples.component';
import { PaymentgatewayComponent } from './services/paymentgateway/paymentgateway.component';
import { Mt4ExpertComponent } from './services/mt4-expert/mt4-expert.component';
import { Mt5ExpertComponent } from './services/mt5-expert/mt5-expert.component';
import { ForexTradingComponent } from './services/forex-trading/forex-trading.component';
import { PmoComponent } from './services/pmo/pmo.component';
import { FooterComponent } from 'app/shared/footer/footer.component';
import { PayrollingComponent } from './services/payrolling/payrolling.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        RouterModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_KEY_HERE'
        })
    ],
    declarations: [
        LandingComponent,
        LoginComponent,
        ExamplesComponent,
        ProfileComponent,
        PaymentgatewayComponent,
        Mt4ExpertComponent,
        Mt5ExpertComponent,
        ForexTradingComponent,
        PayrollingComponent,
        PmoComponent,
        FooterComponent
    ]
})
export class ExamplesModule { }
