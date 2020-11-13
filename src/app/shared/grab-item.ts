import { AngularFireDatabase } from '@angular/fire/database';

export abstract class Item {
    constructor(private db: AngularFireDatabase) { }

    rmodel: number[];
    itemType: string;

    grabItem(round: number): void {
        let amount: number;
        const updates = {};
        this.db.database.ref('cart/' + this.itemType).once('value').then(result => {
            amount = result.val();
            console.log(amount);
            updates['cart/' + this.itemType] = amount + 1;
            this.db.database.ref().update(updates);
            console.log('is grabbing item in ' + this.rmodel[(round % 5) - 1] + ' aisle.');
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
