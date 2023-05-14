import { IListIterator } from "./IListIterator";
import { Node } from "./Node";

export interface ILinkedList<T> {
    head: Node<T> | null
    tail: Node<T> | null
    length: number

    at(index: number): T

    add(value: T): void
    remove(index: number): void

    addAll(index: number, iterator: Iterable<T>): void
    addHead(value: T): void

    listIterator(index: number): IListIterator<T>
    descendingIterator(index: number): IListIterator<T>
    [Symbol.iterator](): IterableIterator<T>

    /** @internal */
    getNode(index: number): Node<T>
    /** @internal */
    removeNode(node: Node<T>): void
}
