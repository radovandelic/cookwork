import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Order } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, adminSession, order

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  order = await Order.create({ user })
})

test('POST /orders 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, type: 'test', dateFrom: 'test', dateTo: 'test', daysFrom: 'test', daysTo: 'test', hoursFrom: 'test', hoursTo: 'test', totalDays: 'test', totalHours: 'test', totalPrice: 'test', kitchen: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.type).toEqual('test')
  expect(body.dateFrom).toEqual('test')
  expect(body.dateTo).toEqual('test')
  expect(body.daysFrom).toEqual('test')
  expect(body.daysTo).toEqual('test')
  expect(body.hoursFrom).toEqual('test')
  expect(body.hoursTo).toEqual('test')
  expect(body.totalDays).toEqual('test')
  expect(body.totalHours).toEqual('test')
  expect(body.totalPrice).toEqual('test')
  expect(body.kitchen).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /orders 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /orders 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /orders 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /orders 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /orders/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${order.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(order.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /orders/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${order.id}`)
  expect(status).toBe(401)
})

test('GET /orders/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /orders/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${order.id}`)
    .send({ access_token: userSession, type: 'test', dateFrom: 'test', dateTo: 'test', daysFrom: 'test', daysTo: 'test', hoursFrom: 'test', hoursTo: 'test', totalDays: 'test', totalHours: 'test', totalPrice: 'test', kitchen: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(order.id)
  expect(body.type).toEqual('test')
  expect(body.dateFrom).toEqual('test')
  expect(body.dateTo).toEqual('test')
  expect(body.daysFrom).toEqual('test')
  expect(body.daysTo).toEqual('test')
  expect(body.hoursFrom).toEqual('test')
  expect(body.hoursTo).toEqual('test')
  expect(body.totalDays).toEqual('test')
  expect(body.totalHours).toEqual('test')
  expect(body.totalPrice).toEqual('test')
  expect(body.kitchen).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /orders/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${order.id}`)
    .send({ access_token: anotherSession, type: 'test', dateFrom: 'test', dateTo: 'test', daysFrom: 'test', daysTo: 'test', hoursFrom: 'test', hoursTo: 'test', totalDays: 'test', totalHours: 'test', totalPrice: 'test', kitchen: 'test' })
  expect(status).toBe(401)
})

test('PUT /orders/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${order.id}`)
  expect(status).toBe(401)
})

test('PUT /orders/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, type: 'test', dateFrom: 'test', dateTo: 'test', daysFrom: 'test', daysTo: 'test', hoursFrom: 'test', hoursTo: 'test', totalDays: 'test', totalHours: 'test', totalPrice: 'test', kitchen: 'test' })
  expect(status).toBe(404)
})

test('DELETE /orders/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${order.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /orders/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${order.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /orders/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${order.id}`)
  expect(status).toBe(401)
})

test('DELETE /orders/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
