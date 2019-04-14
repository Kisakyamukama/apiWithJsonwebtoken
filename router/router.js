const verifySignUp =  require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

  const controller =  require('../controller/controller.js');

  app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail,verifySignUp.checkRolesExisted ], controller.signup);

  app.post('/api/auth/signin', controller.signin);

  app.post('/api/test/user', [authJwt.verifyToken], controller.userContent);
  
  app.post('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);

  app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);




}
