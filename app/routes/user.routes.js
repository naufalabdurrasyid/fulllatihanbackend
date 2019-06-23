module.exports = (app) => {
    const user = require('../controllers/user.controllers');
    var auth = require('../middleware/auth')


    //post to server database
    app.post('/api/user', user.create_user)
    app.get('/api/user', user.show_user)
    app.get('/api/user/auth', auth.isAuth, user.show_user)
    app.put('/api/user/:id', user.update_user)
    app.post('/api/user/login', user.user_login )
    app.get('/api/user/verify', user.user_verify)
    app.post('/api/user/post', auth.isAuth, user.user_post )
    //app.get('/api/user/post/content', user.user_content)



   
}