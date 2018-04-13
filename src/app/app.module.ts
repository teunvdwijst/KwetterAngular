import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {AccountDetailComponent} from './account-detail/account-detail.component';
import {AccountService} from './services/account.service';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TweetComponent} from './tweet/tweet.component';
import {TweetService} from './services/tweet.service';
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from './services/authentication.service';
import {TokenInterceptor} from './token.interceptor';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AccountDetailComponent,
    TweetComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  providers: [
    AccountService,
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
