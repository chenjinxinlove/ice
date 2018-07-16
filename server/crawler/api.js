
import _ from 'lodash'
import request from 'request-promise'
import {writeFileSync} from 'fs'

var _allCharacters = []

export const getAllCharacters = async (page = 1) => {
  var res = await request(`https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=50`)
  var body = res.body
  _allCharacters = _.union(_allCharacters, body)
  if (body.length < 50) {
    writeFileSync('./allCharacters.json', JSON.stringify(_allCharacters), 'utf8')
    return
  } else {
    await _.sleep(1000)
    console.log(page)
    page++
    getAllCharacters(page)
  }
}

getAllCharacters()