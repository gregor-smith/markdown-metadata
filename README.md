Takes text beginning with a custom metadata block, and returns this parsed metadata as well as the rest of the text.


````typescript
import { parseMetadata } from 'markdown-metadata'


const textWithMetadata = ```
    title: Example
    tags: Programming
          Markdown
          TypeScript
    date: 2020-06-04

    Lorem ipsum dolor sit amet, consectetur adipiscing elit
```

const [ metadata, text ] = parseMetadata(textWithMetadata)

console.log(JSON.stringify(metadata))
/*
    {
        title: ["Example"],
        tags: ["Programming", "Markdown", "TypeScript"],
        date: ["2020-06-04"]
    }
*/

console.log(text)
// Lorem ipsum dolor sit amet, consectetur adipiscing elit
````

Note: although this function was written to parse metadata from Markdown files, hence the name, the text following the metadata block is returned completely untouched, so it will work with any text format as long as the metadata has the same simple syntax.
