const fs = require('fs')
const path = require('path')
const fsp = fs.promises


function listFilesSync(dirPath) {
  dirPath = path.resolve(dirPath)
  var result = []
  var entries = fs.readdirSync(dirPath, {withFileTypes: true})
  for (var entry of entries) {
    var fullPath = path.join(dirPath, entry.name)
    if (entry.isFile()) {
      result.push(fullPath)
    } else if (entry.isDirectory()) {
      var files = listFilesSync(fullPath)
      result.push(...files)
    }
  }
  return result
}

// console.time('a')
// var files = listFilesSync('./')
// console.log(files)
// console.timeEnd('a')


async function listFilesAsync(dirPath) {
  dirPath = path.resolve(dirPath)
  var result = []
  var entries = await fsp.readdir(dirPath, {withFileTypes: true})
  var filesPromise = []
  for (var entry of entries) {
    var fullPath = path.join(dirPath, entry.name)
    if (entry.isFile()) {
      result.push(fullPath)
    } else if (entry.isDirectory()) {
      promise = listFilesAsync(fullPath)
      filesPromise.push(promise)
    }
  }
  var files = await Promise.all(filesPromise)
  return result.concat(...files)
}

console.time('b')
listFilesAsync('./').then(files => {
  console.log(files)
  console.timeEnd('b')
})

function listFiles(dirPath, callback) {
  dirPath = path.resolve(dirPath)
  fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
    var result = []
    if (entries.length == 0) {
      callback(result)
      return
    }

    var c = 0

    for (var entry of entries) {
      var fullPath = path.join(dirPath, entry.name)
      if (entry.isFile()) {
        result.push(fullPath)
      } else if (entry.isDirectory()) {
        c++
        listFiles(fullPath, (files) => {
          c--
          result.push(...files)
          if (c == 0) {
            callback(result)
          }
        })
      }
    }

    if (c == 0) {
      callback(result)
    }
  })
}

// console.time('c')
// listFiles('.', files => {
//   console.log(files)
//   console.timeEnd('c')
// })

function listFilesPromise(dirPath) {
  dirPath = path.resolve(dirPath)
  return fsp.readdir(dirPath, { withFileTypes: true }).then(entries => {
    var result = []
    var dirPromises = []

    for (var entry of entries) {
      var fullPath = path.join(dirPath, entry.name)
      if (entry.isFile()) {
        result.push(fullPath)
      } else if (entry.isDirectory()) {
        promise = listFilesPromise(fullPath)
        dirPromises.push(promise)
      }
    }

    if (dirPromises.length == 0) {
      return result
    } else {
      return Promise.all(dirPromises).then(dirFiles => {
        return result.concat(...dirFiles)
      })
    }
  })
}

// console.time('d')
// listFilesPromise('./').then(files => {
//   console.log(files)
//   console.timeEnd('d')
// })
