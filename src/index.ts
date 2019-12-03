export type Metadata = { [ key: string ]: string[] }


export const metadataRegex = /^([a-z_]+): (.+)/i


export function parseMetadata(markdown: string): [ Metadata, string ] {
    const trimmed = markdown.trim()
    const split = trimmed.split(/\r?\n/)
    const metadata: Metadata = {}

    if (split.length === 0 || !metadataRegex.test(split[0])) {
        return [ metadata, trimmed ]
    }

    let lastKey: string | null = null
    let index = 0
    for (; index < split.length; index++) {
        const line = split[index]
        if (/^\s*$/.test(line)) {
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
