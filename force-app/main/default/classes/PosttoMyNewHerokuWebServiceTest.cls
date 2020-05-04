// @isTest
// private class PosttoMyNewHerokuWebServiceTest {
//     /*
//     @isTest static void TestTalktoMyNewHerokuWebService() {
   
//         Test.setMock(HttpCalloutMock.class, new PosttoMyNewHerokuWebServiceTest());
//         string res  = PosttoMyNewHerokuWebServiceTest.postAccounttoHerokuWS('CRM');
//         String expectedValue = '{"example":"test"}';
//     }
//     */
// }

@istest
public class PosttoMyNewHerokuWebServiceTest {
    static testMethod void  testPostRestService(){
        // Set mock callout class
        Test.setMock(HttpCalloutMock.class, new PosttoMyNewHerokuWebServiceTestMockImpl());

        // Call method to test.
        // This causes a fake response to be sent
        // from the class that implements HttpCalloutMock.
        String res = PosttoMyNewHerokuWebService.postAccounttoHerokuWS('CRM');
        //String contentType = res.getHeader('Content-Type');

        //System.assert(contentType == 'application/json');
        //String actualValue = res.getBody();
        String expectedValue = '{"example":"test"}';
        System.assertEquals(res, expectedValue);
        //System.assertEquals(200, res.getStatusCode());
    }
}

