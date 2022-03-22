import express from "express"
import Product from "./model.js"
const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
        const products = await Product.find({});
        res.status(200).send(products);
    })

productsRouter.post('/', async (req, res, next) => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.status(201).send(product)
    } catch (error) {
        res.status(400).send(error)
    }
})

productsRouter.get('/:id', async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        if(product){
            res.status(201).send(product) 
        } else {
            res.status(404).send(`product with id ${req.params.id} not found`) 

        }
    } catch (error) {
        
    }
    })

productsRouter.delete('/:id', async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        if(product){
            await Product.findByIdAndDelete(req.params.id)
            res.status(204).send() 
        } else {
            res.status(404).send(`product with id ${req.params.id} not found`) 
        }
} catch (error) {
    
}
})

export default productsRouter