import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import {AccountService} from './services/account.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './services/message.service';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { AccountSearchComponent } from './account-search/account-search.component';
import { TweetComponent } from './tweet/tweet.component';
import {TweetService} from './services/tweet.service';


@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AccountDetailComponent,
    MessagesComponent,
    DashboardComponent,
    AccountSearchComponent,
    TweetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AccountService,
    MessageService,
    TweetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
