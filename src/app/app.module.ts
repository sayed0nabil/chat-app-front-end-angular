import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/user/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './components/user/register/register.component';
import { SharedModule } from './components/shared/shared.module';
import { NavComponent } from './components/shared/nav/nav.component';
import { MessageChatBoxComponent } from './components/message-chat-box/message-chat-box.component';
import { UsersAsideBarComponent } from './components/users-aside-bar/users-aside-bar.component';
import { BasicAuthHttpInterceptorServiceService} from './services/basic-auth-http-interceptor-service.service'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MessageChatBoxComponent,
    UsersAsideBarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:BasicAuthHttpInterceptorServiceService,
      multi:true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
