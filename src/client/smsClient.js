import twilio from 'twilio';

const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_SID;


async function getSMSClient() {
    console.log('smsClient.js::getSMSClient() | Attempting to create twilio sms client');
    try {
        const SMSClient = await twilio(accountSid, authToken, {
            autoRetry: true,
            maxRetries: 3,
        });
        console.log('smsClient.js::getSMSClient() | Successfully created twilio sms client');
        return SMSClient
    } catch(error) {
        console.log(`smsClient.js::getSMSClient() | There was an error creating the twilio sms client: ${error}`);
        throw error;
    }
}

export { getSMSClient }