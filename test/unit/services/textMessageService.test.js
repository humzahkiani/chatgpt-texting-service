import { jest } from '@jest/globals';
import * as smsClient from '../../../src/client/smsClient.js';
import { sendSMSMessage } from '../../../src/services/textMessageService.js';

const mockMessage = 'This is a mock message';
const mockRecipientPhone = '1111111111';
const mockMessageSid = 'MockedSid';
const mockValidMessageResponse = {
    sid: mockMessageSid
}
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const mockSMSClientCreateArg = {
    body: mockMessage,
    from: twilioPhoneNumber,
    to: mockRecipientPhone,
};
const mockSMSClientMessagesCreateError = 'Mock smsClient.messages.create error';
const expectedSMSClientError = 'Unable to create SMS client';
const mockSMSClientError = 'mock smsClient.getSMSClient error'

jest.mock('../../../src/client/smsClient.js');
const mockGetSMSClientValidCreate = {
    messages: {
        create: jest.fn(() => {
            return Promise.resolve(mockValidMessageResponse)
        })
    }
}
const mockGetSMSClientInvalidCreate = {
    messages: {
        create: jest.fn(() => {
            throw new Error(mockSMSClientMessagesCreateError)
        })
    }
}

describe('textMessageService.js', () => {

    describe('sendSMSMessage', () => {
        let response;

        describe('When the SMS client is created successfully', () => {
            describe('And the client creates/sends the message correctly', () => {
                beforeEach(() => {
                    smsClient.getSMSClient.mockResolvedValue(mockGetSMSClientValidCreate)
                })
                afterEach(() => {
                    jest.clearAllMocks()
                })
                it('Then the smsClient.messages.create method is called with the expected arguments', async () => {
                    response = await sendSMSMessage(mockMessage, mockRecipientPhone);
                    expect(mockGetSMSClientValidCreate.messages.create).toHaveBeenCalledWith(mockSMSClientCreateArg);
                });
                it('Then it returns the expected message response', async () => {
                    response = await sendSMSMessage(mockMessage, mockRecipientPhone);
                    expect(response).toEqual(mockValidMessageResponse);
                });
            });
            describe('And the client does not create/send the message correctly', () => {
                beforeEach(() => {
                    smsClient.getSMSClient.mockResolvedValue(mockGetSMSClientInvalidCreate)
                })
                afterEach(() => {
                    jest.clearAllMocks()
                })
                it('Then it calls the smsClient.messages.create method with the expected arguments', async () => {
                    try {
                        response = await sendSMSMessage(mockMessage, mockRecipientPhone);
                    } catch(error) {}
                    expect(mockGetSMSClientInvalidCreate.messages.create).toHaveBeenCalledWith(mockSMSClientCreateArg);
                });
                it('Then it throws the expected error', async () => {
                    await expect(sendSMSMessage(mockMessage, mockRecipientPhone)).rejects.toThrow(mockSMSClientMessagesCreateError)
                });
            });
        });

        describe('When the SMS client is not created successfully', () => {
            describe('And the client creates/sends the message correctly', () => {
                beforeEach(() => {
                    smsClient.getSMSClient.mockImplementationOnce(() => {
                        throw new Error(mockSMSClientError);
                        return mockGetSMSClientValidCreate;
                    });
                    smsClient.getSMSClient.mockResolvedValue(mockGetSMSClientValidCreate);
                });
                afterEach(() => {
                    jest.clearAllMocks()
                })
                it('Then it does not call smsClient.messages.create', async() => {
                    try {
                        response = await sendSMSMessage(mockMessage, mockRecipientPhone);
                    } catch (error) {}
                    expect(mockGetSMSClientValidCreate.messages.create).not.toHaveBeenCalled()
                });
                it('Then it throws the expected error', async() => {
                    await expect(sendSMSMessage(mockMessage, mockRecipientPhone)).rejects.toThrow(expectedSMSClientError)
                });
            });
            describe('And the client does not create/send the message correctly', () => {
                beforeEach(() => {
                    smsClient.getSMSClient.mockImplementationOnce(() => {
                        throw new Error(mockSMSClientError);
                        return mockGetSMSClientInvalidCreate;
                    });
                    smsClient.getSMSClient.mockResolvedValue(mockGetSMSClientValidCreate);
                });
                afterEach(() => {
                    jest.clearAllMocks()
                })
                it('Then it does not call smsClient.messages.create', async() => {
                    try {
                        response = await sendSMSMessage(mockMessage, mockRecipientPhone);
                    } catch (error) {}
                    expect(mockGetSMSClientInvalidCreate.messages.create).not.toHaveBeenCalled()
                });
                it('Then it throws the expected error', async() => {
                    await expect(sendSMSMessage(mockMessage, mockRecipientPhone)).rejects.toThrow(expectedSMSClientError)
                });
            });
        });
    });
})