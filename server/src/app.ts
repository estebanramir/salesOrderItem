import express from 'express'
import saleOrderItemsRouter from './routes/saleOrderItems'
import cors from 'cors'

const app = express()
app.use(cors({
  origin: 'http://localhost:3001'
}))
const port = 3000

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use(express.json())

app.use('/sale-order-items', saleOrderItemsRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
