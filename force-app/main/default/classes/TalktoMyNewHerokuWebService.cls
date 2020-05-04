public with sharing class TalktoMyNewHerokuWebService {
    
    public TalktoMyNewHerokuWebService() {
    }

    @AuraEnabled
    public static String getJobsFromHerokuWS(String account_name, String resource_path){
        String strResponse = '';
        String some_path = '';
        if (resource_path.contains('categories')) {
            some_path = '/getJobs/' + account_name + '/categories';
        }
        else if (resource_path.contains('executives')) {
            some_path = '/getJobs/' + account_name + '/executives';
        }
        else {
            some_path = '/getJobs/' + account_name;
        }
        //String some_path = '/getJobs/' + account_name + '/categories';

        HttpRequest httpRequest = new HttpRequest();  
        Http http = new Http();
        HttpResponse httpResponse = new HttpResponse();

        httpRequest.setEndpoint('callout:LWC_Python_Heroku_Web_Service' + some_path);
        httpRequest.setMethod('GET');   
        httpRequest.setHeader('Content-Type', 'application/json');

        try {  
            httpResponse = http.send(httpRequest);
                
            if (httpResponse.getStatusCode() == 200 || httpResponse.getStatusCode() == 201) {  
                strResponse = httpResponse.getBody(); 
                // if (strResponse.equals('{}')) {
                //     //{ "result" : "retry again"}
                //     strResponse = JSON.serialize('{ "result" : "retry again" }');
                // }
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

