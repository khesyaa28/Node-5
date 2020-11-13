const {
    serviceAddUser, 
    serviceGetUsers,
    serviceUpdateUser,
    serviceDeleteUser
} = require("./user.service")
    
const { genSaltSync, hashSync, compareSync} = require("bcryptjs");
// const { sign } = require("jsonwebtoken")

module.exports = {
    controllerAddUser: (req, res)=>{
        const hasilInput = req.body;
        const salt = genSaltSync(10);
        hasilInput.password = hashSync(hasilInput.password, salt);
        serviceAddUser(hasilInput, (err, results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "failed add new user"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },

    controllerGetUsersById: (req, res) => {
        serviceGetUsersById(id, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.json({
                    sucess:0,
                    message: "Record not found"
                })
            }
            else{
                return res.json({
                    success: 1,
                    data: results
                })
            }
        })
    },

    controllerGetUsers: (req, res) => {
        serviceGetUsers((err, results)=>{
            if(err){
                console.log(err)
                return
            }
            else{
                return res.json({
                    success: 1,
                    data: results
                })
            }
        })
    },

    controllerUpdateUser: (req, res) => {
            const hasilInput = req.body;
            const salt = genSaltSync(10);
            hasilInput.password = hashSync(hasilInput.password, salt);
            serviceUpdateUser(hasilInput, (err, results)=>{
            if(err){
                console.log(err)
                return
            }
            if(!results){
                return res.json({
                    sucess:0,
                    message: "Update failed"
                })
            }
            else{
                return res.json({
                    success: 1,
                    message: "UPdate sucessfully"
                })
            }
        })
    },

    controllerDeleteUser: (req, res) => {
        const hasilInput = req.body.id
        serviceDeleteUser(hasilInput,(err, results)=>{
            if(err){
                console.log(err)
                return
            }if(!results){
                return res.json({
                    success: 0,
                    message: "Record data not found",
                })
            }else{
                return res.json({
                    success: 1,
                    message: "delete data successful",
            del: results
                })
        }
        })
    },
    controllerLogin: (req, res) => {
        const hasilInput = req.body
        serviceGetUsersByEmail(hasilInput.email, (err, results)=>{
            if(err){
                console.log(err)
            }
            if(!results){
                return res.json({
                    sucess:0,
                    message: "Invalid email or password"
                })
            }
            const result = compareSync(hasilInput.password, result.password )
            if(result){
                results.password = undefined
                const jsonwebtoken = sign({result:results}, "secretkey",{
                    expiresIn: "1h"
                })
            }else{
                return res.json({
                    success: 1,
                    data: results
                })   
            }
        })
    }
}

