import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TictactoeComponent } from './tictactoe/tictactoe.component';
import { EntryComponent } from './entry/entry.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  {path: '', redirectTo: "/app", pathMatch: 'full'},
  {path: 'app/tictactoe', component: TictactoeComponent},
  {path: 'app/chat', component: ChatComponent },
  {path: 'app', component: EntryComponent },
  {path: '404', component: NotfoundComponent },
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
