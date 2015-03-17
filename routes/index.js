var express = require('express');
var router = express.Router();
var frontControl = require('../control/frontCtrl');

// 前端首页
router.get('/', frontControl.index);
router.get('/index', frontControl.index);
// 前端登录页
router.get('/login', frontControl.showLogin);


router.get('/users/index', frontControl.index);
// 用户登录异步请求
router.route('/user/login')
.get(frontControl.login)
.post(frontControl.loginPost);
// 用户注销
// 用户登录异步请求
router.get('/user/logout', frontControl.logout);

module.exports = router;
