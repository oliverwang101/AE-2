import {LightningElement, track, wire, api} from 'lwc';
import ApiRequest from '@salesforce/apex/RapidApiCallout.ApiRequest';
import { CurrentPageReference } from 'lightning/navigation';
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
const TICKER_FIELD = ['Account.TickerSymbol'];

export default class stockApex extends LightningElement {

                 error;
                 account;
                 @track param = '';
                 @track ticker;
                 @track     fullTime_Employees;
                 @track     profit_Margins;
                 @track     recent_Quarter;
                 @track     yearly_Revenue;
                 @track     yearly_Earnings;
                 stockData;
                 //Lightning Data Service Access to Account Record API
                 @api recordId;

                 // Extract the Ticker Field from the Record on Current Account  Record Page
                 @wire(getRecord, {
                   recordId: "$recordId",
                   fields: TICKER_FIELD
                 })
                 wiredRecord({ error, data }) {
                   if (data) {
                     this.account = data;
                     this.param = this.account.fields.TickerSymbol.value;
                     console.log(this.param);
                     this.error = undefined;
                   } else if (error) {
                     let message = "Unknown error";
                     if (Array.isArray(error.body)) {
                       message = error.body.map((e) => e.message).join(", ");
                     } else if (typeof error.body.message === "string") {
                       message = error.body.message;
                     }
                   }
                 }

                // Call  Apex Method RapidApiCallout.ApiRequest with Ticker Symbol as param
                @wire(ApiRequest, { ticker: '$param' })
                stockInfo({error, data}) {
                    if (data) {
                        this.stockData = JSON.parse(data);

                        let years = this.stockData.earnings.financialsChart.yearly.length;

                        this.fullTime_Employees = JSON.stringify(this.stockData.summaryProfile.fullTimeEmployees);

                        const profitData = JSON.stringify(this.stockData.financialData.profitMargins.fmt)
                        this.profit_Margins = profitData.replace(/"/g,"");
//                        console.log(this.stockData.financialData.profitMargins.fmt);

                        const recentQ = JSON.stringify(this.stockData.earnings.financialsChart.quarterly[3].date)+ ':  $' + JSON.stringify(this.stockData.earnings.financialsChart.quarterly[3].revenue.fmt);
                        this.recent_Quarter = recentQ.replace(/"/g,"");
//                        console.log('%% Recent Quarter Revenue %% '+JSON.stringify(this.stockData.earnings.financialsChart.quarterly[3].date)+ '  $' + JSON.stringify(this.stockData.earnings.financialsChart.quarterly[3].revenue.fmt));

                        const yearRevenue = JSON.stringify(this.stockData.earnings.financialsChart.yearly[years-1].revenue.fmt);
                        this.yearly_Revenue = yearRevenue.replace(/"/g,"");
//                       console.log('%% Annual Revenue %% '+ (this.stockData.earnings.financialsChart.yearly[years-1].revenue.fmt));

                        const yearEarnings = JSON.stringify(this.stockData.earnings.financialsChart.yearly[years-1].earnings.fmt);
                        this.yearly_Earnings = yearEarnings.replace(/"/g,"");
//                        console.log('%% Annual Earnings %% '+ (this.stockData.earnings.financialsChart.yearly[years-1].earnings.fmt));
                        this.error = undefined;
                    } else if (error) {
                        this.error = error;
                        this.stockData = undefined;
                    }
                }

            }


