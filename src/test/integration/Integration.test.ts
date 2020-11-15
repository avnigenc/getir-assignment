const axios = require('axios');

describe('POST/api/v1/record', () => {
    it('should return records with the status of 200', async () => {
        // TODO remove hard coded
        const result = await axios.post('http://localhost:3000/api/v1/record', {
            "startDate": "2016-12-07",
            "endDate": "2017-12-09",
            "minCount": 300,
            "maxCount": 500
        });
        expect(result.status).toEqual(200);
        expect(result.data).toMatchObject({
            code: 0,
            msg: "SUCCESS"
        });
    });
})
