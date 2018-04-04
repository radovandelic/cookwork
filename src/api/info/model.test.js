import { Info } from '.'
import { User } from '../user'

let user, info

beforeEach(async () => {
  user = await User.create({ email: 'a@b.cd', password: 'password' })
  info = await Info.create({ user, activity: 'caterer', purpose: 'test', region: 'Bruxelles', phone: '011', type: 'once', dateFrom: Date.now(), dateTo: Date.now(), daysFrom: 1, daysTo: 0, hoursFrom: 0, hoursTo: 24, comments: 'This is a comment.' })
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
