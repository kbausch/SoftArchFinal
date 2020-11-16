import { AngularFireDatabase } from '@angular/fire/database';

export abstract class Item {
    constructor(private db: AngularFireDatabase) { }

    rmodel: number[];
    itemType: string;

    grabItem(name: string, round: number): void {
        const updates = {};
        this.db.database.ref('cart/' + this.itemType).once('value').then(result => {
            let amount = result.val();
            updates['cart/' + this.itemType] = amount + 1;
            this.db.database.ref().update(updates);
            this.db.database.ref('logs').once('value').then(result => {
                let temp = result.val();
                temp.push(name + ' is grabbing item in ' + this.rmodel[round % 5] + ' aisle.');
                this.db.database.ref().update({ logs: temp });
            });
        });
    }
}

export class nerfDarts extends Item {
    rmodel = [1, 0, 2, 1, 1];
    itemType = 'nerfDarts';
}

export class sarcasmJuice extends Item {
    rmodel = [1, 1, 0, 2, 1];
    itemType = 'sarcasmJuice';
}

export class actualCat extends Item {
    rmodel = [2, 2, 2, 2, 0];
    itemType = 'actualCat';
}

export class wideScreen extends Item {
    rmodel = [2, 1, 1, 0, 2];
    itemType = 'wideScreen';
}

export class souls extends Item {
    rmodel = [0, 2, 1, 1, 2];
    itemType = 'souls';
}