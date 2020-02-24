import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TictactoeComponent } from './tictactoe/tictactoe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { EntryComponent } from './entry/entry.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ModalViewComponent } from './modal-view/modal-view.component';
import { MatFormFieldModule, MatDialogModule, MatInputModule, MatProgressBarModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    TictactoeComponent,
    EntryComponent,
    NotfoundComponent,
    ModalViewComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatProgressBarModule,
  ],
  providers: [],
  entryComponents: [ModalViewComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
