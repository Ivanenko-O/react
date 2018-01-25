import { createPost } from './fetch';
const api = 'http://example.com/api';
const token = 'abcd123';

const comment = 'Hello Lectrum!';
const data = {
    comment
};

global.fetch = jest.fn(() => // eslint-disable-line
    Promise.resolve({
        status: 200,
        json:   () => new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data });
            }, 500);

        })
    })
);

describe('fetch: ', () => {
    test(`should create new post`, async () => {
        await expect(createPost(comment, { api, token })).resolves.toEqual(data);
    });
});
