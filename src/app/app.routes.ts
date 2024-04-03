import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NewGameComponent } from './new-game/new-game.component';
import { GameComponent } from './game/game.component';
import { LoadGameComponent } from './load-game/load-game.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: 'Home page'
  },
  {
    path: 'loadGame',
    component: LoadGameComponent,
    title:'Load Game'
  },
  {
    path: 'newGame',
    component: NewGameComponent,
    title:'New Game'
  },
  {
    path: 'game/:id',
    component: GameComponent,
    title: 'Game'
  }
];
