import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { MatchListModule } from 'src/app/components/PAGE-HOME/match-list/match-list.module';
import { RankingModule } from 'src/app/components/PAGE-HOME/ranking/ranking.module';
import { ChampionsPickedModule } from 'src/app/components/PAGE-HOME/champions-picked/champions-picked.module';

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
    MatchListModule,
    RankingModule,
    ChampionsPickedModule
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
