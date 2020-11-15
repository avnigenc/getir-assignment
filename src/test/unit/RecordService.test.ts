import mockingoose from "mockingoose";

const {Record, IRecord} = require('../../models/Record.model');
const {RecordService} = require('../../services/Record.service');

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

describe('Record Service', () => {
    it('should return records from service', () => {
        mockingoose(Record).toReturn(MOCK_DATA, 'aggregate');

        return new RecordService().FindRecords(
            new Date('2016-11-01'),
            new Date('2016-11-01'),
            0,
            0
        )
            .then((doc: typeof IRecord) => {
                expect(doc).toMatchObject(MOCK_DATA);
            });
    });
});
