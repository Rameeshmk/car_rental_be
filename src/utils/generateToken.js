import jwt from "jsonwebtoken"
import serverConfig from "../config/serverConfig.js";


function generateToken(email) {
    return jwt.sign({data:email}, serverConfig.token, { expiresIn: 'session' });
  }

  export default generateToken