import {StatusEnum} from "../../../utils/Status.enum";

export class BaseResponseModel {
    public code: number;
    public msg: string;
    public errors?: string[];

    constructor() {
        this.msg = StatusEnum[StatusEnum.SUCCESS];
        this.code = StatusEnum.SUCCESS;
    }
}
