var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongoose');

var db = mongo.connect("mongodb://localhost:27017/AngularCRUD",function(error,response){
    if(error){console.log(error);}
    else{
        console.log("Connected to "+db+","+response);
    }
});

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,Content-Type');
    res.setHeader('Access-Control-Allow-Credentils',true);
    next();
});


var schema = mongo.Schema;

var UsersSchema = new schema({
    name:{type:String},
    address:{type:String}
},{versionKey:false});

var usersModel = mongo.model('users',UsersSchema,'users');

app.post('/api/save-user',function(req,res){
    var mod = new usersModel(req.body);
    mod.save(function(err,data){
        if(err){res.send(err)}
        else{
            res.send({data:"Record has been Inserted..!"});
        }
    })
});

app.post('/api/update-user',function(req,res){
    usersModel.findByIdAndUpdate(req.body._id,{name:req.body.name,address:req.body.address},function(err,data){
        if(err){res.send(err)}
        else{
            res.send({data:"Record has been Updated..!"});
        }
    })
});

app.post('/api/delete-user',function(req,res){  
    usersModel.deleteOne({_id:req.body.id},function(err){
        if(err){res.send(err)}
        else{
            res.send({data:"Record has been Deleted..!"});
        }
    })
});

app.get('/api/get-user',function(req,res){
    usersModel.find({},function(err,data){
        if(err){res.send(err)}
        else{
            res.send(data);
        }
    })
});


app.listen(8080,function(){
    console.log("RUNNING on 8080");
});
