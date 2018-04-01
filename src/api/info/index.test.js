import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Info } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, info

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  info = await Info.create({ user })
})

test('POST /infos 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, activity: 'test', purpose: 'test', region: 'test', phone: 'test', type: 'test', dateFrom: 'test', dateTo: 'test', daysFrom: 'test', daysFrom: 'test', daysTo: 'test', hoursFrom: 'test', hoursTo: 'test', comments: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.activity).toEqual('test')
  expect(body.purpose).toEqual('test')
  expect(body.region).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.dateFrom).toEqual('test')
  expect(body.dateTo).toEqual('test')
  expect(body.daysFrom).toEqual('test')
  expect(body.daysFrom).toEqual('test')
  expect(body.daysTo).toEqual('test')
  expect(body.hoursFrom).toEqual('test')
  expect(body.hoursTo).toEqual('test')
  expect(body.comments).toEqual('test')
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
