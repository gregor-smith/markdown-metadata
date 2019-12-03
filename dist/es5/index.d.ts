export declare type Metadata = {
    [key: string]: string[];
};
export declare const metadataRegex: RegExp;
export declare function parseMetadata(markdown: string): [Metadata, string];
