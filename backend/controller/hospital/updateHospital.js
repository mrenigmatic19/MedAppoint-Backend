const userModel = require("../../models/userModel")

async function updateHospital(req,res){
    try{
        const UserId = req.userId

        const {  email, name, role} = req.body

        const payload = {
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( role && { role : role}),
        }

        const user = await userModel.findById(UserId)

        console.log("user.role",user.role)



        const updateUser = await userModel.findByIdAndUpdate(userId,payload)

        
        res.json({
            data : updateUser,
            message : "User Updated",
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = updateHospital