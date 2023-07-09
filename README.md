# ChatGPT Texting Service

This service functions as an intermediary layer between the OpenAI API and a mobile device, allowing one to send prompts to and receive responses from ChatGPT through text messaging.

## Technologies Used
- AWS Lambda (Node.js v18.16.0)
- AWS API Gateway (Proxy)
- AWS SAM
- OpenAI API (ChatGPT)
- Twilio API
- Twilio Phone Number

## Prerequisites
- aws-sam-cli
- awscli
- npm

## Setup
1. Run `npm install`

## Building and Deploying
- `sam build` to generate build
- `sam deploy --guided` to deploy using an interactive tool
- `sam deploy --config-file samconfig.toml` to use saved config file to deploy

## Local Deployment/Testing
- `sam local start-lambda` to deploy lambda locally on port 3000
- `sam local invoke "chatgpt-texting-service" -e  events/<event_name.json>` to invoke lambda using selected test event in /events folder
- `npm run invoke` to invoke lambda with apiGatewayTwilioTriggerEvent.json event, and environment variables from file --env-vars. This can be replaced in package.json

## Unit Tests
- `npm run test` to run unit tests
