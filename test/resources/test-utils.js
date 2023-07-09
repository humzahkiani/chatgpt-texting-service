
const mockValidEvent = {
    "version": "2.0",
    "routeKey": "POST/prompts",
    "rawPath": "/prompts",
    "rawQueryString": "",
    "headers": {
        "accept": "*/*",
        "content-length": "411",
        "content-type": "application/x-www-form-urlencoded",
        "host": "mock-host.us-east-1.amazonaws.com",
        "i-twilio-idempotency-token": "mock-idempotency-token",
        "user-agent": "TwilioProxy/1.1",
        "x-amzn-trace-id": "Root=1092o120129010",
        "x-forwarded-for": "11.222.333.177",
        "x-forwarded-port": "443",
        "x-forwarded-proto": "https",
        "x-home-region": "us1",
        "x-twilio-signature": "tBdKheFXnPU/jsnadjnasdjksank/aQ="
    },
    "requestContext": {
        "domainName": "1np8wi2x85.execute-api.us-east-1.amazonaws.com",
        "domainPrefix": "sdadasdjksla",
        "requestId": "mockrequestid",
        "stage": "$default",
        "time": "14/May/2023: 02: 37: 35+0000",
        "timeEpoch": 1684031855864
    },
    "body": "VG9Db3VudHJ5PVVTJlRvU3RhdGU9JlNtc01lc3NhZ2VTaWQ9U01kNjQzYzQwMDgwNjlhNjc0NWM0NDIyMjJmNDEyODMxMSZOdW1NZWRpYT0wJlRvQ2l0eT0mRnJvbVppcD0wMDAwMCZTbXNTaWQ9U01kNjQzYzQwMDgwNjlhNjc0MTEyNDIyZjdmNDEyODMxMSZGcm9tU3RhdGU9V0EmU21zU3RhdHVzPXJlY2VpdmVkJkZyb21DaXR5PVNFQVRUTEUmQm9keT1XaGF0K2NvbG9yK2lzK3RoZStza3kmRnJvbUNvdW50cnk9VVMmVG89JTJCMTIyMjU5OTk3OTAmVG9aaXA9Jk51bVNlZ21lbnRzPTEmTWVzc2FnZVNpZD1TTWQ2NDNjNDAwODA2OWE2NzQ1YzQ0MjJmN2Y5OTk5OTk5JkFjY291bnRTaWQ9ODIzOTIxODM5MjMxODkyMzImRnJvbT0lMkIxOTE3NjAzNzY4MSZBcGlWZXJzaW9uPTIwMTAtMDQtMDE=",
    "isBase64Encoded": true
};

const mockValidEventBody = {
    "ToCountry": "US",
    "ToState": "CA",
    "SmsMessageSid": "SM5ef8732a3c483681",
    "NumMedia": "0",
    "ToCity": "San Francisco",
    "FromZip": "94107",
    "SmsSid": "SM5ef8732a3c483681",
    "FromState": "CA",
    "SmsStatus": "sent",
    "FromCity": "San Francisco",
    "Body": "Hello, this is a sample SMS",
    "FromCountry": "US",
    "To": "+14155552671",
    "ToZip": "94107",
    "NumSegments": "1",
    "MessageSid": "SM5ef8732a3c483681",
    "AccountSid": "AC5ef8732a3c483681a3c483681a3c48",
    "From": "+14155552672",
    "ApiVersion": "2010-04-01"
}

export const createMockValidEvent = () => mockValidEvent;

export const createMockValidEventBody = () => mockValidEventBody;