### 项目日志

#### 开发计划：
* 03.15 - 03.21 1.完成用户登录； 2.三大块前后台基本页面UI。 3.后台啊规则页添加 百度编辑器， 弹出框垂直居中。
* 待优化代码： 
  * 1.登录时 loading提示； 
  * 2.将用户更新、用户添加页面整合进 用户列表页面（改为异步拉取数据）。

* 04.12 - 04.25 完成个人简历前后端界面
  * 原有7菜单-》对应4菜单
  * 1.首页， 显示一大照片以及欢迎页面；
  * 2.个人简介， 显示个人技能、照片；
  * 3.项目简介， 显示6 个项目（公司项目3个， 个人项目3个）；
  * 4.联系方式， 技术交流、项目交流、工作机会交流；
  * 5.我的好友， 朋友简介： 龙贱（android） 桌旗（游戏） 耀柱（ios） 惠乾（java）大熊（java） 俊华（游戏）  (待加...)

* 04-18 整理 简历模板调用的样式、脚本库：
  * font-awesome.css  字体图标样式文件
  * animate.css css3 实现动画效果的 样式库
  * prettyPhoto.js  图片特效插件
  * jquery.easing.js  实现图片阴影效果
  * sidemenu.js jquery 模拟android 菜单效果（移动端显示）
  * responsive-nav.js 响应式插件（网页菜单支持移动平台）
  * jquery.easy-pie-chart.js 显示百分比矢量图
  * jquery.stellar.js 视觉差实现 插件
  * flexslider.js 全屏焦点图轮播切换插件
  * waypoints.js  滚动监听插件
  * retina.js   使用高分辨率 图片替代 低分辨率图片插件

* 04-25 手机二维码更新： 指向阿里云服务器， 二维码位置优化；
* 04-28 个人网站 内容整理。。。


#### 开发日志
* 03-11 打开 microBlog 项目， 出现 “Please ensure that you set the default write concern for the database”提示！！
* 方案 : 网上已有标准答案:
```javascript
module.exports = new Db(
  settings.dbName, 
  new Server(settings.host, Connection.DEFAULT_PORT, {})
);
```
改为
```javascript
module.exports = new Db(
  settings.dbName, 
  new Server(settings.host, Connection.DEFAULT_PORT, {safe: true})
);
```
* 'connect-mongo'模块还是调用了 'mongodb'模块， 以上问题为 “mongodb”使用事项（ps: mogooose模块已经在内部整合'mongodb'所以不会有该问题）

* 03-13 windows 上无法安装加密模块 npm install bcrypt， 报错： node-gyp rebuild
* 方案： windows上用bcrypt-nodejs 替代 bcrypt, 另 只能用同步加密法

* 03-13 mongoose Schema.pre('save', callback)数据更新时， 该方法不会被调用。。。
* 方案： 更新不用 update 方法， 改用save方法；（先findById 然后 用 underscore新继承对象覆盖）

* 03-17  express-session 模块， 保存的内容req.session.xxx, nodejs 重启后消失。。。
* 方案： 将session 数据存在cookies 、 内存 、redis 或 mongodb中；

* 03-27  前端上传插件 file-upload 按钮点击触发， 触发一次后再次点击不会上传
* 方案： 不用按钮触发， 使文件按钮隐藏（透明度设置成0）并覆盖在按钮上。

* 04-02  上传图标控件， 前后台地址不对应；（保存在硬盘的图片名称与传回前端名字不同）
* 方案： 新设置一自定义变量， 将前后台处理的json格式统一。

* 04-04 使用mongoose 的 mongoose.model('tkdrule', TkdRuleSchema); 写入数据库时， 为什么会变成写入到tkdrules中去？
* 方案：因为 mongoose.model(name,[schme],[collection],[skipInit]); 第一个参数的只是模型的名字并不是对应的数据库名。第三个参数才是对应的数据库表名。

* 04-14 个人简历前端页面， 冗余代码较多，需要时间慢慢清理代码；还是不如自己从零开始编码爽
* 方案：慢慢删减, github的容量为1GB，所以几十兆的图片、第三方库放心放上去。