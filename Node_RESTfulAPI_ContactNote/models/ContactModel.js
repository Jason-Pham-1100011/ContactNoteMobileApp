const mysql = require('mysql');
const db = require('./../db');

const contactModel = {
    getAllContact: (user_id,callback) =>{
        let sql = "SELECT * FROM contact WHERE contact.user_id = ?";
        
        db.query(sql,[user_id],(err,result) =>{
            if(err) throw err;
            console.log(result);
            callback(result);
        });
    },

    selectContact: (id, callback) =>{
        let sql = "SELECT * FROM contact WHERE contact.id = ?";

        db.query(sql,[id],(err,result)=>{
            if (err) throw err;
            console.log(result);
            callback(result);
        });
    },

    insertContact: (name, phone, user_id, callback) =>{
        let sql = "INSERT INTO contact (name, phone_number, user_id) VALUES (?)";
        console.log(name , phone, user_id);
        db.query(sql,[[name, phone, user_id]],(err,result) =>{
            if(err) throw err;
            console.log(result);
            callback("Insert Success");
        });
    },

    updateContact: (id, name, phone, callback) =>{
        let sql = "UPDATE contact SET name= ?, phone_number= ? WHERE id=?";

        db.query(sql,[name, phone, id],(err,result)=>{
            if(err) throw err;
            console.log(result);
            callback("Update Success");
        });
    },

    deleteContact: (id, callback) =>{
        let sql = 'DELETE FROM contact WHERE contact.id = ?';

        db.query(sql, [id], (err, result)=>{
            if (err) throw err;
            console.log(result);
            callback("Delete Success");
        });
    }
}
module.exports = contactModel