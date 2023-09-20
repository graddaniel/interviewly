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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = require("fs/promises");
var node_xlsx_1 = require("node-xlsx");
function XLSXtoJSON(xlsxBuffer) {
    var parsedXlsx = node_xlsx_1.default.parse(xlsxBuffer);
    var data = parsedXlsx[0].data;
    var dataRows = data.slice(1, data.length);
    var jsonResult = {};
    for (var _i = 0, dataRows_1 = dataRows; _i < dataRows_1.length; _i++) {
        var row = dataRows_1[_i];
        addDataRowToJSON(row, jsonResult);
    }
    return jsonResult;
}
function addDataRowToJSON(row, jsonResult) {
    var key = row[0], value = row[1];
    var keyParts = key.split('/')
        .filter(function (k) { return k !== ''; })
        .map(function (k) { return isNaN(parseInt(k, 10)) ? k : parseInt(k, 10); });
    var currentJsonSection = jsonResult;
    var previousJsonSection;
    var previousKey;
    for (var i = 0; i < keyParts.length; i += 1) {
        if (!currentJsonSection[keyParts[i]]) {
            if (keyParts[i] < 100) {
                if (!Array.isArray(previousJsonSection[previousKey])) {
                    previousJsonSection[previousKey] = [];
                    currentJsonSection = previousJsonSection[previousKey];
                }
            }
            else {
                currentJsonSection[keyParts[i]] = {};
            }
        }
        if (i === keyParts.length - 1) {
            if (keyParts[i] < 100) {
                previousJsonSection[previousKey].push(value);
            }
            else {
                if (Array.isArray(currentJsonSection) &&
                    currentJsonSection.length <= keyParts[i]) {
                    currentJsonSection.push({});
                }
                currentJsonSection[keyParts[i]] = value;
            }
        }
        else if (keyParts[i] < 100 && !currentJsonSection[keyParts[i]]) {
            currentJsonSection.push({});
        }
        previousJsonSection = currentJsonSection;
        previousKey = keyParts[i];
        currentJsonSection = currentJsonSection[keyParts[i]];
    }
}
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var fileNames, _i, fileNames_1, fileName, file, _a, actualFileName, extension, json;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fileNames = ['russian_translation.xlsx'];
                    _i = 0, fileNames_1 = fileNames;
                    _b.label = 1;
                case 1:
                    if (!(_i < fileNames_1.length)) return [3 /*break*/, 5];
                    fileName = fileNames_1[_i];
                    return [4 /*yield*/, (0, promises_1.readFile)("./translations/".concat(fileName))];
                case 2:
                    file = _b.sent();
                    _a = fileName.split('.'), actualFileName = _a[0], extension = _a[1];
                    json = XLSXtoJSON(file);
                    return [4 /*yield*/, (0, promises_1.writeFile)("./jsons/".concat(actualFileName, ".json"), JSON.stringify(json))];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
})();
