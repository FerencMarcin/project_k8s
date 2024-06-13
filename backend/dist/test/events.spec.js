"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai = __importStar(require("chai"));
const dotenv_1 = __importDefault(require("dotenv"));
const mocha_1 = require("mocha");
const request = __importStar(require("request"));
const APIServer_1 = require("../src/APIServer");
const expect = chai.expect;
dotenv_1.default.config();
const port = process.env.PORT || 8000;
const eventRequest = request.defaults({ baseUrl: `http://localhost:${port}` });
(0, mocha_1.describe)('Event controller Tests', () => {
    (0, mocha_1.before)(() => {
        return APIServer_1.APIServer.start();
    });
    (0, mocha_1.after)(() => {
        return APIServer_1.APIServer.stop();
    });
    const testEvent = {
        name: 'test event' + Math.random(),
        link: 'https://example.com',
        date: new Date(),
        organizer: 'test orga',
    };
    (0, mocha_1.describe)('The event api', () => {
        (0, mocha_1.it)('should should create an event', done => {
            eventRequest.post({
                body: testEvent,
                json: true,
                url: '/api/events',
            }, (error, response, body) => {
                expect(response.statusCode).to.eq(200);
                expectIdenticalEvents(JSON.parse(JSON.stringify(testEvent)), response.body);
                done();
            });
        });
        (0, mocha_1.it)('should list all events', done => {
            eventRequest.get('/api/events', { json: true }, (error, response, body) => {
                expectIdenticalEvents(JSON.parse(JSON.stringify(testEvent)), response.body.find((event) => event.name == testEvent.name));
                done();
            });
        });
    });
});
const expectIdenticalEvents = (expected, actual) => {
    for (const [key, value] of Object.entries(expected)) {
        expect(actual[key].toString()).to.eq(value);
    }
};
