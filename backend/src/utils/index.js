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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserErrorHandler = exports.registerUser = exports.entities = exports.paths = void 0;
__exportStar(require("./generators"), exports);
__exportStar(require("./getters"), exports);
var paths_1 = require("./paths");
Object.defineProperty(exports, "paths", { enumerable: true, get: function () { return paths_1.paths; } });
var entities_1 = require("./entities");
Object.defineProperty(exports, "entities", { enumerable: true, get: function () { return entities_1.entities; } });
var registerUser_1 = require("./registerUser");
Object.defineProperty(exports, "registerUser", { enumerable: true, get: function () { return registerUser_1.registerUser; } });
Object.defineProperty(exports, "registerUserErrorHandler", { enumerable: true, get: function () { return registerUser_1.registerUserErrorHandler; } });
