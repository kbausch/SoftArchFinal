import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Item, nerfDarts, sarcasmJuice, actualCat, wideScreen, souls } from './shared/grab-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private db: AngularFireDatabase) { }

  round = 0;
  title = 'SoftArchFinal';

  storeContent: Item[] = [new nerfDarts(this.db), new sarcasmJuice(this.db), new actualCat(this.db), new wideScreen(this.db), new souls(this.db)];
}