const Product = require('../models/Product')


const productController = {
    async index(req, res) {

        const products = await Product.find()

        return res.status(200).json(products)

    },
    async create(req, res) {
        const { name, quantity, price, categories, image } = req.body


        if (!name || !quantity || !price || !categories || !image) {
            return res.status(400).send('Preencha todos os campos')
        }
        const productAlreadyExists = await Product.findOne({ name })
        if (productAlreadyExists) {
            return res.status(400).send('Já existe um produto com esse nome')
        }

        const newProduct = await Product.create(req.body)

        return res.status(201).json(newProduct)
    },
    async edit(req, res) {
        const change = req.body
        const _id = req.params._id

        const updatedProduct = await Product.findOneAndUpdate({ _id }, change)
        if (!updatedProduct) {
            return res.status(400).json({ msg: "Erro: O produto não existe." })
        }


        return res.status(200).json(updatedProduct)
    },
    async delete(req, res) {
        const _id = req.params._id

        const deletedProduct = await Product.deleteOne({ _id })

        if (!deletedProduct) {
            return res.status(400).json({ msg: "Erro: O produto não existe." })
        }


        return res.status(200).json(deletedProduct)

    }

}

module.exports = productController