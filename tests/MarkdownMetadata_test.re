open Jest;
open Expect;


let dirname = Js.Option.getWithDefault(".", [%bs.node __dirname]);


[@bs.module "fs"]
[@bs.scope "promises"]
external readFile : (string, {. "encoding": string }) => Js.Promise.t(string) = "readFile";


let exampleMatchesSnap = filename => {
    let path = Node.Path.join([| dirname, "examples", filename |]);
    readFile(path, { "encoding": "utf8" })
        |> Js.Promise.then_(example => {
            MarkdownMetadata.parseMetadata(example)
                |> expect
                |> toMatchSnapshot
                |> Js.Promise.resolve
        })
};


testPromise("Single line metadata", () => exampleMatchesSnap("single-line.md"));
testPromise("Multi line metadata", () => exampleMatchesSnap("multi-line.md"));
testPromise("Whitespace before metadata", () => exampleMatchesSnap("whitespace.md"));
testPromise("No metadata", () => exampleMatchesSnap("no-metadata.md"));
