import { success, notFound } from '../../services/response/'
import { Translation } from '.'
import translator from 'google-translator'

export const create = ({ bodymen: { body } }, res, next) =>
  Translation.create(body)
    .then((translation) => translation.view(true))
    .then(success(res, 201))
    .catch(next)

export const createAndTranslate = ({ bodymen: { body } }, res, next) => {
  const maps = []
  let i = 0
  const groups = []
  for (const group in body.translations) {
    if (group !== 'faq') {
      maps[i] = []
      groups[i] = group
      for (const key in body.translations[group].fr) {
        maps[i].push(key)
      }
      i++
    }
  }

  const translate = (i) => {
    const translateGroup = (j) => {
      if (maps[i] && j < maps[i].length) {
        const phrase = body.translations[groups[i]].fr[maps[i][j]]
        translator('fr', 'nl', phrase, (nl, err) => {
          translator('fr', 'en', phrase, (en, err) => {
            if (!err && nl.isCorrect === true) {
              console.log(phrase + ' - ' + nl.text + ' - ' + en.text)
              if (phrase) {
                body.translations[groups[i]].nl[maps[i][j]] = nl.text
                body.translations[groups[i]].en[maps[i][j]] = en.text
              }
            } else {
              console.log(err)
            }
            j++
            translateGroup(j)
          })
        })
      } else if (i < maps.length) {
        i++
        translate(i)
      } else {
        Translation.create(body)
          .then((translation) => translation.view(true))
          .then(success(res, 201))
          .catch(next)
      }
    }
    translateGroup(0)
  }
  translate(0)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Translation.count(query)
    .then(count => Translation.find(query, select, cursor)
      .then((translations) => ({
        count,
        rows: translations.map((translation) => translation.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Translation.findById(params.id)
    .then(notFound(res))
    .then((translation) => translation ? translation.view() : null)
    .then(success(res))
    .catch(next)
