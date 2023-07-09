import * as twilioValidationService from './services/validation/twilioValidationService.js';
import { sendSMSMessage } from './services/textMessageService.js';
import { createHttpResponse } from './utils/createHttpResponse.js'
import { HTTP_200_OK_RESPONSE, HTTP_400_BAD_REQUEST_RESPONSE, HTTP_403_FORBIDDEN_RESPONSE, HTTP_500_INTERNAL_SERVER_ERROR_RESPONSE } from './constants/response.js';
import { decodeAndParseQueryString } from './utils/helpers.js';
import { validateEventSchema, validateEventBodySchema } from './services/validation/schemaValidationService.js';
import { Configuration, OpenAIApi } from 'openai';

const authToken = process.env.TWILIO_AUTH_TOKEN;
const apiGatewayURL = process.env.API_GATEWAY_URL;
const openAIApiKey = process.env.OPENAI_API_KEY;

/**
 * @description A handler that functions as the entrypoint to the lambda 
 */
export async function handler(event,context) {
    console.log(`index.js::handler(event,context) | lambda handler triggered -> event: ${JSON.stringify(event)}, context: ${JSON.stringify(context)}`);

    const request = decodeAndParseQueryString(event.body);
    const isValidEvent = validateEventSchema(event)
    const isValidEventBody = validateEventBodySchema(request)

    if (! (isValidEvent || isValidEventBody)) {
      console.log(`index.js::handler | Unable to validate event, returning 400`);
      return createHttpResponse(400, HTTP_400_BAD_REQUEST_RESPONSE);
    }

    const twilioSignature = event.headers['x-twilio-signature'];
    const isRequestOriginValid = twilioValidationService.validateTwilioRequestOrigin(authToken,twilioSignature,apiGatewayURL,request);

    if (!isRequestOriginValid) {
      console.log('index.js::handler | Unable to validate that request originated from Twilio, returning 403');
      return createHttpResponse(403, HTTP_403_FORBIDDEN_RESPONSE)
    }

    const { Body:recievedMessage, From:senderPhoneNumber } = request;
    const response = recievedMessage;

    try {
      const messageResponse = await sendSMSMessage(response,senderPhoneNumber);
      console.log(`index.js::handler | SNS message successfully sent with id ${messageResponse.sid} returning 200`);
      return createHttpResponse(200, HTTP_200_OK_RESPONSE);
    } catch(error) {
      console.log('index.js::handler | There was an error while attempting to send the SMS message, returning 500');
      return createHttpResponse(500, HTTP_500_INTERNAL_SERVER_ERROR_RESPONSE);
    }
}