export class FindRecordRequestModel {
    public startDate: Date;
    public endDate: Date;
    public minCount: number;
    public maxCount: number;

    constructor(startDate: Date, endDate: Date, minCount: number, maxCount: number) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.minCount = minCount;
        this.maxCount = maxCount;
    }
}
