import * as fs from 'fs'
import * as path from 'path'

import { parseMetadata } from '../src'


function exampleMatchesSnap(filename: string) {
    const filePath = path.join(__dirname, 'examples', filename)
    const example = fs.readFileSync(filePath, { encoding: 'utf8' })
    const output = parseMetadata(example)
    expect(output).toMatchSnapshot()
}


test('Single line metadata', () => exampleMatchesSnap('single-line.md'))
test('Multi line metadata', () => exampleMatchesSnap('multi-line.md'))
test('Multi line CRLF metadata', () => exampleMatchesSnap('multi-line-crlf.md'))
test('Whitespace before metadata', () => exampleMatchesSnap('whitespace.md'))
test('No metadata', () => exampleMatchesSnap('no-metadata.md'))
