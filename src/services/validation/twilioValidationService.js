import twilio from 'twilio';

/**
 * @description 
 * validates that request was received from Twilio using Twilio helper library
 * 
 * @example
 */
function validateTwilioRequestOrigin(authToken, twilioSignature, url, params) {   
    console.log(`twilioValidationService.js::validateTwilioRequest(authToken, twilioSignature, url, param) |  Validating that request originated from Twilio`);

    try {
        const twilioRequestOriginValidationResp = twilio.validateRequest(authToken,twilioSignature,url,params);
        const validationStatus = twilioRequestOriginValidationResp === true ? 'succeeded' : 'failed';
        console.log(`twilioValidationService.js::validateTwilioRequest |  Twilio request origin validation ${validationStatus}, returned: ${twilioRequestOriginValidationResp}`);

        return twilioRequestOriginValidationResp;
    } catch(error) {
        console.log(`twilioValidationService.js::validateTwilioRequest | There was an issue while validating the request, error: ${error}`);
        return false;
    }
}

export {
    validateTwilioRequestOrigin
}