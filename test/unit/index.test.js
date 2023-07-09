import { jest } from '@jest/globals';
import { handler } from '../../src/index.js';
import * as textMessageService from '../../src/services/textMessageService.js';
import * as twilioValidationService from '../../src/services/validation/twilioValidationService.js';
import { createHttpResponse } from '../../src/utils/createHttpResponse.js';
import { HTTP_200_OK_RESPONSE, HTTP_403_FORBIDDEN_RESPONSE, HTTP_500_INTERNAL_SERVER_ERROR_RESPONSE } from '../../src/constants/response.js';
import { createMockValidEvent } from '../resources/test-utils.js';

jest.mock('../../src/services/textMessageService.js');
jest.mock('../../src/services/validation/twilioValidationService.js');

const mockValidEvent = createMockValidEvent();

const mockMessageResponse = {
    sid: 'mockSID'
};
const successHTTPResponse = createHttpResponse(200, HTTP_200_OK_RESPONSE);
const forbiddenHTTPResponse = createHttpResponse(403, HTTP_403_FORBIDDEN_RESPONSE);
const internalServerErrorHTTPResponse = createHttpResponse(500, HTTP_500_INTERNAL_SERVER_ERROR_RESPONSE);
const mockSendSMSMessageError = 'Mock sensSMSMessage error';

describe('index.js', () => {
    let response;

    describe('handler', () => {
        describe('When twilioValidationService.validateTwilioRequestOrigin validates the request origin', () => {
            beforeEach(() => {
                twilioValidationService.validateTwilioRequestOrigin.mockReturnValue(true)
            })
            afterEach(() => {
                jest.resetAllMocks();
            })
            describe('And textMessageService.sendSMSMessage sends the sms message successfully', () => {
                beforeEach(() => {
                    textMessageService.sendSMSMessage.mockResolvedValue(mockMessageResponse)
                })
                it('Then a 200 response is returned', async () => {
                    response = await handler(mockValidEvent)
                    expect(response).toEqual(successHTTPResponse)
                })
            })
            describe('And textMessageService.sendSMSMessage fails to send the sms message', () => {
                beforeEach(() => {
                    textMessageService.sendSMSMessage.mockImplementationOnce(() => {
                        throw new Error(mockSendSMSMessageError);
                    })
                })
                it('Then a 500 response is returned', async () => {
                    response = await handler(mockValidEvent)
                    expect(response).toEqual(internalServerErrorHTTPResponse)
                })
            })
        })
        describe('When the twilioValidationService can not validate the request origin', () => {
            beforeEach(() => {
                twilioValidationService.validateTwilioRequestOrigin.mockReturnValue(false)
            })
            afterEach(() => {
                jest.resetAllMocks();
            })
            describe('And textMessageService.sendSMSMessage sends the sms message successfully', () => {
                beforeEach(() => {
                    textMessageService.sendSMSMessage.mockResolvedValue(mockMessageResponse)
                })
                it('Then a 403 response is returned', async () => {
                    response = await handler(mockValidEvent)
                    expect(response).toEqual(forbiddenHTTPResponse)
                })
            })
            describe('And textMessageService.sendSMSMessage fails to send the sms message', () => {
                beforeEach(() => {
                    textMessageService.sendSMSMessage.mockImplementationOnce(() => {
                        throw new Error(mockSendSMSMessageError);
                    })
                })
                it('Then a 403 response is returned', async () => {
                    response = await handler(mockValidEvent)
                    expect(response).toEqual(forbiddenHTTPResponse)
                })
            })
        })
    })
})
