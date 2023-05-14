export class Node<T> {
    previous: Node<T> | null = null;
    next: Node<T> | null = null;

    constructor(public value: T) {}
}
