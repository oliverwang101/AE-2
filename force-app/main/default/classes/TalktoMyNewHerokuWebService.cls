public with sharing class TalktoMyNewHerokuWebService {
    
    public TalktoMyNewHerokuWebService() {
    }

    @AuraEnabled
    public static String getJobsFromHerokuWS(String account_name){
        String strResponse = '';
        String some_path = 'getJobs/' + account_name;

        HttpRequest httpRequest = new HttpRequest();  
        Http http = new Http();
        HttpResponse httpResponse = new HttpResponse();

        httpRequest.setEndpoint('callout:LWC_Python_Heroku_Web_Service/'+some_path);
        httpRequest.setMethod('GET');   
        httpRequest.setHeader('Content-Type', 'application/json');

        try {  
            httpResponse = http.send(httpRequest);
                /*
                while(httpResponse.getStatusCode() == 302) {
                    httpRequest.setEndpoint(httpResponse.getHeader('Location'));
                    httpResponse = new Http().send(httpRequest);
                }
                */
            if (httpResponse.getStatusCode() == 200 || httpResponse.getStatusCode() == 201) {  
                strResponse = httpResponse.getBody(); 
            } 
            else {  
                throw new CalloutException(httpResponse.getBody());  
            }   
        } 
        catch(Exception ex) {  
            throw ex;  
        }  
            
        return strResponse;
    }

   

}
