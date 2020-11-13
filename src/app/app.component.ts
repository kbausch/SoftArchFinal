import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Item, nerfDarts, sarcasmJuice, actualCat, wideScreen, souls } from './shared/grab-item';
import { Shopper, Justin, Marcus, Jacob, Jacob2, Kaleb} from './shared/shopper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private db: AngularFireDatabase) { }

  round = 3;
  title = 'SoftArchFinal';
  playerActive = true;

  storeContent: Item[] = [new nerfDarts(this.db), new sarcasmJuice(this.db), new actualCat(this.db), new wideScreen(this.db), new souls(this.db)];

  playerList: Shopper[] = [new Justin(this.db), new Marcus(this.db), new Jacob(this.db), new Jacob2(this.db), new Kaleb(this.db)];
}