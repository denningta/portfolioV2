import Airtable from 'airtable'

export const base = new Airtable({
  apiKey: process.env.AIRTABLE_WRITE_TOKEN,
}).base('app6oxZF8PZLRODvt')

