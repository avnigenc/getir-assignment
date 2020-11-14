import {Record} from '../models/Record.model'

export class RecordService {

    public async FindRecords(startDate: Date, endDate: Date, minCount: number, maxCount: number) {
        try {
            return Record.aggregate([
                {
                    $project: {
                        "key": 1, "value": 1, "createdAt": 1, "totalCount": {"$sum": "$counts"}
                    }
                },
                {
                    $match: {
                        "createdAt": {$gte: startDate, $lte: endDate},
                        "totalCount": {$gt: minCount, $lt: maxCount}
                    }
                }
            ]);
        } catch (err) {
            return undefined;
        }
    }
}
