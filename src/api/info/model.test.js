import { Info } from '.'
import { User } from '../user'

let user, info

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  info = await Info.create({ user, activity: 'test', purpose: 'test', region: 'test', phone: 'test', type: 'test', dateFrom: 'test', dateTo: 'test', daysFrom: 'test', daysFrom: 'test', daysTo: 'test', hoursFrom: 'test', hoursTo: 'test', comments: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = info.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(info.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.activity).toBe(info.activity)
    expect(view.purpose).toBe(info.purpose)
    expect(view.region).toBe(info.region)
    expect(view.phone).toBe(info.phone)
    expect(view.type).toBe(info.type)
    expect(view.dateFrom).toBe(info.dateFrom)
    expect(view.dateTo).toBe(info.dateTo)
    expect(view.daysFrom).toBe(info.daysFrom)
    expect(view.daysFrom).toBe(info.daysFrom)
    expect(view.daysTo).toBe(info.daysTo)
    expect(view.hoursFrom).toBe(info.hoursFrom)
    expect(view.hoursTo).toBe(info.hoursTo)
    expect(view.comments).toBe(info.comments)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = info.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(info.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.activity).toBe(info.activity)
    expect(view.purpose).toBe(info.purpose)
    expect(view.region).toBe(info.region)
    expect(view.phone).toBe(info.phone)
    expect(view.type).toBe(info.type)
    expect(view.dateFrom).toBe(info.dateFrom)
    expect(view.dateTo).toBe(info.dateTo)
    expect(view.daysFrom).toBe(info.daysFrom)
    expect(view.daysFrom).toBe(info.daysFrom)
    expect(view.daysTo).toBe(info.daysTo)
    expect(view.hoursFrom).toBe(info.hoursFrom)
    expect(view.hoursTo).toBe(info.hoursTo)
    expect(view.comments).toBe(info.comments)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
