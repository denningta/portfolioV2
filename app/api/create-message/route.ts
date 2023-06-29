import { base } from "lib/airtable.api"
import { NextRequest, NextResponse } from "next/server"

export interface AirtableMessage {
  name?: string
  email?: string
  message?: string
  status?: 'New' | 'Read' | 'Responded'
  botDetector?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const res = await createMessage(body)
    return NextResponse.json({ res }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export function createMessage(data: AirtableMessage) {

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
