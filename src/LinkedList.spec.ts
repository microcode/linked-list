import {
    LinkedList
} from "./LinkedList";

import "mocha";
import * as chai from "chai";

const expect = chai.expect;

describe("LinkedList", function () {
    it("should add values", function () {
        const list = new LinkedList<number>();
        const value = 7;

        list.add(value);

        expect(list).to.have.length(1);
        expect(list.at(0)).to.equal(value);
    });

    it("should remove values", function () {
        const list = new LinkedList<number>();
        const value1 = 7;
        const value2 = 5;

        list.add(value1);
        list.add(value2);

        expect(list).to.have.length(2);
        expect(list.at(0)).to.equal(value1);
        expect(list.at(1)).to.equal(value2);

        list.remove(0);

        expect(list).to.have.length(1);
        expect(list.at(0)).to.equal(value2);
    });

    it("should fetch values", function () {
        const list = new LinkedList<number>();
        const values = [7, 5, 9, 3, 6];

        list.addAll(0, values);

        expect(list).to.have.length(values.length);
        values.forEach(function (value, index) {
            expect(list.at(index)).to.equal(value);
        });
    });

    it("should allow java-style iteration over list", function () {
        const list = new LinkedList<number>();
        const value1 = 7;
        const value2 = 5;

        list.add(value1);
        list.add(value2);

        const iterator = list.listIterator();
        expect(iterator.hasPrevious).to.be.false;
        expect(iterator.hasNext).to.be.true;
        expect(iterator.next()).to.equal(value1);

        expect(iterator.hasPrevious).to.be.true;
        expect(iterator.hasNext).to.be.true;
        expect(iterator.next()).to.equal(value2);

        expect(iterator.hasPrevious).to.be.true;
        expect(iterator.hasNext).to.be.false;

        expect(iterator.previous()).to.equal(value2);
        expect(iterator.hasPrevious).to.be.true;
        expect(iterator.hasNext).to.be.true;

        expect(iterator.previous()).to.equal(value1);
        expect(iterator.hasPrevious).to.be.false;
        expect(iterator.hasNext).to.be.true;
    });

    it("should allow descending java-style iteration over list", function () {
        const list = new LinkedList<number>();
        const value1 = 7;
        const value2 = 5;

        list.add(value1);
        list.add(value2);

        const iterator = list.descendingIterator();
        expect(iterator.hasPrevious).to.be.false;
        expect(iterator.hasNext).to.be.true;
        expect(iterator.next()).to.equal(value2);

        expect(iterator.hasPrevious).to.be.true;
        expect(iterator.hasNext).to.be.true;
        expect(iterator.next()).to.equal(value1);

        expect(iterator.hasPrevious).to.be.true;
        expect(iterator.hasNext).to.be.false;

        expect(iterator.previous()).to.equal(value1);
        expect(iterator.hasPrevious).to.be.true;
        expect(iterator.hasNext).to.be.true;

        expect(iterator.previous()).to.equal(value2);
        expect(iterator.hasPrevious).to.be.false;
        expect(iterator.hasNext).to.be.true;
    });

    it("should allow javascript style iteration", function () {
        const list = new LinkedList<number>();
        const values = [7, 5, 3];

        for (const value of values) {
            list.add(value);
        }

        expect(list).to.have.length(3);
        expect(Array.from(list)).to.deep.equal(values);
    });

    it("should allow adding values through the iterator", function () {
        const list = new LinkedList<number>();
        const iterator = list.listIterator();

        const values = [7, 5, 3];

        for (const value of values) {
            iterator.add(value);
        }

        expect(list).to.have.length(3);
        expect(Array.from(list)).to.deep.equal(values);
    });

    it("should allow adding values to the head through the iterator", function () {
        const list = new LinkedList<number>();
        const values = [7, 5, 3];

        for (const value of values) {
            const iterator = list.listIterator();
            iterator.add(value);
        }

        expect(list).to.have.length(3);
        expect(Array.from(list)).to.deep.equal(Array.from(values).reverse());
    });

    it("should allow removing values through the iterator (head)", function () {
        const list = new LinkedList<number>();
        const values = [7, 5, 3, 8, 12];

        list.addAll(0, values);

        const iterator = list.listIterator();
        expect(iterator.hasNext).to.be.true;

        iterator.next();
        iterator.remove();

        expect(list).to.have.length(4);
        expect(Array.from(list)).to.deep.equal(Array.from(values.slice(1)));
    });

    it("should allow removing values through the iterator (tail)", function () {
        const list = new LinkedList<number>();
        const values = [7, 5, 3, 8, 12];

        list.addAll(0, values);

        const iterator = list.descendingIterator();
        expect(iterator.hasNext).to.be.true;

        iterator.next();
        iterator.remove();

        expect(list).to.have.length(4);
        expect(Array.from(list)).to.deep.equal(Array.from(values.slice(0, values.length - 1)));
    });

    it("should allow removing values through the iterator (middle)", function () {
        const list = new LinkedList<number>();
        const values = [7, 5, 3, 8, 12];

        list.addAll(0, values);

        const iterator = list.listIterator();
        expect(iterator.hasNext).to.be.true;

        iterator.next();
        iterator.next();
        iterator.next();

        iterator.remove();

        expect(list).to.have.length(4);
        expect(Array.from(list)).to.deep.equal(values.slice(0, 2).concat(values.slice(3, 5)));
    });

});