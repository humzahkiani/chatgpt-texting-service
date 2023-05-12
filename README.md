# ChatGPT Texting Service

This service functions as an intermediary layer between the OpenAI API and a mobile device, allowing one to send prompts to and receive responses from ChatGPT through text messaging.

## Technologies Used
- AWS Lambda (Node.js v18.16.0)
- AWS Pinpoint
- AWS SNS

## Building and Deploying
- `sam build` to generate build
- `sam deploy --guided` to deploy using an interactive tool
- `sam deploy --config-file samconfig.toml` to use saved config file to deploy


## Local Deployment/Testing
- `sam local start-lambda` to deploy lambda locally on port 3000
- `sam local invoke "chatgpt-texting-service" -e  events/<event_name.json>` to invoke lambda using selected test event in /events folder


## Generating Test Events
- `sam local generate-event sns notification` to generate sample test event. This can be modfied for use,



## Stories
1. As a user, I want to be able to ask questions and receive answers from ChatGPT by texting a specific number from only my phone. 

## End-to-End Technical Story Workflows
Story 1
  1. User texts a question to AWS Pinpoint phone number from their phone number (already saved in Pinpoint)
  2. Pinpoint takes SMS message and phone number and forwards it to the chatgpt-texting-service-ingress sns topic.
  3. SNS Topic publishes text message contents
  4. chatgpt-texting-service lambda is subscribed to sns topic, and triggered by the message
  5. Lambda processes message, and sends contents to OpenAI Completions API.
  6. Lambda receives response from OpenAI Completions API, and sends it to a chatgpt-texting-service-egress topic. 
  7. The SNS topic grabs the phone number from either the contents of the message, or from Pinpoint, and texts the response to the user. 
