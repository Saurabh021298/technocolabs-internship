import { LightningElement, wire, api } from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import { getDataset, executeQuery } from 'lightning/analyticsWaveApi';
import LOCALE from '@salesforce/i18n/locale';
import TIMEZONE from '@salesforce/i18n/timeZone';
import DCELast_Updated_at from '@salesforce/label/c.DCELast_Updated_at'

export default class dceTimestamp extends NavigationMixin(LightningElement) {
  @api width;
  @api height;
  @api icon;
  @api ids;
  @api idOrApiName;
  /*properties for timestamp changes*/
  @api results;
  @api metadata;
  @api selection;
  @api setSelection;
  @api selectMode;
  @api getState;
  @api setState;
  @api recordId;

  @api refresh;
  @api dstate;
  @api dbstate;
  @api mydatasets;
  @api recipedata;
  @api recipedata1;
  @api saqlquery;
  @api saqlresponse;

  @api assetdata;

  label = {
    DCELast_Updated_at,
  };

  saqlquery = ''
  datasetTimestamp = '';
  queryTimestamp = '';

  get computedQuery() {
    if (!this.saqlquery) {
      return undefined;
    }
    return {
      query: this.saqlquery
    }
  }

  get lastUpdatedTimestamp(){
    const timestamp = this.queryTimestamp || this.datasetTimestamp;
    if(!timestamp) return '';
    const datetime = new Date(timestamp);
    if(this.isDateValid(datetime)){
      return this.converTimeToLocal(datetime);
    }
    return timestamp;
  }

  getSaqlQueryWithParams(datasetId, currentVersionId) {
    return `q = load "${datasetId}/${currentVersionId}"; q = group q by all; q = foreach q generate first('Timestamp') as 'Timestamp';`;
  }

  @wire(executeQuery, {
    query: '$computedQuery'
  })
  onExecuteQuery({ data, error}) {
    if (error) {
      throw new Error(JSON.stringify(error, '  '));
    } else if (data) {
      this.queryTimestamp = data.results.records[0].Timestamp;
    }
  }

  @wire(getDataset, {
    datasetIdOrApiName: '$idOrApiName'
  })
  onGetDataset({ data, error }) {
    if (error) {
      throw new Error(JSON.stringify(error, '  '));
    } else if (data) {
      const recipedata = JSON.parse(JSON.stringify(data));
      this.datasetTimestamp = recipedata.dataRefreshDate;
      this.saqlquery = this.getSaqlQueryWithParams(recipedata.id, recipedata.currentVersionId);
    }
  }

  isDateValid(date){
    return date instanceof Date && !isNaN(date)
  }

  converTimeToLocal(date) {
    const options = {
      hour: 'numeric', minute: 'numeric',
      hour12: true,
      timeZone: TIMEZONE
    };
    return new Intl.DateTimeFormat(LOCALE, options).format(date);

  }
}