import { ILinkedList } from "./ILinkedList";
import { ListIterator } from "./ListIterator";

export class DescendingListIterator<T> extends ListIterator<T> {
    constructor(list: ILinkedList<T>, index: number) {
        super(list, list.length - index);
    }

    get hasNext() {
        return super.hasPrevious;
    }

    get hasPrevious() {
        return super.hasNext;
    }

    next() {
        return super.previous();
    }

    previous() {
        return super.next();
    }
}