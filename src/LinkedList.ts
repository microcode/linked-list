import { DescendingListIterator } from "./DescendingListIterator";
import { ILinkedList } from "./ILinkedList";
import { IListIterator } from "./IListIterator";
import { ListIterator } from "./ListIterator";
import { Node } from "./Node";

export class LinkedList<T> implements ILinkedList<T> {
    head: Node<T> | null = null;
    tail: Node<T> | null = null;
    length = 0;

    at(index: number): T {
        return this.getNode(Math.trunc(index)).value;
    }

    add(value: T): void {
        this.addTailNode(new Node(value));
    }

    remove(index: number): void {
        this.removeNode(this.getNode(index));
    }

    addAll(index: number, values: Iterable<T>) {
        for(const value of values) {
            this.add(value);
        }
    }

    addHead(value: T): void {
        this.addHeadNode(new Node(value));
    }

    listIterator(index = 0): IListIterator<T> {
        return new ListIterator<T>(this, Math.trunc(index));
    }

    descendingIterator(index = 0): IListIterator<T> {
        return new DescendingListIterator<T>(this, Math.trunc(index));
    }

    [Symbol.iterator]() {
        return (function* () {
            for (let node = this.head; node !== null; node = node.next) {
                yield node.value;
            }
        }.bind(this))();
    }

    /** @internal */
    private addHeadNode(node: Node<T>) {
        if (!this.length) {
            this.head = this.tail = node;
        } else {
            node.next = this.head;
            this.head.previous = node;
            this.head = node;
        }

        if (node.next == node) {
            throw new Error("WTF");
        }

        ++ this.length;
    }

    /** @internal */
    private addTailNode(node: Node<T>) {
        if (!this.length) {
            this.head = this.tail = node;
        } else {
            node.previous = this.tail;
            this.tail.next = node;
            this.tail = node;
        }

        ++ this.length;
    }

    /** @internal */
    getNode(index: number) {
        if (index < Math.trunc(this.length / 2)) {
            let node = this.head;
            while (index-- > 0) {
                node = node.next;
            }
            return node;
        } else {
            let node = this.tail;
            while (++index < this.length) {
                node = node.previous;
            }
            return node;
        }
    }

    /** @internal */
    removeNode(node: Node<T>) {
        -- this.length;
        if (!this.length) {
            this.head = this.tail = null;
            return;
        }

        if (node == this.head) {
            this.head = node.next;
            node.next.previous = null;
        } else if (node == this.tail) {
            this.tail = node.previous;
            node.previous.next = null;
        } else {
            node.next.previous = node.previous;
            node.previous.next = node.next;
        }
    }
}