import mongoose, {Schema, Model, Document} from 'mongoose'

interface IRecord {
    _id: { type: Schema.Types.ObjectId },
    key: String,
    createdAt: Date,
    counts: [Number],
    value: String
}

interface recordModelInterface extends Model<RecordDoc> {
    build(attr: IRecord): RecordDoc
}

interface RecordDoc extends Document {
    _id: string;
    key: string,
    createdAt: Date,
    counts: number[],
    value: string

}

const recordSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    counts: {
        type: [Number],
        required: true
    },
    value: {
        type: String,
        required: true
    },
})

recordSchema.statics.build = (attr: IRecord) => {
    return new Record(attr)
}

const Record = mongoose.model<RecordDoc, recordModelInterface>('records', recordSchema);

export {Record, IRecord}

