/* eslint-disable no-console */
import * as core from '@actions/core'
import * as mime from 'mime-types'
import {basename, join} from 'path'
import {fileBuffer, walk} from './utils'
import {createClient} from '@supabase/supabase-js'

async function run(): Promise<void> {
  try {
    const url: string = core.getInput('url')
    const key: string = core.getInput('key')
    const folder: string = core.getInput('folder')
    const bucket: string = core.getInput('bucket')
    const destiny: string = core.getInput('destiny')

    core.debug(`Supabase url: ${url}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.debug(`Supabase key: ${key}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.debug(`Assets folder: ${folder}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.debug(`Supabase bucket: ${bucket}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true
    core.debug(`Supabase bucket folder destiny: ${destiny}`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    const supabase = createClient(url, key)
    const assets = await walk(folder)

    const upload = async (): Promise<void> => {
      for (const asset of assets) {
        const file = await fileBuffer(asset)
        const filename = basename(asset)
        const type = mime.lookup(asset)
        const mimeType = type ? type : 'text/plain;charset=UTF-8'

        await supabase.storage
          .from(bucket)
          .upload(join(destiny, filename), file, {
            cacheControl: '3600',
            upsert: false,
            contentType: mimeType
          })

        console.log(
          `File: ${filename} uploaded to bucket: ${bucket}/${destiny} with type: ${mimeType}`
        )
      }
    }

    await upload()

    core.debug(`Files uploaded succefull to bucket: ${bucket}`)
    console.log(`Files uploaded succefull to bucket: ${bucket}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
