module.exports = (app) => {
    const product = require('../controllers/product.controllers');



    //post to server database
    app.post('/api/product', product.create_product)
    app.get('/api/product', product.show_product)
    app.delete('/api/product/:id', product.delete_product)
    app.put ('/api/product/:id', product.update_product)


}