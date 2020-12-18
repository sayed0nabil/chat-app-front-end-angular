import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageChatBoxComponent } from './components/message-chat-box/message-chat-box.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NonAuthGuard } from './guards/non-auth.guard';

const routes: Routes = [
  {
    path:'user/login',
    component: LoginComponent,
    canActivate : [ NonAuthGuard ]
  },
  {
    path:'user/register',
    component: RegisterComponent,
    canActivate : [ NonAuthGuard ]
  },
  {
    path:'message-chat-box',
    component: MessageChatBoxComponent,
    canActivate : [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
