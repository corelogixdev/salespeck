var env = "development";
// var env = "production";
var path = require('path');
var config = () =>{
  var obj ={
    env: env,
    port: 3000,
  };
  if(env === 'production'){
  }
  return obj;
};

module.exports = config();