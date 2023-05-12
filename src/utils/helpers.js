import querystring from 'querystring';

const decodeQueryString = (queryString) => Buffer.from(queryString, 'base64').toString('ascii');

const parseQueryString = (queryString) => querystring.parse(queryString);

export const decodeAndParseQueryString = (encodedQueryString) => {
    const decodedQueryString = decodeQueryString(encodedQueryString);
    const decodedAndParsedQueryString = parseQueryString(decodedQueryString);
    return decodedAndParsedQueryString
}