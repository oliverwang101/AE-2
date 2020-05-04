@isTest
private class TalktoMyNewHerokuWebServiceTest {
    
    @isTest static void TestTalktoMyNewHerokuWebService() {
   
        Test.setMock(HttpCalloutMock.class, new TalktoMyNewHerokuWebServiceMockImpl());
        string res  = TalktoMyNewHerokuWebService.getJobsFromHerokuWS('CRM', '/categories');
        String expectedValue = '{"example":"test"}';
    }
}