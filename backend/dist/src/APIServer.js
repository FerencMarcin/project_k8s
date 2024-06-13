"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIServer = void 0;
const express_1 = __importDefault(require("express"));
const typescript_rest_1 = require("typescript-rest");
const EventsController_1 = require("./controller/EventsController");
const MongoConnector_1 = require("./MongoConnector");
class APIServer {
    static start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield MongoConnector_1.MongoConnector.connect();
            APIServer.app = (0, express_1.default)();
            const port = process.env.PORT || 8000;
            typescript_rest_1.Server.buildServices(APIServer.app, EventsController_1.EventsController);
            APIServer.server = APIServer.app.listen(port, () => {
                console.log(`Server startet at https://localhost:${port}`);
            });
        });
    }
    static stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield APIServer.server.close();
            yield MongoConnector_1.MongoConnector.disconnect();
        });
    }
}
exports.APIServer = APIServer;
