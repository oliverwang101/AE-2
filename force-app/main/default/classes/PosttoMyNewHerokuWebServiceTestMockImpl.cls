// public with sharing class PosttoMyNewHerokuWebServiceTestMockImpl {
//     public PosttoMyNewHerokuWebServiceTestMockImpl() {
//     }

// }

@isTest
global class PosttoMyNewHerokuWebServiceTestMockImpl implements HttpCalloutMock {
    // Implement this interface method
    global HTTPResponse respond(HTTPRequest req) {
        // Optionally, only send a mock response for a specific endpoint
        // and method.
        System.assertEquals('callout:LWC_Python_Heroku_Web_Service/fetchJobs', req.getEndpoint());
        System.assertEquals('POST', req.getMethod());
        
        // Create a fake response
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody('{"example":"test"}');
        res.setStatusCode(200);
        return res;
    }
}
