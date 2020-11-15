# Getir Assignment

### Prerequisites

- [NodeJS](https://nodejs.org/en/blog/release/v12.4.0/)
- [MongoDB](https://www.mongodb.org/) 

### Packages

- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [morgan](https://www.npmjs.com/package/morgan)
- [jest](https://www.npmjs.com/package/jest)
- [mockingoose](https://www.npmjs.com/package/mockingoose)
- [cors](https://www.npmjs.com/package/cors)
- [supertest](https://www.npmjs.com/package/supertest)

## Endpoints

```
https://getir-avnigenc.herokuapp.com/api/v1/record
```

### POST api/v1/record

Get Records

**Headers**

Content-Type : application/json

**Request**

Success
```
{
	"startDate": "2016-12-07",
	"endDate": "2017-12-09",
	"minCount": 300,
	"maxCount": 500
}
```
```
{
    "msg": "SUCCESS",
    "code": 0,
    "records": [
        {
            "key": "TAKwGc6Jr4i8Z487",
            "createdAt": "2017-01-28T01:22:14.398Z",
            "totalCount": 310
        }
    ]
}
```

Invalid
```
{
	"startDate": "2016-11-022",
	"endDate": "2017-12-09",
	"minCount": 1,
	"maxCount": 300
}
```

```
{
    "msg": "INVALID_REQUEST",
    "code": 1,
    "records": [],
    "errors": [
        "Start Date Format should be 'YYYY MM-DD'"
    ]
}
```

## Running the application locally

Create .env file.

```shell
PORT=3000
DB_URI=MONGODB_URI
DB_NAME=getir-case-study
NODE_ENV=development
```

```shell
npm install
npm run dev
```

## Test

```shell
npm test
```
