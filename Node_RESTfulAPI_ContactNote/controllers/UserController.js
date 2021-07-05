const model = require('./../models/UserModel');
const util = require('util');
const { json } = require('express');

module.exports = {
    login: (req,res) =>{
        let {username, password} = req.body;

        model.selectUser(username,(result)=>{
            if (result[0]!=null && result[0].password === password){ 
                user_id = result[0].id;
                console.log(user_id);
                res.json({user_id: user_id, message:'success'});
            }
            else{
                res.json({message:'failed'});
            }
            //res.json(result);
        });
        
    },

    signup: (req,res) =>{
        let {username, password} = req.body;
        
        model.checkExistUser(null,username, (result) =>{
            if((result.length>0)){
                res.json({message:"Username is exist"});
            }
            else{
                model.insertUser(username, password, (result)=>{
                    if(result == 'Insert Success'){
                        res.json({message: 'success'});
                    }
                    else{
                        res.json({message: 'failed'});
                    }
                });
            }
            
        });
    },

    setting: (req,res) =>{
        let {id} = req.params;
        let {username, password} = req.body;

        model.checkExistUser(id,username, (result)=>{
            if (result[0]!=null ){
                res.json({message: 'Username is exist'});
            }
            else{
                model.updateUser(id, username, password,(result)=>{
                if(result== "Update Success"){
                    console.log('success')
                    res.json({message: 'success'});
                }
                else{
                    res.json({message: 'failed'});
                }
                });        
            }
        });

        
    }
}