import jwt from "jsonwebtoken"

async function authentication(req,res,next){
    try {
        let token=req.headers.authorization.split(" ")[1] //use berear token
        //console.log("token",token)
        let decode= await jwt.verify(token,"ritik")
        let {userid}=decode
        //console.log(decode)
        //console.log(userid)
        req.userid=userid
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({"msg":"something went wrong during authentication"})
    }
}


export default authentication