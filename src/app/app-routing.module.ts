import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountComponent} from './account/account.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AccountDetailComponent} from './account-detail/account-detail.component';
import {TweetComponent} from './tweet/tweet.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'accounts', component: AccountComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tweets', component: TweetComponent},
  {path: 'detail', component: AccountDetailComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule {
}
