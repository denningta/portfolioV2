"use server"

import { base } from "lib/airtable.api"

export interface AirtableMessage {
  name?: string
  email?: string
  message?: string
  status?: 'New' | 'Read' | 'Responded'
}

export async function createMessage(data: AirtableMessage) {
  return new Promise((resolve, reject) => {
    base('Messages').create([
      {
        "fields": {
          "Name": data.name,
          "Email": data.email,
          "Message": data.message,
          "Status": "New"
        }
      },
    ], function(err, records) {
      if (err) {
        reject(err)
      }
      records?.forEach(function(record) {
        resolve(record)
      })
    })
  })
}
