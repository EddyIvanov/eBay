
import { expect } from 'chai';
import { updateItemInArray } from '../updateItemInArray';

describe('Testing updateItemArray', () => {
    const bookList = [{
        id: '1',
        name: 'Book 1',
        inWishlist: false
    },
    {
        id: '2',
        name: 'Book 2',
        inWishlist: true
    },
    {
        id: '3',
        name: 'Book 3',
        inWishlist: true
    }];

    it('should update an array by id', () => {
        const updatedList = updateItemInArray(bookList, "2", { inWishlist: false });

        expect(updatedList[1]).to.include({ inWishlist: false });
    });

    it('should not mutade original array', () => {
        const updatedList = updateItemInArray(bookList, "2", { inWishlist: false });

        expect(updatedList).to.not.equal(bookList);
    });
});
