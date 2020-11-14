import {BaseResponseModel} from './BaseResponse.model';
import {StatusEnum} from "../../../utils/Status.enum";
import {Document} from "mongoose";

export class RecordResponseModel extends BaseResponseModel{
    public records: Document[];

    constructor() {
        super();
        this.records = [];
    }

    success() {
        this.msg = StatusEnum[StatusEnum.SUCCESS];
        this.code = StatusEnum.SUCCESS;
    }

    serverError(errors?: string[]) {
        this.msg = StatusEnum[StatusEnum.SERVER_ERROR];
        this.code = StatusEnum.SERVER_ERROR;
        this.errors = errors;
    }

    clientError(errors?: string[]) {
        this.msg = StatusEnum[StatusEnum.CLIENT_ERROR];
        this.code = StatusEnum.CLIENT_ERROR;
        this.errors = errors;
    }

    notFound(errors?: string[]) {
        this.msg = StatusEnum[StatusEnum.NOT_FOUND];
        this.code = StatusEnum.NOT_FOUND;
        this.errors = errors;
    }
}
