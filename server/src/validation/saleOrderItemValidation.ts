import Joi from 'joi'

export const saleOrderItemSchema = Joi.object({
  id: Joi.string().uuid(),
  productName: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().min(0).required()
})

export const saleOrderOptionalItemSchema = Joi.object({
  id: Joi.string().uuid(),
  productName: Joi.string(),
  quantity: Joi.number().integer().min(1),
  price: Joi.number().min(0)
})
