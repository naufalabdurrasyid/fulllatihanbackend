module.exports = (app) => {
    const user = require('../controllers/user.controllers');



    //post to server database
    app.post('/api/user', user.create_user)
    app.get('/api/user', user.show_user)

   
}