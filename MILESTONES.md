# **Milestones** 



### **Milestone 0: Setup** DONE

1. Create lambda repo locally using SAM, Node.js and NPM
2. Create simple lambda function and run locally
3. Build and deploy to AWS using SAM CLI
4. Test Lambda in AWS through console test event

&nbsp;

### **Milestone 1: Establish Lambda Phone Communication (Happy Path)**

  Implement Basic Messaging Workflow: 
  1. User texts a question to Twilio SMS Phone Number
  2. Twilio triggers Lambda, and passes on SMS message contents, along with phone number of user
  3. Lambda takes message contents, and texts the message back to original user using Twilio Send SMS API, prepended with "Received message: "

&nbsp;


### **Milestone 2: Integrate OpenAPI API (Happy Path)**

Implement ChatGPT Messaging Workflow:
  1. User texts a question to Twilio SMS Phone Number
  2. Twilio triggers Lambda, and passes on SMS message contents
  3. Lambda takes message contents, and sends them to OpenAI API Completions endpoint, and receives response from ChatGPT
  4. Lambda takes ChatGPT response, and texts it to original user using Twilio Send SMS API

&nbsp;


### **Milestone 3: Testing and Error Handling**

1. Write Unit Tests for ChatGPT Messaging Workflow
2. Write Error Handling for ChatGPT Messaging Workflow


