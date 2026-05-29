import { promises as fs } from 'fs'
import path from 'path'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const filename = url.searchParams.get('file') ?? 'LandsEnd-Sumiran.pdf'
    const download = url.searchParams.get('download') === '1'

    const filePath = path.join(process.cwd(), 'public', 'pdfs', filename)

    try {
      await fs.access(filePath)
    } catch {
      return new Response('Not found', { status: 404 })
    }

    const data = await fs.readFile(filePath)
    const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)

    const headers = new Headers()
    headers.set('Content-Type', 'application/pdf')
    headers.set('Content-Disposition', `${download ? 'attachment' : 'inline'}; filename="${filename}"`)

    return new Response(arrayBuffer, { status: 200, headers })
  } catch (err) {
    return new Response('Server error', { status: 500 })
  }
}
