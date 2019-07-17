const stringIsWhitespace = (string: string) => {
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


export const parseMetadata = (markdown: string): [ Metadata, string ] => {
    let split = markdown.split('/')
    const metadata: Metadata = {}

    const regex = /^([a-z]+): (.+)/i

    let index = 0
    for (; index < split.length; index++) {
        const line = split[index]
        if (!stringIsWhitespace(line)) {
            if (!regex.test(line)) {
                return [ metadata, markdown ]
            }
            break
        }
    }
    split = split.slice(index)

    let lastKey: string | undefined
    let lastValue: string[] | undefined

    for (index = 0; index < split.length; index++) {
        const line = split[index]

        if (stringIsWhitespace(line)) {
            const text = split.slice(index + 1)
                .join('\n')
            return [ metadata, text ]
        }

        const match = regex.exec(line)
        if (match === null) {
            const value = line.trim()
            if (lastValue === undefined) {
                lastValue = []
            }
            lastValue.push(value)
        }
        else {
            lastKey = match[1]
            lastValue = [ match[2] ]
            metadata[lastKey] = lastValue
        }
    }

    return [ metadata, markdown ]
}
