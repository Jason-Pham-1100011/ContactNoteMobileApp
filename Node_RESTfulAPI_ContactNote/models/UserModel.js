const mysql = require('mysql');
const db = require('./../db');

const userModel = {
    
    selectUser: (username, callback) =>{
        let sql = "SELECT * FROM user WHERE user.username = ?";
        db.query(sql,[username],(err, result)=>{
            if (err) throw err;
            console.log(result);
            callback(result);
            
        });

    },

    insertUser: (username, password, callback) =>{
        let sql = "INSERT INTO user (username, password) VALUES (?)";
        db.query(sql, [[username, password]], (err, result)=>{
            if (err) throw err;
            console.log(result);
            callback('Insert Success');
        });
    },

    updateUser: (id, username, password,callback) => {
        let sql = "UPDATE user SET username=?, password=? WHERE id= ?";
        db.query(sql,[username,password,id],(err,result)=>{
            if (err) throw err;
            console.log(result.message);
            callback('Update Success');
        });
    },

    checkExistUser: (id,username,callback) => {
        
        var sql, query_params;
        if (id == null)
        {
            sql  = "SELECT * FROM user WHERE username = ?";
            query_params = [username];
        }
        else{
            sql = "SELECT * FROM user WHERE user.id <> ? AND user.username= ?";
            query_params = [id, username];
        }
        console.log(id);    
        db.query(sql, query_params, (err, result) =>{
            if (err) throw err;
            console.log(result);
            callback(result);
        });
    }
}
module.exports = userModel