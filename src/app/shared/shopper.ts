import { AngularFireDatabase } from '@angular/fire/database';
import { Item } from './grab-item';

export abstract class Shopper {
    constructor(private db: AngularFireDatabase) { }

    public name: string;
    public action = true;

    checkOut(): Promise<any> {
        if (this.action) {
            this.action = false;
            console.log(name + ' is checking out!');
            return this.db.database.ref().update({ checkOut: true });
        }
    }

    peekCart() {
        if (this.action) {
            this.action = false;
            console.log(name + ' is peeking in the cart.');
            return this.db.database.ref().update({ checkOut: true });
        }
    }

    grabItem(item: Item, round: number): void {
        if (this.action) {
            item.grabItem(name, round);
        }
    }

    evaluateHP() { }
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