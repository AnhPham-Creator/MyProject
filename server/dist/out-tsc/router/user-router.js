"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var controller = require('../controller/user-controller');
var router = function (app) {
    app.route('/view-user')
        .get(controller.init)
        .post(controller.createUser)
        .put(controller.updateuser);
    app.route('/view-user/:userId')
        .get(controller.getUserDetail)
        .delete(controller.deleteUser);
    app.route('/register/checkexist')
        .post(controller.checkexist);
};
exports.default = router;
