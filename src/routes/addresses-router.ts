import {Request, Response, Router} from "express";
const addresses = [{id: 1,value: 'Nezalejnasti 12'}, {id: 2, value: 'Selickage 11'}]

export const addressesRouter = Router ({})

addressesRouter.get ('/', (req: Request, res: Response) => {
    res.send(addresses)
})
addressesRouter.get ('/:id', (req: Request, res: Response) => {
    let address = addresses.find(p => p.id === +req.params.id);
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
})