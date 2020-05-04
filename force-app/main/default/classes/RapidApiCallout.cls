public with sharing class RapidApiCallout {
    @AuraEnabled(cacheable=true)
    public static string ApiRequest(string ticker) {
        String strResponse = '';
        Http http = new HTTP();
        HttpRequest HttpRequest = new HttpRequest();
        HttpResponse httpResponse = new HttpResponse();
        HttpRequest.setMethod('GET');
        HttpRequest.setHeader('Content-Type','application/json');
        // API Key stored as Named Credential Password
        HttpRequest.setHeader('x-rapidapi-key','{!$Credential.Password}');
        HttpRequest.setHeader('x-rapidapi-host','apidojo-yahoo-finance-v1.p.rapidapi.com');
        // Makes a callout to the Yahoo Finance Stock API
        HttpRequest.setEndpoint('callout:Yahoo_Finance/stock/v2/get-summary?symbol=' + ticker);
        //req.setEndpoint('callout:Yahoo_Finance/stock/v2/get-summary?symbol=CRM');

        try{
          httpResponse = http.send(httpRequest);
          if(httpResponse.getStatusCode() == 200 || httpResponse.getStatusCode() == 201){
            strResponse = httpResponse.getBody(); 
          }
          else {
            throw new CalloutException(httpResponse.getBody());
          }
        }
        catch (Exception ex) {
          throw ex;
        }

        return strResponse;
    }
}