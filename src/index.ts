function stringIsWhitespace(string: string) {
    if (string.length === 0) {
        return true
    }
    for (let index = 0; index < string.length; index++) {
        if (string.charAt(index) !== ' ') {
            return false
        }
    }
    return true
}


export type Metadata = { [ key: string ]: string[] }


const metadataRegex = /^([a-z_]+): (.+)/i


export function parseMetadata(markdown: string): [ Metadata, string ] {
    const trimmed = markdown.trim()
    const split = trimmed.split('\n')
    const metadata: Metadata = {}

    if (split.length === 0 || !metadataRegex.test(split[0])) {
        return [ metadata, trimmed ]
    }

    let lastKey: string | null = null
    let index = 0
    for (; index < split.length; index++) {
        const line = split[index]
        if (stringIsWhitespace(line)) {
            break
        }
        const match = metadataRegex.exec(line)
        if (match === null) {
            if (lastKey === null) {
                break
            }
            metadata[lastKey].push(line.trim())
        }
        else {
            lastKey = match[1]
            metadata[lastKey] = [ match[2].trim() ]
        }
    }

    const text = split.slice(index + 1).join('\n')
    return [ metadata, text ]
}
