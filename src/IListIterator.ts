export interface IListIterator<T> {
    readonly hasNext: boolean
    readonly hasPrevious: boolean

    next(): T
    previous(): T

    add(value: T): void
    remove(): void

    set(value: T): void
}
