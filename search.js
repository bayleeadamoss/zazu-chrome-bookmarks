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
              title: item['name'],
              subtitle: item['url'],
              value: item['url'],
            }
            bookmarks.push(bookmark)
          }
        })
        // Filter
        // toLowerCase() is required - https://github.com/amjith/fuzzyfind/pull/3
        const filteredBookmarks = fuzzyfind(query.toLowerCase(), bookmarks, (bookmark) => {
          return (bookmark.title + bookmark.subtitle).toLowerCase()
        })
        resolve(filteredBookmarks)
      })
    })
  }
}
