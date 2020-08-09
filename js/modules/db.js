"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = exports.getData = exports.dbUrl = void 0;
var dbUrl = "xxxx";
exports.dbUrl = dbUrl;
function getData() {
    console.log("获取数据库的数据");
    return [{ title: "x1" }, { title: "x2" }];
}
exports.getData = getData;
function save() {
    console.log("保存数据成功");
}
exports.save = save;
