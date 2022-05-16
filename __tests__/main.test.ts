import {walk} from '../src/utils'
import {expect, test} from '@jest/globals'
import {resolve, join, basename} from 'path'
import * as mime from 'mime-types'

// shows how the runner will run a javascript action with env / stdout protocol
test('Should walk directory', async () => {
  const root = resolve(join(__dirname, '../src'))

  const files = await walk(root)

  expect(files.length > 0).toBeTruthy()
})

test('Should retrive filenames', async () => {
  const root = resolve(join(__dirname, '../src'))

  const files = await walk(root)
  const filenames = files.map(file => basename(file))

  expect(filenames.length > 0).toBeTruthy()
})

test('Should retrive mime type', async () => {
  const root = resolve(join(__dirname, '../src/jest.config.js'))

  const type = mime.lookup(root)

  expect(type).toEqual('application/javascript')
})
