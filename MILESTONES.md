## Stories
1. As a user, I want to be able to ask questions and receive answers from ChatGPT by texting a specific number from only my phone. 

## End-to-End Technical Story Workflows
Milestone 1: Establish Lambda Phone Communication
  1. User texts a question to Twilio SMS Phone Number
  2. Twilio triggers Lambda, and passes on SMS message contents
  3. Lambda takes message contents, and sends them back to Twilio in request, prepended with "Received message: "
  4. Twilio texts SMS message to original user from same phone number 

