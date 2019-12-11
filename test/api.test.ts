
import {App} from '../src/core';
import {routes} from '../src/services/routes';
import {AppConfig} from '../src/core/app/app-config';
import * as http from 'http';
import * as assert from 'assert';

export const expressLoader = async () => {
    const app = new App(new AppConfig());
    // app.bodyParser();
    // app.helmet({noCache: true});
    // app.cors();
    // app.morgan();
    // app.compression();
    // app.apiPrefix(`${config.get('version')}/api`);
    app.apiPrefix(`v1/api`);
    app.modulesInitializer(routes);
    // app.swagger();
    // await app.listen(config.get('port'));
    await app.listen(8000);
  };

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