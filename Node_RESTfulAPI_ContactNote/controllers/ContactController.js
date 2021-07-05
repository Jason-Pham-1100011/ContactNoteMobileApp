const model = require('./../models/ContactModel');
const util = require('util')

module.exports = {
    getList: (req,res) =>{
        let {user_id} = req.body;
        model.getAllContact(user_id, (result)=>{
            res.json(result);
        });
        //res.status(200)
    },

    detail: (req,res) =>{
        let {id}  = req.params;
        model.selectContact(id,(result)=>{
            res.json(result);
        });
    },

    add: (req, res) =>{
        let {name, phone_number, user_id}  = req.body;
        console.log(name, phone_number, user_id);
        model.insertContact(name, phone_number, user_id, (result)=>{
            if (result == 'Insert Success'){
                res.json({message: 'success'});
            }
            else{
                res.json({message: 'failed'});
            }
        });
    },

    edit: (req, res) =>{
        let {id} = req.params;
        let {name, phone_number} = req.body;

        model.updateContact(id, name, phone_number, (result)=>{
            if (result == 'Update Success'){
                res.json({message: 'success'});
            }
            else{
                res.json({message: 'failed'});
            }
        });      
    },

    delete: (req, res) =>{
        let {id} = req.params;

        model.deleteContact(id, (result)=>{
            if (result == 'Delete Success'){
                res.json({message: 'success'});
            }
            else{
                res.json({message: 'failed'});
            }
        });
    },
}