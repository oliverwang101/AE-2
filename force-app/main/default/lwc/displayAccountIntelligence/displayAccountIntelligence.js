import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getJobsFromHerokuWS from '@salesforce/apex/TalktoMyNewHerokuWebService.getJobsFromHerokuWS';
import postAccounttoHerokuWS from '@salesforce/apex/PosttoMyNewHerokuWebService.postAccounttoHerokuWS';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';


export default class DisplayAccountIntelligence extends LightningElement {

    jobs;
    jobsExecutives;
    error;
    my_name;
    postHappen;
    goGetCoffee = false;
    
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD] })
    wiredRecord({ error, data }) {
        if (error) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error loading Account Name',
                    message: reduceErrors(error).join(', '),
                    variant: 'error'
                })
            );
        } else if (data) {
            this.my_name = getFieldValue(data, ACCOUNT_NAME_FIELD);
        }
    }

    handleSearchClick() {
        console.log("My name is ... my name is - handleSearchClick ...", this.my_name);
        getJobsFromHerokuWS({ account_name: this.my_name, resource_path: 'categories'})
            .then(result => {
                console.log("result for jobs ... ", result.length);
                const output = JSON.parse(result);
                console.log("Read length for jobs ... ", output.length);
                this.error = undefined;
                if (output !== undefined) {
                    if (result.length == 3 && output.length === undefined) {
                        // postAccounttoHerokuWS() method
                        console.log('its comming in the if condition');
                        this.goGetCoffee = true;
                        this.postToHerokuWebService();
                    }
                    else {
                        this.jobsExecutives = null;
                        this.jobs = output;
                        //console.log('so my POST request works and is going in final if statement');
                        console.log("Read my books for jobs ... ", this.jobs);    
                    }
                } 
                else {
                    console.log("No info returned in call back in selectLocation method");
                }
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                
                console.log("error", JSON.stringify(this.error));
            });
    }


    handleJobsCategoriesSearchClick() {
        console.log("My name is ... my name is - handleJobsCategoriesSearchClick ...", this.my_name);
        getJobsFromHerokuWS({ account_name: this.my_name, resource_path: 'executives'})
            .then(result => {
                console.log("result for jobs ... ", result.length);
                const output = JSON.parse(result);
                console.log("Read length for jobs ... ", output.length);
                this.error = undefined;
                if (output !== undefined) {
                    if (output.length === 0) {
                        // postAccounttoHerokuWS() method
                        this.goGetCoffee = true;
                        this.postToHerokuWebService();
                    }
                    else {
                        this.jobs = null;
                        this.jobsExecutives = output;
                        //console.log('so my POST request works and is going in final if statement');
                        console.log("Read my books for jobs ... ", this.jobsExecutives);
                    }
                } 
                else {
                    console.log("No info returned in call back in selectLocation method");
                }
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                
                console.log("error", JSON.stringify(this.error));
            });
    }


    postToHerokuWebService() {
        // postAccounttoHerokuWS() method
        console.log("My name is ... my name is - postToHerokuWebService ...", this.my_name);
        postAccounttoHerokuWS({
                account_name: this.my_name,
            })
            .then(result => {
                console.log("result for post ... ", result.length);
                const output = JSON.parse(result);
                console.log("Read length for post ... ", output.length);
                this.error = undefined;
                if (output !== undefined) {
                    this.postHappen = output;
                    //console.log('so my POST request works and is going in final if statement');
                    console.log("Read my post for somethign ... ", this.postHappen);
                } else {
                    console.log("No info returned in call back in selectLocation method");
                }
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;

                console.log("error", JSON.stringify(this.error));
            });
    }

}

