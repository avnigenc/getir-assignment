import {FindRecordRequestModel} from '../models/api/request-models/RecordRequest.model';

// Date validation REGEX YYYY-MM-DD
const DATE_REGEX = "^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$";

import {Errors} from "../utils/ErrorMessages";

export class RecordValidator {

    // Validate request body
    static findRecordValidator(recordRequest: FindRecordRequestModel) {
        const regex = new RegExp(DATE_REGEX);
        const errors = [];

        if (recordRequest.minCount === undefined) errors.push(Errors.MIN_COUNT_REQ);
        if (recordRequest.maxCount === undefined) errors.push(Errors.MAX_COUNT_REQ);
        // minCount and maxCount should be greater than zero and be a number
        if (recordRequest.minCount < 0 || isNaN(Number(recordRequest.minCount))) errors.push(Errors.MIN_COUNT_ERROR);
        if (recordRequest.maxCount < 0 || isNaN(Number(recordRequest.maxCount))) errors.push(Errors.MAX_COUNT_ERROR);

        // Check date fields
        if (recordRequest.startDate) {
            if (!regex.test(recordRequest.startDate.toString())) errors.push(Errors.START_DATE_FORMAT_ERROR);
        } else {
            errors.push(Errors.START_DATE_REQ);
        }

        if (recordRequest.endDate) {
            if (!regex.test(recordRequest.endDate.toString())) errors.push(Errors.END_DATE_FORMAT_ERROR);
        } else {
            errors.push(Errors.END_DATE_REQ)
        }

        // Check errors
        const isValid = errors.length === 0;
        return {isValid, errors};
    }
}
