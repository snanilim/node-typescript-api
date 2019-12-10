import * as request from 'supertest';
import {expressLoader} from "../src/loaders/appLoders";
// import {App} from '../src/core';
// import {AppConfig} from '../src/core/app/app-config';

// const app = new App(new AppConfig());

describe("GET /v1/api/auth", () => {
    it("should return 201 OK", async () => {
        // expect.assertions(1);
        const res = await request(expressLoader)
        .get("/v1/api/auth")
        console.log('res', res);
        
        expect(res.status).toEqual(201)
    }, 10000);
});