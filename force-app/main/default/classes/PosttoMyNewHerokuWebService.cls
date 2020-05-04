public with sharing class PosttoMyNewHerokuWebService {
    public PosttoMyNewHerokuWebService() {
    }

    @AuraEnabled
    public static String postAccounttoHerokuWS(String account_name){
        String strResponse = '';
        String some_path = '/getJobs/' + account_name + '/categories';
        // http://lwc-python-api.herokuapp.com/fetchJobs
        HttpRequest httpRequest = new HttpRequest();  
        Http http = new Http();
        HttpResponse httpResponse = new HttpResponse();

        // httpRequest.setEndpoint('callout:LWC_Python_Heroku_Web_Service' + some_path);
        // httpRequest.setMethod('GET');   
        // httpRequest.setHeader('Content-Type', 'application/json');


        httpRequest.setEndpoint('callout:LWC_Python_Heroku_Web_Service/fetchJobs');
        httpRequest.setMethod('POST');
        httpRequest.setHeader('Content-Type', 'application/json');
        // Set the body as a JSON object
        httpRequest.setBody('{ "accountName": "' + account_name + '" }');
        
        try {  
            httpResponse = http.send(httpRequest);
                
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
            
            // else if (httpResponse.getStatusCode() == 400) {
            //     //strResponse = '{check me again after sometime}';
            //     // http POST http://lwc-python-api.herokuapp.com/fetchJobs accountName=gap
            //     httpRequest.setEndpoint('callout:LWC_Python_Heroku_Web_Service/' + 'fetchJobs');
            //     httpRequest.setMethod('POST');
            //     //httpRequest.setHeader('Content-Type', 'application/json;charset=UTF-8');
            //     httpRequest.setHeader('Content-Type', 'application/json');
            //     // Set the body as a JSON object
            //     httpRequest.setBody('{ "accountName": "' + account_name + '" }');
            //     //HttpResponse httpResponse = http.send(httpRequest);
            //     // Parse the JSON response
            //     if (httpResponse.getStatusCode() == 201 || httpResponse.getStatusCode() == 200) {
            //         //strResponse = httpResponse.getBody();
            //         strResponse = '{ "result": "Please get this working, reponse from my enqueued job" }'; 
            //         //System.debug(strResponse);
            //     } 
            //     else {
            //         //System.debug('Not expected: ' + httpResponse.getStatusCode() + ' ' + httpResponse.getStatus());
            //         throw new CalloutException(httpResponse.getBody());  
            //     }
            // } 
            