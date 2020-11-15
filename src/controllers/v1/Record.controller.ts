import express, {Request, Response} from 'express'
import {RecordValidator} from '../../validators/Record-validator';
import {RecordResponseModel} from '../../models/api/response-models/RecordResponse.model';
import {StatusCodes} from 'http-status-codes';
import {RecordService} from "../../services/Record.service";

const router = express.Router()
const recordService = new RecordService();

router.post('/record', async (req: Request, res: Response) => {

    const recordResponseModel = new RecordResponseModel();

    try {
        // Validate Request
        const {isValid, errors} = RecordValidator.findRecordValidator(req.body);

        if (!isValid) {
            // Set errors and return
            recordResponseModel.validationError(errors);
            return res.status(StatusCodes.NOT_FOUND).send(recordResponseModel);
        }
        // Get records from service
        let records = await recordService.FindRecords(new Date(req.body.startDate), new Date(req.body.endDate), req.body.minCount, req.body.maxCount);
        let result: any[] = [];
        // Check records
        if (records !== undefined && records.length > 0) {
            records.forEach((record: any) => {
                result.push({
                    key: record.key,
                    createdAt: record.createdAt,
                    totalCount: record.totalCount
                });
            });
            // Set records to response model
            recordResponseModel.records = result;
        }

    } catch (e) {
        // Set errors and return
        recordResponseModel.serverError();
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(recordResponseModel);
    }
    // Return SUCCESS response with records
    return res.status(StatusCodes.OK).send(recordResponseModel);
});

export {router as recordControllerV1}
