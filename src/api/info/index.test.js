import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Info } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, info
const today = Date.now()
const testInfo = { activity: 'caterer', purpose: 'test', region: 'Bruxelles', phone: '011', type: 'once', dateFrom: today, dateTo: today, daysFrom: 1, daysTo: 0, hoursFrom: 0, hoursTo: 24, comments: 'This is a comment.' }

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  info = await Info.create({ user, ...testInfo })
})

test('POST /infos 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, ...testInfo })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.activity).toEqual('caterer')
  expect(body.purpose).toEqual('test')
  expect(body.region).toEqual('Bruxelles')
  expect(body.phone).toEqual('011')
  expect(body.type).toEqual('once')
  expect(Date.parse(body.dateFrom)).toEqual(today)
  expect(Date.parse(body.dateTo)).toEqual(today)
  expect(body.daysFrom).toEqual(1)
  expect(body.daysTo).toEqual(0)
  expect(body.hoursFrom).toEqual(0)
  expect(body.hoursTo).toEqual(24)
  expect(body.comments).toEqual('This is a comment.')
  expect(typeof body.user).toEqual('object')
})

test('POST /infos 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /infos 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /infos 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /infos 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /infos/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${info.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(info.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /infos/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${info.id}`)
  expect(status).toBe(401)
})

test('GET /infos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('DELETE /infos/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${info.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /infos/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${info.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /infos/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${info.id}`)
  expect(status).toBe(401)
})

test('DELETE /infos/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
