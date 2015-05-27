var fs = require('fs')
var ip = require('ip');

var myIp = ip.address() // my ip address

function replace (file, replaceWith) {
  var newFile = ''
  var replaceCounter = 0
  fs.readFileSync(file).toString().split('\n').forEach(function (line) {
    line = line.toString()
    var toReplace = line.match(/\/\* ip-replace (.*) \*\//) && line.match(/\/\* ip-replace (.*) \*\//)[1]
    if (toReplace) {
      line = line.replace(new RegExp(toReplace, 'g'), replaceWith)
      replaceCounter++
    }
    newFile += (line + '\n')
  })
  console.log(`Replaced ${replaceCounter} in ${file}`)
  fs.writeFileSync(file, newFile)
}

var config = JSON.parse(fs.readFileSync('./package.json').toString())
config.ipreplace.files.forEach(function (file) {
  replace(file, myIp)
})
