import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ NavComponent ],
  imports: [
    CommonModule,RouterModule, HttpClientModule, FormsModule
  ],
  providers: [HttpClientModule],

  exports:[FormsModule,ReactiveFormsModule,RouterModule, HttpClientModule, FormsModule, NavComponent]
})
export class SharedModule { }
