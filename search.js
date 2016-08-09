'use strict'
const fs = require('fs')
const os = require('os')
const traverse = require('traverse')
const fuzzyfind = require('fuzzyfind')

const file = '~/Library/Application Support/Google/Chrome/Default/Bookmarks'

module.exports = (pluginContext) => {
  return (query, env) => {
    const variables = env || {}
    const bookmarkFile = (variables['file'] || file).replace(/^~/, os.homedir())
    return new Promise((resolve, reject) => {
      fs.readFile(bookmarkFile, (err, data) => {
        const rawData = JSON.parse(data)
        // Find
        const bookmarks = []
        traverse(rawData).forEach((item) => {
          const isBookmark = item['type'] === 'url'
          if (isBookmark) {
            const bookmark = {
              id: query + item['url'],
              title: item['name'],
              subtitle: item['url'],
              value: item['url'],
            }
            bookmarks.push(bookmark)
          }
        })

        // Filter
        const accessor = (bookmark) => bookmark.title + bookmark.subtitle
        const filteredBookmarks = fuzzyfind(query, bookmarks, {
          accessor,
          precision: 0.5,
        }).slice(0, 6)
        resolve(filteredBookmarks)
      })
    })
  }
}
