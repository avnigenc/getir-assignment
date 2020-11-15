import mockingoose from "mockingoose";

const {Record} = require('../../models/Record.model');

const MOCK_DATA = [
    {
        "key": "GRLbHIEk",
        "createdAt": "2016-08-03T23:58:00.940Z",
        "totalCount": 49
    },
    {
        "key": "nVSJettm",
        "createdAt": "2016-11-01T21:30:20.519Z",
        "totalCount": 49
    }
];

describe('Record Model', () => {
    it('should return records from model', () => {
        mockingoose(Record).toReturn(MOCK_DATA, 'aggregate');

        return Record.aggregate([])
            .then((doc: typeof Record) => {
                expect(doc).toMatchObject(MOCK_DATA);
            });
    });
});
