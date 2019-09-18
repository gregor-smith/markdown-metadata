
type t = Js.Dict.t(array(string));


[@bs.module "markdown-metadata"]
external parseMetadata : string => (t, string) = "parseMetadata";
