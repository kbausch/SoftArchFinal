import { AngularFireDatabase } from '@angular/fire/database';
import { Item } from './grab-item';

export abstract class Shopper {
    constructor(private db: AngularFireDatabase) {
        db.database.ref('playerMove/').on('value', snapshot => {
            this.action = snapshot.val()[this.name];
        });
    }

    public name: string;
    public action = true;

    checkOut(): Promise<any> {
        if (this.action) {
            this.db.database.ref('logs').once('value').then(result => {
                let temp = result.val();
                temp.push(this.name + ' is checking out!');
                this.db.database.ref().update({ logs: temp });
            });
            this.db.database.ref().update({ round: 1 });
            this.db.database.ref().update({ playerMove: { Jacob: true, Jacob2: true, Justin: true, Kaleb: true, Marcus: true } });
            this.db.database.ref('logs').remove().then(_ => {
                this.db.database.ref().update({ logs: { 0: 'THIS IS THE ACTION LOG' } });
            });
            return this.db.database.ref().update({ cart: { actualCat: 0, nerfDarts: 0, sarcasmJuice: 0, souls: 0, wideScreen: 0 } });
        }
    }

    peekCart(round: number) {
        if (this.action) {
            this.updateMove(round);
            this.db.database.ref('/logs').once('value').then(result => {
                let temp = result.val();
                temp.push(this.name + ' is peeking in the cart.');
                this.db.database.ref().update({ logs: temp });
            });
        }
    }

    private updateMove(round: number) {
        const update = {};
        update['playerMove/' + this.name] = false;
        this.db.database.ref().update(update).then(_ => {
            this.db.database.ref('/playerMove').once('value').then(result => {
                if (Object.values(result.val()).every((value) => value === false)) {
                    console.log(round);
                    this.db.database.ref().update({ round: round + 1 });
                    this.db.database.ref().update({ playerMove: { Jacob: true, Jacob2: true, Justin: true, Kaleb: true, Marcus: true } });
                } else {
                    this.action = false;
                }
            });
        });
    }

    grabItem(item: Item, round: number): void {
        if (this.action) {
            this.updateMove(round);
            item.grabItem(this.name, round);
        }
    }

    evaluateHP() { }

    toggleChar(on: boolean) {
        this.db.database.ref('playerMove/' + this.name).once('value').then(result => {
            this.action = result.val();
        });
        const update = {};
        update['players/' + this.name] = on;
        return this.db.database.ref().update(update);
    }
}

export class Justin extends Shopper {
    name = 'Justin';

    evaluateHP() {

    }
}

export class Marcus extends Shopper {
    name = 'Marcus';

    evaluateHP() {

    }
}

export class Jacob extends Shopper {
    name = 'Jacob';

    evaluateHP() {

    }
}

export class Jacob2 extends Shopper {
    name = 'Jacob2';

    evaluateHP() {

    }
}

export class Kaleb extends Shopper {
    name = 'Kaleb';

    evaluateHP() {

    }
}