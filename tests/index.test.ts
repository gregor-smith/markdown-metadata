import fs from 'fs'
import path from 'path'

import { parseMetadata } from '../src'


const readExample = (filename: string) => {
    const filePath = path.join(__dirname, 'examples', filename)
    return new Promise<string>((resolve, reject) =>
        fs.readFile(filePath, { encoding: 'utf8' }, (error, data) => {
            if (error !== null) {
                reject(error)
                return
            }
            resolve(data)
        })
    )
}


test('Single line metadata', async () => {
    const example = await readExample('single-line.md')
    const output = parseMetadata(example)
    expect(output).toMatchSnapshot()
})


test('Multi line metadata', async () => {
    const example = await readExample('multi-line.md')
    const output = parseMetadata(example)
    expect(output).toMatchSnapshot()
})


test('Whitespace before metadata', async () => {
    const example = await readExample('whitespace.md')
    const output = parseMetadata(example)
    expect(output).toMatchSnapshot()
})


test('No metadata', async () => {
    const example = await readExample('no-metadata.md')
    const output = parseMetadata(example)
    expect(output).toMatchSnapshot()
})
