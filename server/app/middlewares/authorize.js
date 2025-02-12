const authorizeUser = (permittedRole) =>{
    return (req, res, next )=>{
        if(permittedRole.includes(req.currentUser.role)){
            next()
        }else{
        return res.status(403).json({error:[{msg: "Unauthorized access" }]})
        }
    }
}

export default authorizeUser