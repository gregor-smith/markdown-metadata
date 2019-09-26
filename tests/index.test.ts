import { promises as fs } from 'fs'
import path from 'path'

import { parseMetadata } from '../src'


async function exampleMatchesSnap(filename: string) {
    const filePath = path.join(__dirname, 'examples', filename)
    const example = await fs.readFile(filePath, { encoding: 'utf8' })
    const output = parseMetadata(example)
    expect(output).toMatchSnapshot()
}


test('Single line metadata', () => exampleMatchesSnap('single-line.md'))
test('Multi line metadata', () => exampleMatchesSnap('multi-line.md'))
test('Whitespace before metadata', () => exampleMatchesSnap('whitespace.md'))
test('No metadata', () => exampleMatchesSnap('no-metadata.md'))
