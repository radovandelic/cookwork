import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Order } from '.'

const app = () => express(apiRoot, routes)

const testOrder = { type: 'once', dateFrom: Date.now(), dateTo: Date.now(), daysFrom: 1, daysTo: 0, hoursFrom: 0, hoursTo: 24, totalDays: 7, totalHours: 40, totalPrice: 2000, kitchen: { name: 'test_kitchen', region: 'Antwerpen', price: 20 } }
let userSession, anotherSession, adminSession, order

beforeEach(async () => {
  const user = await User.create({ firstName: 'Test', lastName: 'Testinson', email: 'test@test.com', password: '123456', lang: 'en' })
  const anotherUser = await User.create({ firstName: 'Test', lastName: 'Testinson', email: 'test2@test.com', password: '123456', lang: 'en' })
  const admin = await User.create({ firstName: 'Test', lastName: 'Testinson', email: 'admin@test.com', password: '123456', role: 'admin', lang: 'en' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  adminSession = signSync(admin.id)
  order = await Order.create({ user, ...testOrder })
})

test('POST /orders 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, ...testOrder })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.type).toEqual(testOrder.type)
  expect(Date.parse(body.dateFrom)).toEqual(testOrder.dateFrom)
  expect(Date.parse(body.dateTo)).toEqual(testOrder.dateTo)
  expect(body.daysFrom).toEqual(testOrder.daysFrom)
  expect(body.daysTo).toEqual(testOrder.daysTo)
  expect(body.hoursFrom).toEqual(testOrder.hoursFrom)
  expect(body.hoursTo).toEqual(testOrder.hoursTo)
  expect(body.totalDays).toEqual(testOrder.totalDays)
  expect(body.totalHours).toEqual(testOrder.totalHours)
  expect(body.totalPrice).toEqual(testOrder.totalPrice)
  expect(body.kitchen).toEqual(testOrder.kitchen)
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
    .send({ access_token: userSession, ...testOrder })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(order.id)
  expect(body.type).toEqual(testOrder.type)
  expect(Date.parse(body.dateFrom)).toEqual(testOrder.dateFrom)
  expect(Date.parse(body.dateTo)).toEqual(testOrder.dateTo)
  expect(body.daysFrom).toEqual(testOrder.daysFrom)
  expect(body.daysTo).toEqual(testOrder.daysTo)
  expect(body.hoursFrom).toEqual(testOrder.hoursFrom)
  expect(body.hoursTo).toEqual(testOrder.hoursTo)
  expect(body.totalDays).toEqual(testOrder.totalDays)
  expect(body.totalHours).toEqual(testOrder.totalHours)
  expect(body.totalPrice).toEqual(testOrder.totalPrice)
  expect(body.kitchen).toEqual(testOrder.kitchen)
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
