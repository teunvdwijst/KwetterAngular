import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {AccountDetailComponent} from './account-detail/account-detail.component';
import {TweetComponent} from './tweet/tweet.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/tweets', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'tweets', component: TweetComponent},
  {path: 'accounts/:username', component: AccountDetailComponent},
  {path: 'accounts', component: AccountDetailComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule {
}
