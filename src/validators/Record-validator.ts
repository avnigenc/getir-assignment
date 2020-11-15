import {FindRecordRequestModel} from '../models/api/request-models/RecordRequest.model';

const DATE_REGEX = "^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$";

import {Errors} from "../utils/ErrorMessages";

export class RecordValidator {

    static findRecordValidator(recordRequest: FindRecordRequestModel) {
        const regex = new RegExp(DATE_REGEX);
        const errors = [];

        if (recordRequest.minCount === undefined) errors.push(Errors.MIN_COUNT_REQ);
        if (recordRequest.maxCount === undefined) errors.push(Errors.MAX_COUNT_REQ);
        if (recordRequest.minCount < 0 || isNaN(Number(recordRequest.minCount))) errors.push(Errors.MIN_COUNT_ERROR);
        if (recordRequest.maxCount < 0 || isNaN(Number(recordRequest.maxCount))) errors.push(Errors.MAX_COUNT_ERROR);

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

        const isValid = errors.length === 0;
        return {isValid, errors};
    }
}
