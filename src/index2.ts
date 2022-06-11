import express, {NextFunction, Request, Response} from 'express'

//creat express app
const app = express()
const blablaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.blabla = "hello";
    next();
}
const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(req.query.token === "123") {
        next();
    } else {
        res.send(401)
    }
}

let requestCounter = 0

const requestCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    requestCounter++;
    next()
}

app.use(requestCounterMiddleware)
app.use(blablaMiddleware)
app.use(authGuardMiddleware)

const port = process.env.PORT || 5000

app.get('/products', blablaMiddleware, (req: Request, res: Response) => {
    // @ts-ignore
    const blabla = req.blabla;
    res.send({value: blabla +"!!!" + requestCounter})
})
app.get('/users',  (req: Request, res: Response) => {
    // @ts-ignore
    const blabla = req.blabla;
    res.send({value: blabla +" from users!!!" + requestCounter})
})

//start app
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})