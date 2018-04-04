import { Translation } from '.'

let translation

beforeEach(async () => {
  translation = await Translation.create({ translations: { index: { fr: { hello: 'Bonjour' } } } })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = translation.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(translation.id)
    expect(view.translations).toBe(translation.translations)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = translation.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(translation.id)
    expect(view.translations).toBe(translation.translations)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
