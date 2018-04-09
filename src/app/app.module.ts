import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AccountComponent} from './account/account.component';
import {AccountDetailComponent} from './account-detail/account-detail.component';
import {AccountService} from './services/account.service';
import {MessagesComponent} from './messages/messages.component';
import {MessageService} from './services/message.service';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TweetComponent} from './tweet/tweet.component';
import {TweetService} from './services/tweet.service';
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from './services/authentication.service';
import {TokenInterceptor} from './token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AccountDetailComponent,
    MessagesComponent,
    DashboardComponent,
    TweetComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AccountService,
    MessageService,
    TweetService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
