const Product = require('./app/models/product')

const addProduct = async (req, res) => {

    let info = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    }

    const product = await Product.create(info)
    res.status(200).send(product)
    console.log(product)

}

const getAllProducts = async (req, res) => {

    let products = await Product.findAll({})
    res.status(200).send(products)

}

const getOneProduct = async (req, res) => {

    let id = req.params.id
    let product = await Product.findOne({ where: { id: id }})
    res.status(200).send(product)

}

const updateProduct = async (req, res) => {

    let id = req.params.id

    const product = await Product.update(req.body, { where: { id: id }})

    res.status(200).send(product)
   

}

const deleteProduct = async (req, res) => {

    let id = req.params.id
    
    await Product.destroy({ where: { id: id }} )

    res.status(200).send('Product is deleted !')

}


const getFeaturedProduct = async (req, res) => {

    const products =  await Product.findAll({ where: { Featured: true }})

    res.status(200).send(products)}


module.exports = {
    addProduct,
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct, 
    getFeaturedProduct
}