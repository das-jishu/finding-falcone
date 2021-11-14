import { LogService } from './services/log.service';
import { DataService } from './services/data-service.service';
import { APIService } from './services/api-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { SelectCardComponent } from './components/select-card/select-card.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatRadioModule } from '@angular/material/radio';
import { ResultComponent } from './components/result/result.component';
import { AuthGuardService } from './services/authguard.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SelectCardComponent,
    ResultComponent,
    SpinnerComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    NgSelectModule,
    MatRadioModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'result', component: ResultComponent, canActivate: [AuthGuardService] },
      { path: 'error/:errorCode', component: ErrorComponent },
      { path: 'error/**', component: ErrorComponent },
      { path: '**', component: ErrorComponent },
    ],{
      scrollPositionRestoration: 'enabled'
    }),
  ],
  providers: [
    APIService,
    DataService,
    LogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
