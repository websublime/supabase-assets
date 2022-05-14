import * as core from '@actions/core'
import {fileBuffer, walk} from './utils'
import {createClient} from '@supabase/supabase-js'
import {join} from 'path'

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

        await supabase.storage.from(bucket).upload(join(destiny, asset), file, {
          cacheControl: '3600',
          upsert: false
        })

        core.debug(`File: ${file} uploaded to bucket: ${bucket}`)
      }
    }

    await upload()

    core.debug(`Files uploaded succefull to bucket: ${bucket}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
