import {Request, Response, Router} from "express";
import {ProductType} from "../repositories/db";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/import-validation-middleware";
import {productsService} from "../domain/products-service";

export const productsRouter = Router({})

const titleValidation = body('title').trim().isLength({
    min: 0,
    max: 100
}).withMessage('Title lenght should be from 3 to 10 symbols')

productsRouter.get('/', async (req: Request, res: Response) => {
    const foundProducts: ProductType[] = await productsService.findProducts(req.query.title?.toString());
    res.send(foundProducts)
})

productsRouter.get('/:id', async (req: Request, res: Response) => {
    let product = await productsService.findProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})

productsRouter.post('/',
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
    const newProduct: ProductType = await productsService.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

productsRouter.put('/:id',
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        const isUpdated = await productsService.updateProduct(+req.params.id, req.body.title)
        if (isUpdated) {
            const product = await productsService.findProductById(+req.params.id)
            res.send(product)
        } else {
            res.send(404)
        }

    })

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await productsService.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})