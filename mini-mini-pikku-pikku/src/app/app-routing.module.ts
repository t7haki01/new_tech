import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TictactoeComponent } from './tictactoe/tictactoe.component';


const routes: Routes = [
  {path: 'tictactoe', component: TictactoeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
