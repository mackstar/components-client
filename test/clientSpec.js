var expect = require('chai').expect;
var mockery = require('mockery');
var sinon = require('sinon');

describe("Components Client", function() {

    var client;
    var unirestSpy;

    describe("Fetching an endpoint", function() {

        beforeEach(function() {
            mockery.enable({ 
                useCleanCache: true,
                warnOnReplace: false,
                warnOnUnregistered: false
            });
            unirestStub = sinon.stub();
            unirestStub.returns({
                end: function(callback) { 
                    callback({body: "yoyoyo"});
                }
            });
            mockery.registerMock('unirest', { get: unirestStub });
            var Client = require('client');
            client = new Client('sport', ['component1', 'component2']);
        });

        afterEach(function() {
            mockery.disable();
        });

        it("should request it with accumulated components", function(done) {
            client.fetch().then(function () {
                expect(unirestStub.calledWithMatch("component=component1&component=component2")).to.true;
                done();
            });
        });

        it("should request it with a brand", function() {
            client.fetch().then(function () {
                expect(unirestStub.calledWithMatch("brand=sport")).to.true;
                done();
            });
        });
    });

});