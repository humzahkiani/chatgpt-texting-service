# **Milestones** 



### **Milestone 0: Setup** DONE

1. Create lambda repo locally using SAM, Node.js and NPM
2. Create simple lambda function and run locally
3. Build and deploy to AWS using SAM CLI
4. Test Lambda in AWS through console test event

&nbsp;

### **Milestone 1: Establish Lambda Phone Communication (Happy Path)** DONE

  Implement Basic Messaging Workflow: 
  1. User texts a question to Twilio SMS Phone Number
  2. Twilio triggers Lambda thru API Gateway, and passes on SMS message contents, along with phone number of user
  3. Lambda takes message contents, validates schema and validates that request originated from Twilio
  4. Lambda takes message contents, and texts the message back to original user using Twilio Send SMS API

&nbsp;


### **Milestone 2: Integrate OpenAI Da Vinci Text Completion API (Happy Path)**

Implement ChatGPT Messaging Workflow:
  1. User texts a question to Twilio SMS Phone Number
  2. Twilio triggers Lambda thru API Gateway, and passes on SMS message contents
  3. Lambda takes message contents, and sends them to OpenAI API DaVinci Text Completions endpoint, and receives response from ChatGPT
  4. Lambda takes ChatGPT response, and texts it to original user using Twilio Send SMS API

&nbsp;

### **Milestone 3: Implement Authorization**

Implement phone number authorization such that only phone numbers in a whitelist are able to utilize service endpoints. (This does not include the pre-existing API Gateway auth features)

&nbsp;


### **Milestone 4: Integrate OpenAI ChatGPT Chat Completion API + Sessions + Database **

The OpenAI Chat Completions endpoint (ChatGPT) differs from the Text Completions endpoint (DaVinci). ChatGPT requires the historical conversation between the user and ChatGPT in addition to the current prompt in order to provide a fully contextualized response. DaVinci only requires a single prompt, and no history of previous conversations. 
1. Create sessions based use of the service, where each session is 24 hours for a single user, and the conversation of each user with ChatGPT is recorded in a database. 
2. Integrate the service with ChatGPT using the daily sessions data for each user in the database. 

&nbsp;

