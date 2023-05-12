# **Development Notes**


## **Architecture**

- Refer to architecture.drawio file for visual

&nbsp;


## **Considerations**

1. Development
   - Write functions that are stateless, modular, and single responsibility
   - Write descriptions for functions OPTIONAL
   - Organize repo in sensible layers
2. Security
   - API Gateway
     - Use HTTPS/TLS 
     - Add WAF?
     - Control types of requests allowed
     - Reduce throttling burst and throttling rate limits
   - Lambda
     - Place in private subnet
     - Use environment variables for all sensitive data
       - Add to gitignore
     - Implement authorization for different phone numbers
     - Implement validation using Twilio 
     - Implement separate schema validation
     - Lower concurrency threshold of lambda to prevent overuse and DDoS. 
     - Configure security group of lambda to only interface with Api Gateway.
3. Error Handling
   - Add error handling for all external calls
   - Add error handling for ChatGPT error responses 
4. Testing
   - Write unit tests for all functions 
   - Write unit tests that go beyond just coverage of the happy path, and cover all reasonable permutations of workflow.

&nbsp;

## **Stories**
1. As a user, I want to be able to ask questions and receive answers from ChatGPT by texting a specific number from only my phone. 

&nbsp;