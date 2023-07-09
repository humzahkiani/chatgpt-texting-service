

export const createHttpResponse = (statusCode, statusMessage) => {
    return {
        statusCode: statusCode,
        statusMessage: statusMessage
    }
}