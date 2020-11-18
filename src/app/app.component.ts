import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Item, nerfDarts, sarcasmJuice, actualCat, wideScreen, souls } from './shared/grab-item';
import { Shopper, Justin, Marcus, Jacob, Jacob2, Kaleb } from './shared/shopper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  charSubList;
  round;
  shoppingList;
  logsList;

  constructor(private db: AngularFireDatabase) {
    db.list('/players').snapshotChanges().subscribe(result => this.charSubList = result);
    db.list('/').snapshotChanges().subscribe(result => {
      if (result[4]) {
        this.round = result[4].payload.val();
      }
    });
    db.list('/logs').snapshotChanges().subscribe(result => this.logsList = result);
  }

  title = 'SoftArchFinal';
  activePlayer: Shopper;

  hasChar(name: string) {
    if (this.charSubList && name) {
      return this.charSubList.find(character => character.key === name).payload.val();
    }
  }

  checkOut(player: Shopper) {
    if (player) {
      player.checkOut();
    }
  }

  peekCart(player: Shopper) {
    if (player) {
      player.peekCart(this.round);
      this.db.database.ref('/cart').once('value').then(result => {
        this.shoppingList = result.val();
      });
    }
  }

  storeContent: Item[] = [new nerfDarts(this.db), new sarcasmJuice(this.db), new actualCat(this.db), new wideScreen(this.db), new souls(this.db)];

  playerList: Shopper[] = [new Justin(this.db), new Marcus(this.db), new Jacob(this.db), new Jacob2(this.db), new Kaleb(this.db)];
}