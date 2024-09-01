import jwt from "jsonwebtoken";

import serverConfig from "../config/serverConfig.js";


{/*function authenticateUser(req, res, next) {
  const token = req.cookies.token;

  jwt.verify(token, serverConfig.token, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);
  

    req.user = user;
    console.log(req.user.role);

    next();
  });
}

export default authenticateUser;*/}



function authenticateUser(req, res, next) {
  const token = req.sessionStorage.token;

  jwt.verify(token, serverConfig.token, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);
  

    req.user = user;
    

    next();
  });
}

export default authenticateUser;;