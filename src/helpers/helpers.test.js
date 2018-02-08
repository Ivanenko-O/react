import { getFullApiUrl, getRandomColor, getUniqueID } from './';

const GROUP_ID = 'test';
const api = 'https://lab.lectrum.io/react/api';

describe('helpers: ', () => {
    test('getFullApiUrl should be a function', () => {
        expect(typeof getFullApiUrl).toBe('function');
    });

    test('getFullApiUrl function should throw an error of wrong non-string arguments were passed', () => {
        const getFullNameWithError = () => {
            getFullApiUrl(null, 1);
        };

        expect(getFullNameWithError).toThrow(`'api' and 'GROUP_ID' arguments passed should be a string!`);
    });

    test('getFullApiUrl function should return  fullName string separated be one space ', () => {
        expect(getFullApiUrl(api, GROUP_ID)).toBe(`${api}/${GROUP_ID}`);
    });

    test('getUniqueID function should be uniquire', () => {
        const arr = new Set();
        const num = 1000;

        for(let i = 0; i < num; i++){
            arr.add(getUniqueID());
        }
        expect(arr.size).toBe(num);
    });

    test('getUniqueID ', () => {
        expect(getUniqueID(length)).not.toBe(0);
    })
});
