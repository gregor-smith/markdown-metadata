"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringIsWhitespace(string) {
    if (string.length === 0) {
        return true;
    }
    for (var index = 0; index < string.length; index++) {
        if (string.charAt(index) !== ' ') {
            return false;
        }
    }
    return true;
}
var metadataRegex = /^([a-z_]+): (.+)/i;
function parseMetadata(markdown) {
    var trimmed = markdown.trim();
    var split = trimmed.split('\n');
    var metadata = {};
    if (split.length === 0 || !metadataRegex.test(split[0])) {
        return [metadata, trimmed];
    }
    var lastKey = null;
    var index = 0;
    for (; index < split.length; index++) {
        var line = split[index];
        if (stringIsWhitespace(line)) {
            break;
        }
        var match = metadataRegex.exec(line);
        if (match === null) {
            if (lastKey === null) {
                break;
            }
            metadata[lastKey].push(line.trim());
        }
        else {
            lastKey = match[1];
            metadata[lastKey] = [match[2].trim()];
        }
    }
    var text = split.slice(index + 1).join('\n');
    return [metadata, text];
}
exports.parseMetadata = parseMetadata;
//# sourceMappingURL=index.js.map