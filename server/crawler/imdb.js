import cheerio from 'cheerio'
import _ from 'lodash'
import R from 'ramda'
import rp from 'request-promise'
import {writeFileSync} from 'fs'

export const getIMDbCharacter = async () => {
  const options = {
    uri: 'http://www.imdb.com/title/tt0944947/fullcredits?ref_=tt_cl_sm#cast',
    transform: body => cheerio.load(body)
  }

  const $ = await rp(options)
  var photos = []
  $('table.cast_list tr.odd, tr.even').each(function() {
    let playedBy = $(this).find('td.itemprop span.itemprop')
    playedBy = playedBy.text()

    let nmId = $(this).find('td.itemprop a')
    nmId = nmId.attr('href')

    let character = $(this).find('td.character a')

    let name = character.text()
    let chId = character.attr('href')

    const data = {
      playedBy,
      nmId,
      name,
      chId
    }
    photos.push(data)
  })
  const fn = R.compose(
    R.map(photo => {
      const reg1 = /\/name\/(.*?)\/\?ref/
      const reg2 = /\/characters\/(.*?)\?ref/

      const match1 = photo.nmId.match(reg1)
      const match2 = photo.chId.match(reg2)
      photo.nmId = match1[1]
      photo.chId = match2[1]

      return photo
    }),
    R.filter(photo => photo.playedBy && photo.name && photo.nmId && photo.chId && photo.chId.length > 5)
  )

  photos = fn(photos)
  writeFileSync('./imdb.json', JSON.stringify(photos, null, 2), 'utf8')
  return photos
}

getIMDbCharacter()
