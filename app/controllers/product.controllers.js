const Product = require('../model/product.models');


exports.create_product = (req, res) => {
    var product = new Product({
        nama_produk: req.body.nama_produk,
        harga_produk: req.body.harga_produk,
        desk_produk: req.body.desk_produk,
        availability: req.body.availability
    })
    product.save()
        .then(result => {
            res.status(201).send({
                result: result
            })
        }
        ).catch(err => {
            res.status(500).send({
                error: err.message
            });
        });
}
exports.show_product = (req, res) => {
    Product.find()
        .then(result => {
            res.status(200)
                .send({
                    success: true,
                    result: result,
                    error: null
                })
        })
}

exports.delete_product = (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err) => {
        if (!err) {
            res.status(200).send({
                success: true,
                message: "product is deleted"
            })
        } else {
            res.status(500).send({
                success: false,
                message: "product is not deleted"
            })
        }
    })

}
exports.update_product = (req, res) => {

    Product.findByIdAndUpdate(req.params.id,{
        nama_produk: req.body.nama_produk ,
        desk_produk: req.body.desk_produk ,
    } ,(err) => {
        if (!err) {
            res.status(200).send({
                success: true,
                message: "product is updated"
            })
        } else {
            res.status(500).send({
                success: false,
                message: "product is not updated"
            })
        }
        if (!req.body.nama_produk) {
            return res.status(400).send({
                success: 'false',
                message: 'nama is required',
            });
        } else if (!req.body.desk_produk) {
            return res.status(400).send({
                success: 'false',
                message: 'description is required',
            });
        }
        // const updatedProduk = {
        //     id: findByIdAndUpdate.id,
        //     nama_produk: req.body.nama_produk || findByIdAndUpdate.nama_produk,
        //     desk_produk: req.body.desk_produk || findByIdAndUpdate.desk_produk,
        // };
        return res.status(201).send({
            success: 'true',
            message: 'produk added successfully'
        });
    });
   
}



