var tkdCtrol = {
}
var _ = require('underscore');
var formidable = require('formidable');
var fs = require('fs');
var Rule = require('../models/TkdRule');

/**************************三国杀后台逻辑************************************/
// 查询用户列表
tkdCtrol.tkdList = function(req, res) {
  // 搜索规则列表
  Rule.fetch(function(err, rules){
    if (err){
      console.log('查询异常');
    }else{
      res.render('admin/tkd_list', { 
        title: '三国杀列表页',
        rules: rules,
        type: 'tkd'
      });
    }
  });
  
};
// 上传图标
tkdCtrol.uploadIco = function(req, res) {
  // parse a file upload
  var form = new formidable.IncomingForm(),files=[],fields=[],docs=[];
  
  //存放目录
  form.uploadDir = 'public/upload_imgs/';

  // 接收到前端传过来的文件时事件
  form.on('field', function(field, value) {
    fields.push([field, value]);
  // 前端文件读取时事件
  }).on('file', function(field, file) {
    var types = file.name.split('.');
    var date = new Date();
    var ms = Date.parse(date);
    // 传回给前端的图片地址
    var _url = "public/upload_imgs/" + ms + '_'+ file.name;

    file.url = _url;
    files.push([field, file]);
    docs.push(file);

    fs.renameSync(file.path, _url);
  // 文件读取结束事件
  }).on('end', function() {
    
    res.writeHead(200, {
      'content-type': 'text/plain'
    });
    // 自定义返回前台数据
    var _files = [];
    var _file = null;
    var _temp_file = null;
    for(var i = 0; i < docs.length; i++){
      _file = docs[i];
      // 地址替换
      _url = _file.url.replace('public', '');

      _temp_file = {
        name: _file.name,
        path: _file.path,
        size: _file.size,
        type: _file.type,
        url: _url
      };
      _files.push(_temp_file);
    }
    var out = {
      Resopnse:{
        'result-code':0,
        timeStamp:new Date()
      },
      files: _files
    };
    var sout = JSON.stringify(out);
    res.end(sout);
  });

  // 文件解析事件
  form.parse(req, function(err, fields, files) {
    err && console.log('formidabel error : ' + err);
  });
};

// 添加规则
tkdCtrol.ruleAdd = function(req, res){
  var rule = {
    title: req.body.title || '',
    desc: req.body.desc || '',
    ico: req.body.icoPath || '',
    icoName: req.body.icoName || '',
    content: req.body.ueTxt || '',
    htmlCont: req.body.ueContent || ''
  };
  if (req.body.title == null || req.body.title == '') {
    res.redirect('/admin/tkd');
  }

  Rule.createInfo(rule, function(error, result){
    if (error){
      // 写一错误显示页面， 错误信息在该页面显示之
      console.log(error);
    }else{
      res.redirect('/admin/tkd');
    }
  });

};

// 根据ID获取规则数据
tkdCtrol.getRuleById = function(req, res){
  var _id = req.query.id;
  if (_id == null || _id == ''){
    res.json({error: 'ID不能为空'});
  }else{
    Rule.findById(_id, function(err, data){
      if(err){
        res.json({error: '根据ID查询规则异常!'});
      }else{
        res.json({data: data});
      }
    });
  }
}

// 更新规则
tkdCtrol.ruleUpdate = function(req, res){
  var id = req.body.id;

  var rule = {
    title: req.body.title || '',
    desc: req.body.desc || '',
    ico: req.body.icoPath || '',
    icoName: req.body.icoName || '',
    content: req.body.ueTxt || '',
    htmlCont: req.body.ueContent || ''
  };
  Rule.updateInfo(id, rule, function(err, updateCount){
    if (err){
      console.log(err.error, '   错误码：' + updateCount);
      res.redirect('/admin/tkd');
    }else{
      res.redirect('/admin/tkd');
    }
  });
};

// 删除规则
tkdCtrol.deleteRuleById = function(req, res){
  var id = req.body.id;

  Rule.deleteInfo(id, function(err, updateCount){
    if (err){
      // console.log(err.error, '   错误码：' + updateCount);
      res.json({error: '删除规则错误', code:'500'});
    }else{
      res.json({success:'true'});
    }
  });
};

/**************************三国杀end**********************************/

module.exports = tkdCtrol