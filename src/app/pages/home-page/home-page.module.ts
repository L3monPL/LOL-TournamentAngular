import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { MatchListModule } from 'src/app/components/PAGE-HOME/match-list/match-list.module';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
]

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatchListModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
