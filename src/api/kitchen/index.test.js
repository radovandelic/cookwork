import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Kitchen } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, kitchen
const testKitchen = { name: 'test_kitchen', phone: '011', description: 'Description', type: 'kitchen', address: 'Rue De la Loi 42', region: 'Bruxelles', postalCode: 1000, size: 40, AFSCA: '123', VAT: 'BE1234567', days: { daysFrom: 1, daysTo: 0 }, hours: { hoursFrom: 0, hoursTo: 24 }, capacity: 10, price: 50, rent: 5000, equipment: { microwave: true }, staff: { cookstaff: true }, cancellation: 'strict', events: true, standingCapacity: 500, sittingCapacity: 50 }

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  kitchen = await Kitchen.create({ user, ...testKitchen })
})

test('POST /kitchens 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, ...testKitchen })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test_kitchen')
  expect(body.phone).toEqual('011')
  expect(body.description).toEqual('Description')
  expect(body.type).toEqual('kitchen')
  expect(body.address).toEqual('Rue De la Loi 42')
  expect(body.size).toEqual(40)
  expect(body.AFSCA).toEqual('123')
  expect(body.VAT).toEqual('BE1234567')
  expect(body.days).toEqual({ daysFrom: 1, daysTo: 0 })
  expect(body.hours).toEqual({ hoursFrom: 0, hoursTo: 24 })
  expect(body.capacity).toEqual(10)
  expect(body.price).toEqual(50)
  expect(body.rent).toEqual(5000)
  expect(body.equipment).toEqual({ microwave: true })
  expect(body.staff).toEqual({ cookstaff: true })
  expect(body.cancellation).toEqual('strict')
  expect(body.events).toEqual(true)
  expect(body.standingCapacity).toEqual(500)
  expect(body.sittingCapacity).toEqual(50)
  expect(typeof body.user).toEqual('object')
})

test('POST /kitchens 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /kitchens 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /kitchens/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${kitchen.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(kitchen.id)
})

test('GET /kitchens/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /kitchens/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${kitchen.id}`)
    .send({ access_token: userSession, ...testKitchen })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(kitchen.id)
  expect(body.name).toEqual('test_kitchen')
  expect(body.phone).toEqual('011')
  expect(body.description).toEqual('Description')
  expect(body.type).toEqual('kitchen')
  expect(body.address).toEqual('Rue De la Loi 42')
  expect(body.size).toEqual(40)
  expect(body.AFSCA).toEqual('123')
  expect(body.VAT).toEqual('BE1234567')
  expect(body.days).toEqual({ daysFrom: 1, daysTo: 0 })
  expect(body.hours).toEqual({ hoursFrom: 0, hoursTo: 24 })
  expect(body.capacity).toEqual(10)
  expect(body.price).toEqual(50)
  expect(body.rent).toEqual(5000)
  expect(body.equipment).toEqual({ microwave: true })
  expect(body.staff).toEqual({ cookstaff: true })
  expect(body.cancellation).toEqual('strict')
  expect(body.events).toEqual(true)
  expect(body.standingCapacity).toEqual(500)
  expect(body.sittingCapacity).toEqual(50)
  expect(typeof body.user).toEqual('object')
})

test('PUT /kitchens/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${kitchen.id}`)
    .send({ access_token: anotherSession, ...testKitchen })
  expect(status).toBe(401)
})

test('PUT /kitchens/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${kitchen.id}`)
  expect(status).toBe(401)
})

test('PUT /kitchens/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, ...testKitchen })
  expect(status).toBe(404)
})

test('DELETE /kitchens/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${kitchen.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /kitchens/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${kitchen.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /kitchens/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${kitchen.id}`)
  expect(status).toBe(401)
})

test('DELETE /kitchens/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
