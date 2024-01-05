import express, { type Request, type Response } from 'express'
import { saleOrderItemSchema, saleOrderOptionalItemSchema } from '../validation/saleOrderItemValidation'
import { type SaleOrderItem } from '../models/SaleOrderItem'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()
const saleOrderItems: SaleOrderItem[] = [
  {
    id: '1cbaee5e-78b1-4bf1-b914-e0715cb2fc13',
    productName: 'shirt',
    quantity: 23,
    price: 54
  },
  {
    id: '5dfd169c-25b7-47cf-b53d-f0fd51d195e4',
    productName: 'pants',
    quantity: 500,
    price: 32
  },
  {
    id: 'a7ec6d3a-7e56-4b25-a24f-85c882b33c7f',
    productName: 'shorts',
    quantity: 200,
    price: 10
  }
]

router.post('/', (req: Request, res: Response) => {
  try {
    const { productName, quantity, price } = req.body
    const newSaleOrderItem: SaleOrderItem = {
      id: uuidv4(),
      productName,
      quantity,
      price
    }
    const { error } = saleOrderItemSchema.validate(newSaleOrderItem)
    if (error != null) {
      return res.status(400).json({ message: (error as Error).message })
    } else {
      saleOrderItems.push(newSaleOrderItem)
      res.status(201).json(newSaleOrderItem)
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/', (req: Request, res: Response) => {
  res.json(saleOrderItems)
})

router.get('/:id', (req: Request, res: Response) => {
  const saleOrderItem = saleOrderItems.find((item) => item.id === req.params.id)
  console.log(saleOrderItem)
  if (saleOrderItem !== undefined) {
    res.json(saleOrderItem)
  } else {
    res.status(404).json({ message: 'Sale Order Item not found' })
  }
})

router.put('/:id', (req: Request, res: Response) => {
  try {
    const { error } = saleOrderOptionalItemSchema.validate(req.body)
    if (error != null) {
      return res.status(400).json({ message: (error as Error).message })
    } else {
      const saleOrderItemIndex = saleOrderItems.findIndex((item) => item.id === req.params.id)
      if (saleOrderItemIndex !== -1) {
        saleOrderItems[saleOrderItemIndex] = {
          ...saleOrderItems[saleOrderItemIndex],
          ...req.body
        }
        res.json(saleOrderItems[saleOrderItemIndex])
      } else {
        res.status(404).json({ message: 'Sale Order Item not found' })
      }
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

router.delete('/:id', (req: Request, res: Response) => {
  const saleOrderItemIndex = saleOrderItems.findIndex((item) => item.id === req.params.id)
  if (saleOrderItemIndex !== -1) {
    const deletedItem = saleOrderItems.splice(saleOrderItemIndex, 1)[0]
    res.json(deletedItem)
  } else {
    res.status(404).json({ message: 'Sale Order Item not found' })
  }
})

export default router
