
const router = app => {
    let userCtrl = require ('./../controllers/UserController');
    let contactCtrl = require('./../controllers/ContactController');

    app.get('/',(req, res)=> {
        console.log(`URL: ${req.url}`);
        res.send({message:'Node.js and Express REST API'});
    });

    // app.get('/users',(req,res)=>{
    //     res.send(users);
    // });

    app.route('/login')
        .post(userCtrl.login)

    app.route('/setting/:id')
        .put(userCtrl.setting)

    app.route('/signup')
        .post(userCtrl.signup)

    app.route('/edit/:id')
        .put(contactCtrl.edit)

    app.route('/list')
        .post(contactCtrl.getList)
    
    app.route('/get-contact/:id')
        .get(contactCtrl.detail)
    
    app.route('/add')
        .post(contactCtrl.add)

    app.route('/delete/:id')
        .delete(contactCtrl.delete)

}
module.exports = router;