import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getJobsFromHerokuWS from '@salesforce/apex/TalktoMyNewHerokuWebService.getJobsFromHerokuWS';

import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';

//const TICKER_FIELD = ['Account.TickerSymbol'];

export default class DisplayAccountIntelligence extends LightningElement {

    jobs;
    error;
    my_name;
    
    @api recordId;
    //@wire(CurrentPageReference) pageRef;

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
        //console.log("My name my name ... ", this.my_name);
        getJobsFromHerokuWS({ account_name: this.my_name})
            .then(result => {
                const output = JSON.parse(result);
                this.error = undefined
                //console.log("Get them Jobs ... ", output);

                if (output !== undefined) {
                    this.jobs = output;
                    console.log("Read my books for jobs ... ", this.jobs);
                    /*
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Account created',
                            variant: 'success',
                        }),
                    );
                    */
                } else {
                    console.log("No info returned in call back in selectLocation method");
                }
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                /*
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
                */
                console.log("error", JSON.stringify(this.error));
            });
    }
}