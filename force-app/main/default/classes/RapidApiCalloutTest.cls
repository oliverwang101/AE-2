@isTest
private class RapidApiCalloutTest {
    
    @isTest static void TestRapidApi() {
   
        Test.setMock(HttpCalloutMock.class, new RapidApiCalloutMockImpl());
        string res  = RapidApiCallout.ApiRequest('CRM');
        String expectedValue = '{"example":"test"}';
    }
}