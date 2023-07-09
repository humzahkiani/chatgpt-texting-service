import Ajv from 'ajv';

const ajv = new Ajv();

const eventSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "version": { "type": "string" },
        "routeKey": { "type": "string" },
        "rawPath": { "type": "string" },
        "rawQueryString": { "type": "string" },
        "headers": {
            "type": "object",
            "properties": {
                "accept": { "type": "string" },
                "content-length": { "type": "string" },
                "content-type": { "type": "string" },
                "host": { "type": "string" },
                "i-twilio-idempotency-token": { "type": "string" },
                "user-agent": { "type": "string" },
                "x-amzn-trace-id": { "type": "string" },
                "x-forwarded-for": { "type": "string" },
                "x-forwarded-port": { "type": "string" },
                "x-forwarded-proto": { "type": "string" },
                "x-home-region": { "type": "string" },
                "x-twilio-signature": { "type": "string" }
            },
            "required": [
                "accept", "content-length", "content-type", "host", "i-twilio-idempotency-token", 
                "user-agent", "x-amzn-trace-id", "x-forwarded-for", "x-forwarded-port", 
                "x-forwarded-proto", "x-home-region", "x-twilio-signature"
            ]
        },
        "requestContext": {
            "type": "object",
            "properties": {
                "domainName": { "type": "string" },
                "domainPrefix": { "type": "string" },
                "requestId": { "type": "string" },
                "stage": { "type": "string" },
                "time": { "type": "string" },
                "timeEpoch": { "type": "integer" }
            },
            "required": ["domainName", "domainPrefix", "requestId", "stage", "time", "timeEpoch"]
        },
        "body": { "type": "string" },
        "isBase64Encoded": { "type": "boolean" }
    },
    "required": ["version", "routeKey", "rawPath", "rawQueryString", "headers", "requestContext", "body", "isBase64Encoded"]
}


const eventBodySchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "ToCountry": { "type": "string" },
        "ToState": { "type": "string" },
        "SmsMessageSid": { "type": "string" },
        "NumMedia": { "type": "string" },
        "ToCity": { "type": "string" },
        "FromZip": { "type": "string" },
        "SmsSid": { "type": "string" },
        "FromState": { "type": "string" },
        "SmsStatus": { "type": "string" },
        "FromCity": { "type": "string" },
        "Body": { "type": "string" },
        "FromCountry": { "type": "string" },
        "To": { "type": "string" },
        "ToZip": { "type": "string" },
        "NumSegments": { "type": "string" },
        "MessageSid": { "type": "string" },
        "AccountSid": { "type": "string" },
        "From": { "type": "string" },
        "ApiVersion": { "type": "string" }
    },
    "required": [ 
        "ToCountry", "ToState", "SmsMessageSid", "NumMedia", "ToCity", "FromZip", 
        "SmsSid", "FromState", "SmsStatus", "FromCity", "Body", "FromCountry",
        "To", "ToZip", "NumSegments", "MessageSid", "AccountSid", "From", "ApiVersion"
    ]
}

/**
 * @description Validates the schema of the lambda invocation event
 */
export const validateEventSchema = (event) => {
    console.log(`schemaValidationService.js::validateEventSchema(event) | Validating event schema`);
    const validate = ajv.compile(eventSchema);
    const isValid = validate(event);

    isValid === true ? 
        console.log('schemaValidationService.js::validateEventBodySchema(eventBody) | Event schema validated successfully') : 
        console.log(`schemaValidationService.js::validateEventSchema(event) | Unable to validate event schema: ${JSON.stringify(validate.errors)}`)
    
    return isValid
}

/**
 * @description Validates the schema of the lambda invocation event body
 */
export const validateEventBodySchema = (eventBody) => {
    console.log(`schemaValidationService.js::validateEventBodySchema(eventBody) | Validating event body schema`);
    const validate = ajv.compile(eventBodySchema);
    const isValid = validate(eventBody);

    isValid === true ? 
        console.log('schemaValidationService.js::validateEventBodySchema(eventBody) | Event body schema validated successfully') : 
        console.log(`schemaValidationService.js::validateEventBodySchema(eventBody) | Unable to validate event body schema: ${JSON.stringify(validate.errors)}`)

    return isValid
}