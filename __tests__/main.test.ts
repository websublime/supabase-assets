import {walk} from '../src/utils'
import {expect, test} from '@jest/globals'
import {resolve, join, basename} from 'path'

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
