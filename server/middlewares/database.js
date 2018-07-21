
import fs from 'fs'
import config from '../config'
import {resolve} from 'path'
import mongoose from 'mongoose'
import _ from 'lodash'
import R from 'ramda'

const models = resolve(__dirname, '../database/schema')

fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(resolve(models, file)))

var characters = require('../database/json/allCharacters.json')
var houses = require('../database/json/allHouses.json')
// var books = require('database/json/allBooks.json')
// var imdb = require('database/json/IMDb.json')
var wikiCharacters = require('../database/json/wikiCharacters.json')
var wikiHouses = require('../database/json/wikiHouses.json')

export const database = app => {
  mongoose.set('debug', true)

  mongoose.connect(config.db, {useMongoClient: true})

  mongoose.connection.on('disconnected', () => {
    mongoose.connection(config.db)
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB', config.db)

    // const Character = mongoose.model('Character')
    const WikiCharacter = mongoose.model('WikiCharacter')
    const WikiHouse = mongoose.model('WikiHouse')
    const User = mongoose.model('User')

    // 说明第一次初始化插入数据已经完成

    characters = _.map(characters, formatData)
    houses = _.map(houses, formatData)

    // const _characters = _.filter(characters, character => character.playedBy && character.playedBy.length)

    // let existCharacter = await Character.find({}).exec()
    // console.log(existCharacter, 'ex')
    // if (!existCharacter.length) Character.insertMany(characters)

    let existWikiCharacter = await WikiCharacter.find({}).exec()
    if (!existWikiCharacter.length) WikiCharacter.insertMany(wikiCharacters)

    let existwikiHouses = await WikiHouse.find({}).exec()
    if (!existwikiHouses.length) WikiHouse.insertMany(wikiHouses)

    let user = await User.findOne({email: '123@qq.com'}).exec()
    if (!user) new User({email: '123@qq.com', password: '12345', role: 'admin'}).save()
  })
}

const formatData = (item, index) => {
  item._id = item.url

  _.forIn(item, (value, key) => {
    if (!value || !value.length) delete item[key]
  })

  return item
}
