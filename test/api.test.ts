import * as http from 'http';
import * as assert from 'assert';
// import {App} from '../src/core';
// import {routes} from '../src/services/routes';
// import {AppConfig} from '../src/core/app/app-config';

import {expressLoader} from '../src/loaders/appLoders';

  describe("Index Test", () => {
    
    beforeAll(function(done) {
        expressLoader()
        done()
    });

    afterEach((done)=>{
        // process.exit()
        done()
    })

    it("Should get 404", function(done) {
        http.get({host: "localhost", port:8000, path: "/"}, function(res) {
            assert.equal(res.statusCode, 404);
            done();
        });
    });

    it("Should get 201", function(done) {
        http.get({host: "localhost", port:8000, path: "/v1/api/auth"}, function(res) {
            assert.equal(res.statusCode, 201);
            done();
        });
    });
});