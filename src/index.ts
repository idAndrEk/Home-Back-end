import express, {Request, Response} from 'express'
import bodyParser from "body-parser"
import {productsRouter} from "./routes/products-router";
import {runDb} from "./repositories/db";

//creat express app
const app = express()

app.use(bodyParser())

const port = process.env.PORT || 5000


const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/products', productsRouter)

//start app

const starApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

starApp()


