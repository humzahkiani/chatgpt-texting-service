import { jest } from '@jest/globals';
import twilio from 'twilio';
import * as smsClient from '../../../src/client/smsClient.js';

jest.mock('twilio');

const mockMessageSid = 'MockedSid';
const mockValidMessageResponse = {
    sid: mockMessageSid
};
const mockValidTwilioClient = {
    messages: {
        create: jest.fn(() => {
            return Promise.resolve(mockValidMessageResponse)
        })
    }
};
const mockTwilioClientError = 'mock error creating twilio client';

describe('smsClient.js', () => {
    describe('getSMSClient', () => {
        describe('When the twilio client is created successfully', () => {
            beforeEach(() => {
                twilio.mockResolvedValue(mockValidTwilioClient);
            })
            afterEach(() => {
                jest.clearAllMocks();
            })
            it('Then it returns the client', async () => {
                const client = await smsClient.getSMSClient();
                expect(client).toEqual(mockValidTwilioClient);
            })
        })
        describe('When the twilio client is not created successfully', () => {
            beforeEach(() => {
                twilio.mockImplementation(() => {
                    throw new Error(mockTwilioClientError);
                });
            })
            afterEach(() => {
                jest.clearAllMocks();
            })
            it('Then it throws an error', async () => {
                await expect(smsClient.getSMSClient()).rejects.toThrow(mockTwilioClientError);
            })
        })
    })
})