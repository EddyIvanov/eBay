
import { fetchBooks } from '../fetch-books.service';
import sinon from 'sinon';
import assert from 'assert';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';

chai.use(chaiAsPromised);
const expect = chai.expect;

declare global {
    namespace NodeJS {
        interface Global {
            fetch: any;
        }
    }
}

describe('Testing FetchUrl - Wrapper over fetch', () => {
    const res = [{
        id: '1',
        name: 'Abc'
    }];
    it('should perform basic fetch functions', () => {
        const mockFetch = sinon.fake.resolves({
            ok: true,
            json: () => res
        });
        // Inject mock fetch into global
        global.fetch = mockFetch;
        fetchBooks("Javascript");
        assert(mockFetch.calledWith('https://www.googleapis.com/books/v1/volumes?q=Javascript'));
        assert(mockFetch.calledOnce, 'Fn was called once');
        delete global.fetch;
    });
    it('should resolve with data for valid request', () => {
        const mockFetch = sinon.fake.resolves({
            ok: true,
            json: () => res
        });
        // Inject mock fetch into global
        global.fetch = mockFetch;
        const fetchResponse = fetchBooks("Javascript");
        expect(fetchResponse).to.eventually.equal(res);
        delete global.fetch;
    });
    it(`should reject with data for fetch status returns ok false`, () => {
        const mockFetch = sinon.fake.resolves({
            ok: false,
            code: 500,
            json: () => res
        });
        // Inject mock fetch into global
        global.fetch = mockFetch;
        const fetchResponse = fetchBooks("Javascript");
        expect(fetchResponse).to.eventually.be.rejectedWith(res);
    });
});
