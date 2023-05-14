import { ILinkedList } from "./ILinkedList";
import { IListIterator } from "./IListIterator";
import { Node } from "./Node";

export class ListIterator<T> implements IListIterator<T> {
    private _previous: Node<T> | null;
    private _next: Node<T> | null;
    private _last: Node<T> | null = null;

    constructor(private _list: ILinkedList<T>, private _index: number) {
        if (_index == _list.length) {
            this._previous = _list.tail;
            this._next = null;
        } else {
            this._next = _list.getNode(_index);
            this._previous = this._next.previous;
        }
    }

    get hasNext(): boolean {
        return this._next !== null;
    }

    get hasPrevious(): boolean {
        return this._previous !== null;
    }

    next(): T {
        if (!this._next) {
            throw new Error("No Such Element");
        }
        this._last = this._previous = this._next;
        this._next = this._next.next;
        ++ this._index;

        return this._last.value;
    }

    previous(): T {
        if (!this._previous) {
            throw new Error("No Such Element");
        }

        this._last = this._next = this._previous;
        this._previous = this._previous.previous;
        -- this._index;

        return this._last.value;
    }

    add(value: T) {
        const node = new Node(value);

        ++ this._list.length;
        ++ this._index;

        node.previous = this._previous;
        node.next = this._next;

        if (this._previous != null) {
            this._previous.next = node;
        } else {
            this._list.head = node;
        }

        if (this._next != null) {
            this._next.previous = node;
        } else {
            this._list.tail = node;
        }

        this._previous = node;
        this._last = null;
    }

    remove() {
        if (!this._last) {
            throw new Error("No Such Element");
        }
        this._list.removeNode(this._last);
        this._last = null;
    }

    set(value: T) {
        if (this._last === null) {
            throw new Error("No Such Element");
        }
        this._last.value = value;
    }
}