import { Order } from '.'
import { User } from '../user'

let user, order

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  order = await Order.create({ user, type: 'test', dateFrom: 'test', dateTo: 'test', daysFrom: 'test', daysTo: 'test', hoursFrom: 'test', hoursTo: 'test', totalDays: 'test', totalHours: 'test', totalPrice: 'test', kitchen: 'test' })
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
