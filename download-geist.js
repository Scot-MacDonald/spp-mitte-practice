import fs from 'fs/promises'
import https from 'https'
import path from 'path'

const fontURLs = [
  'https://cdn.jsdelivr.net/npm/@vercel/geist-font@latest/fonts/geist-sans/GeistSans-Regular.woff2',
  'https://cdn.jsdelivr.net/npm/@vercel/geist-font@latest/fonts/geist-sans/GeistSans-Medium.woff2',
  'https://cdn.jsdelivr.net/npm/@vercel/geist-font@latest/fonts/geist-sans/GeistSans-SemiBold.woff2',
  'https://cdn.jsdelivr.net/npm/@vercel/geist-font@latest/fonts/geist-sans/GeistSans-Bold.woff2',
  'https://cdn.jsdelivr.net/npm/@vercel/geist-font@latest/fonts/geist-sans/GeistSans-Thin.woff2',
  'https://cdn.jsdelivr.net/npm/@vercel/geist-font@latest/fonts/geist-sans/GeistSans-Light.woff2',
  'https://cdn.jsdelivr.net/npm/@vercel/geist-font@latest/fonts/geist-sans/GeistSans-Black.woff2',

  'https://cdn.jsdelivr.net/npm/@vercel/geist-font@latest/fonts/geist-mono/GeistMono-Regular.woff2',
  'https://cdn.jsdelivr.net/npm/@vercel/geist-font@latest/fonts/geist-mono/GeistMono-Medium.woff2',
  'https://cdn.jsdelivr.net/npm/@vercel/geist-font@latest/fonts/geist-mono/GeistMono-SemiBold.woff2',
  'https://cdn.jsdelivr.net/npm/@vercel/geist-font@latest/fonts/geist-mono/GeistMono-Bold.woff2',
]

async function download(url, dest) {
  const file = await fs.open(dest, 'w')
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'node' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`))
        return
      }
      res.pipe(file.createWriteStream())
      res.on('end', async () => {
        await file.close()
        resolve()
      })
      res.on('error', (err) => reject(err))
    })
  })
}

async function main() {
  await fs.mkdir('geist-fonts', { recursive: true })
  for (const url of fontURLs) {
    const fileName = path.basename(url)
    try {
      await download(url, `geist-fonts/${fileName}`)
      console.log('Downloaded', fileName)
    } catch (err) {
      console.error('Failed to download', fileName, err.message)
    }
  }
  console.log('Done. All fonts in ./geist-fonts')
}

main().catch(console.error)
