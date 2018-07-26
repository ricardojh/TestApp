//var users = require('../routes/users');

var userId;

 function setUserId (user) {
   userId=user.id;
  }
  function getUserId (){
      return userId;
  }


module.exports = {
  setUserId,
  getUserId
}
