import { success, notFound } from '../../services/response/'
import { Translation } from '.'
import translator from 'google-translator'

/**
|--------------------------------------------------
| don't touch this, this is not for you.
|--------------------------------------------------
*/

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
      for (const key in body.translations[group].en) {
        maps[i].push(key)
      }
      i++
    }
  }

  const translate = (i) => {
    const translateGroup = (j) => {
      if (maps[i] && j < maps[i].length) {
        var lang = body.translations[groups[i]].fr[maps[i][j]] ? 'fr' : 'en'
        var phrase = body.translations[groups[i]][lang][maps[i][j]]
        var target2 = lang === 'fr' ? 'en' : 'fr'
        translator(lang, 'nl', phrase, (data1, err) => {
          translator(lang, target2, phrase, (data2, err) => {
            if (!err && data1.isCorrect === true) {
              console.log(phrase + ' - ' + data1.text + ' - ' + data2.text)
              if (phrase) {
                body.translations[groups[i]].nl[maps[i][j]] = body.translations[groups[i]].nl[maps[i][j]] || data1.text
                body.translations[groups[i]][target2][maps[i][j]] = body.translations[groups[i]][target2][maps[i][j]] || data2.text
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
