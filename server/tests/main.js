const Mocha = require('mocha')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const glob = require('glob')
const path = require('path')

// Chai
chai.use(chaiAsPromised)
global.expect = chai.expect
chai.should()

// Mocha
const mocha = new Mocha()
const jsFiles = path.join(__dirname, '**/*.js')
const mainFile = path.join(__dirname, 'main.js')
mocha.files = glob.sync(jsFiles, { ignore: mainFile })
mocha.run(f => process.exit(f))
