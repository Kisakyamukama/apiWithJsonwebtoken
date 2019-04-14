// verifyJwtToken
// implements 3 middleware functions
// verifyToken -> checks a JWT token is valid or not
// isAdmin -> checks if a user has ADMIN role or not
// isPmOrAdmin -> checks if user has PM or ADMIN role or NOt
// const jwt = require('jsonwebtoken');
// const config = require('../config/config.js');
// const db = require('../config/db.config.js');
// const role =db.role;
// const User = db.user;
//
// verifyToken = (req, res, next) => {
//   let token = req.headers['x-access-token'];
//
//   if(!token) {
//     return res.status(403).send({
//       auth:  false, message: 'No token provided.'
//     });
//   }
//
//   jwt.verify(token, config.secret, (err, decoded) => {
//     if (err) {
//       return res.status(500).send({
//         auth: false,
//         message: 'Failed to authenticate. Error -> ' + err
//       });
//     }
//     res.userId = decoded.id;
//     next();
//   });
// }
//
// isAdmin = (req, res, next) => {
//   user.findById(req.userId)
//   .then(user => {
//     user.getRoles().then(roles => {
//       for(let i=0; i<roles.length; i++){
//         console.log(roles[i].name);
//         if(roles[i].name.toUpperCase === 'ADMIN') {
//           next();
//           return;
//         }
//       }
//
//       res.status(403).send("Require Admin Role!");
//     })
//   })
// }
//
//
// isPmOrAdmin = (req, res, next) => {
//   User.findById(req.userId)
//   .then(user => {
//     user.getRoles().then(roles => {
//       for(let i=0; i<roles.length; i++) {
//         if (roles[i].name.toUpperCase() === 'PM') {
//           next();
//           return;
//         }
//
//         if ( roles[i].name.toUpperCase() === 'ADMIN' ) {
//           next();
//           return;
//         }
//       }
//
//       res.status(403).send("Require PM or Admin Roles!");
//     })
//   })
// }
//
// const authJwt = {}
// authJwt.verifyToken = verifyToken;
// authJwt.isAdmin = isAdmin;
// authJwt.isPmOrAdmin = isPmOrAdmin;
//
//
// module.exports = authJwt;

const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const db = require('../config/db.config.js');
const Role = db.role;
const User = db.user;

verifyToken = (req, res, next) => {
let token = req.headers['x-access-token'];

if (!token){
  return res.status(403).send({
    auth: false, message: 'No token provided.'
  });
}

jwt.verify(token, config.secret, (err, decoded) => {
  if (err){
    return res.status(500).send({
        auth: false,
        message: 'Fail to Authentication. Error -> ' + err
      });
  }
  req.userId = decoded.id;
  next();
});
}

isAdmin = (req, res, next) => {

User.findById(req.userId)
  .then(user => {
    user.getRoles().then(roles => {
      for(let i=0; i<roles.length; i++){
        console.log(roles[i].name);
        if(roles[i].name.toUpperCase() === "ADMIN"){
          next();
          return;
        }
      }

      res.status(403).send("Require Admin Role!");
      return;
    })
  })
}

isPmOrAdmin = (req, res, next) => {

User.findById(req.userId)
  .then(user => {
    user.getRoles().then(roles => {
      for(let i=0; i<roles.length; i++){
        if(roles[i].name.toUpperCase() === "PM"){
          next();
          return;
        }

        if(roles[i].name.toUpperCase() === "ADMIN"){
          next();
          return;
        }
      }

      res.status(403).send("Require PM or Admin Roles!");
    })
  })
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isPmOrAdmin = isPmOrAdmin;

module.exports = authJwt;
