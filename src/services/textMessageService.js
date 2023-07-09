import * as SMSClient from '../client/smsClient.js';

const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;


/**
 * @description Texts message to phone number using Twilio API Client
 */
async function sendSMSMessage(message, recipientPhoneNumber) {  
    console.log(`textMessageService.js::sendSMSMessage(message,recipientPhoneNumber) | message: ${JSON.stringify(message)}, recipientPhoneNumber: ${JSON.stringify(recipientPhoneNumber)}`);
    let smsClient;
    
    try {
        smsClient = await SMSClient.getSMSClient();
        console.log(`textMessageService.js::sendSMSMessage | SMS client successfully created`);
    } catch(error) {
        console.error(`textMessageService.js::sendSMSMessage | There was an error while creating the SMS client: ${error}`);
        throw new Error('Unable to create SMS client');
    }

    return smsClient.messages
      .create({
        body: `${message}`,
        from: twilioPhoneNumber,
        to: recipientPhoneNumber
      })
      .then(messageResponse => {
        const { sid: messageId } = messageResponse;
        console.log(`textMessageService.js::sendSMSMessage | SMS message with id ${messageId} successfuly sent`);
        return messageResponse
      })
      .catch(error => {
        console.error(`textMessageService.js::sendSMSMessage | There was an error while sending the SMS message with id ${message.sid}: ${error}`);
        throw error;
      })
}

export { sendSMSMessage }