import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchListComponent } from './match-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    MatchListComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [
    MatchListComponent
  ]
})
export class MatchListModule { }
