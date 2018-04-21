import { Order } from '.'
import { User } from '../user'

let user, order

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456', lang: 'en' })
  order = await Order.create({ user, type: 'once', dateFrom: Date.now(), dateTo: Date.now(), daysFrom: 1, daysTo: 0, hoursFrom: 0, hoursTo: 24, totalDays: 7, totalHours: 40, totalPrice: 2000, kitchen: { name: 'test_kitchen', region: 'Antwerpen', price: 20 } })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = order.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(order.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.type).toBe(order.type)
    expect(view.dateFrom).toBe(order.dateFrom)
    expect(view.dateTo).toBe(order.dateTo)
    expect(view.daysFrom).toBe(order.daysFrom)
    expect(view.daysTo).toBe(order.daysTo)
    expect(view.hoursFrom).toBe(order.hoursFrom)
    expect(view.hoursTo).toBe(order.hoursTo)
    expect(view.totalDays).toBe(order.totalDays)
    expect(view.totalHours).toBe(order.totalHours)
    expect(view.totalPrice).toBe(order.totalPrice)
    expect(view.kitchen).toBe(order.kitchen)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = order.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(order.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.type).toBe(order.type)
    expect(view.dateFrom).toBe(order.dateFrom)
    expect(view.dateTo).toBe(order.dateTo)
    expect(view.daysFrom).toBe(order.daysFrom)
    expect(view.daysTo).toBe(order.daysTo)
    expect(view.hoursFrom).toBe(order.hoursFrom)
    expect(view.hoursTo).toBe(order.hoursTo)
    expect(view.totalDays).toBe(order.totalDays)
    expect(view.totalHours).toBe(order.totalHours)
    expect(view.totalPrice).toBe(order.totalPrice)
    expect(view.kitchen).toBe(order.kitchen)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
