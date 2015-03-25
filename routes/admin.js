var express = require('express');
var router = express.Router();
var adminControl = require('../control/adminCtrl');

router.get('/test', adminControl.testList);
router.get('/*', checkLogin);

// 后台首页菜单
router.get('/', adminControl.adminIndex);
router.get('/index', adminControl.adminIndex);

/*三国杀后台列表页*/
router.get('/tkd', adminControl.tkdList);
router.get('/tkd/index', adminControl.tkdList);
// 上传图标
router.post('/upload/ico', adminControl.uploadIco);

/*个人简历后台列表页*/
router.get('/resume', adminControl.resumeIndex);
router.get('/resume/index', adminControl.resumeIndex);


/* 用户组后台列表页 */
router.get('/users', adminControl.userList);
// 查询用户(暂根据邮箱查询)
router.get('/user/search', adminControl.searchUser);
// 添加用户. 
router.route('/user/add')
.post(adminControl.addUserPost);
// 更新用户 
router.route('/user/update')
.get(adminControl.updateUser)
.post(adminControl.updateUserPost);
// 删除用户
router.post('/user/delete', adminControl.deleteUser);


//检查用户是否已登录
function checkLogin(req, res, next){
  // 用户登录不检查
  if (req.session && req.session.user){
    next();
  }else{
    res.redirect('/login');
  }
}

module.exports = router;
