module.exports.encrypt = (v)=>
  {
      var va = (Buffer.from(v)).toString('base64'); 
      var vb = (Buffer.from(va)).toString('base64');; 
      return vb.split('').reverse().join('');
  };
  //not in use
  module.exports.compare = (enc,v)=>
  {
      var va = enc.split('').reverse().join(''); 
      var vb = (Buffer.from(va,'base64')).toString('ascii');
      var vc= (Buffer.from(vb,'base64')).toString('ascii');
      if(vc==v)
      {
          return true;
      }
      else {
          return false;
      }
  }
  module.exports.decrypt = (enc)=>
  {
      var va = enc.split('').reverse().join(''); 
      var vb = (Buffer.from(va,'base64')).toString('ascii');
      var vc= (Buffer.from(vb,'base64')).toString('ascii');
      return vc;
  }