'use strict';

var mysql = require("mysql");
var express = require('express');
var bodyParser = require('body-parser');

var TodoApp = express();

TodoApp.use(bodyParser.json());
TodoApp.use('/', express.static('./public'));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:'P8r8gl1d1ng',
  database: 'todos',
});

con.connect(function(err){
  if(err){
    console.log("JAAAAJ");
  } else {
  console.log("SIKERULT");
  }
});

TodoApp.get('/todos', function get(req, resp) {
  con.query('SELECT * FROM todos;',function(err,rows){
    if(err) {
      console.log(err.toString());
      return;
    }
    resp.send(rows);
  });
  //resp.send(todos);
});

TodoApp.get('/todos/:id', function getid(req, resp) {
  var num = req.params.id;
  con.query('SELECT * FROM todos WHERE id = ?;', [num], function(err,rows){
    if(err) {
      console.log(err.toString());
      return;
    }
    resp.send(rows);
  });
});

TodoApp.post('/todos', function add(req, resp) {
  con.query('INSERT INTO todos SET ?', [{text: req.body.text}], function(err,res){
    if(err) throw err;
    resp.send(req.body.text);
  });
});

TodoApp.put('/todos/:id', function change(req, resp) {
  con.query( 'UPDATE todos SET completed = ? Where id = ?', [req.body.completed, req.params.id], function (err, result) {
    if (err) throw err;
    resp.send(req.params.id);
  });
});

TodoApp.delete('/todos/:id', function del(req, resp) {
  con.query(
    'DELETE FROM todos WHERE id = ? AND system NOT IN (1)',
    [req.params.id],
    function (err, result) {
      if (err) throw err;
    }
  );
  resp.send(req.params.id);
});


TodoApp.listen(3000);
