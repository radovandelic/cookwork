import { Kitchen } from '.'
import { User } from '../user'

let user, kitchen

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  kitchen = await Kitchen.create({ user, name: 'test_kitchen', phone: '011', description: 'Description', type: 'kitchen', address: 'Rue De la Loi 42', region: 'Bruxelles', postalCode: 1000, size: 40, AFSCA: '123', VAT: 'BE1234567', days: { daysFrom: 1, daysTo: 0 }, hours: { hoursFrom: 0, hoursTo: 24 }, capacity: 10, price: 50, rent: 50, equipment: { microwave: true }, staff: { cookstaff: true }, cancellation: 'strict', events: true, standingCapacity: 500, sittingCapacity: 50 })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = kitchen.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(kitchen.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(kitchen.name)
    expect(view.type).toBe(kitchen.type)
    expect(view.address).toBe(kitchen.address)
    expect(view.size).toBe(kitchen.size)
    expect(view.price).toBe(kitchen.price)
    expect(view.rent).toBe(kitchen.rent)
  })

  it('returns full view', () => {
    const view = kitchen.view(true, 'admin')
    expect(typeof view).toBe('object')
    expect(view.id).toBe(kitchen.id)
    expect(typeof view.user).toBe('object')
    expect(view.user.id).toBe(user.id)
    expect(view.name).toBe(kitchen.name)
    expect(view.phone).toBe(kitchen.phone)
    expect(view.description).toBe(kitchen.description)
    expect(view.type).toBe(kitchen.type)
    expect(view.address).toBe(kitchen.address)
    expect(view.size).toBe(kitchen.size)
    expect(view.AFSCA).toBe(kitchen.AFSCA)
    expect(view.VAT).toBe(kitchen.VAT)
    expect(view.days).toBe(kitchen.days)
    expect(view.hours).toBe(kitchen.hours)
    expect(view.capacity).toBe(kitchen.capacity)
    expect(view.price).toBe(kitchen.price)
    expect(view.rent).toBe(kitchen.rent)
    expect(view.equipment).toBe(kitchen.equipment)
    expect(view.staff).toBe(kitchen.staff)
    expect(view.cancellation).toBe(kitchen.cancellation)
    expect(view.events).toBe(kitchen.events)
    expect(view.standingCapacity).toBe(kitchen.standingCapacity)
    expect(view.sittingCapacity).toBe(kitchen.sittingCapacity)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
