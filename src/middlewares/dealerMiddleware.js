import jwt from "jsonwebtoken"
import serverConfig from "../config/serverConfig.js"

const authenticateDeal = (req,res,next)=>{

    const token = req.sessionStorage.token
    
    jwt.verify(token,serverConfig.token, (err, result) => {
        if (err){
            console.log(err);
            
            return res.status(401).send("not verified")
        }

        console.log("dealer token",result);

        if(result.role !== "admin" && result.role !== "dealer") {
            res.status(401).send("not admin && not dealer")
        }

        req.user=result;
        console.log(req.user);

        next();
    });
};

export default authenticateDeal; 