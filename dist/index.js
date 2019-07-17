"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringIsWhitespace = function (string) {
    if (string.length === 0) {
        return true;
    }
    for (var index = 0; index < string.length; index++) {
        if (string.charAt(index) !== ' ') {
            return false;
        }
    }
    return true;
};
exports.parseMetadata = function (markdown) {
    var split = markdown.split('/');
    var metadata = {};
    var regex = /^([a-z]+): (.+)/i;
    var index = 0;
    for (; index < split.length; index++) {
        var line = split[index];
        if (!stringIsWhitespace(line)) {
            if (!regex.test(line)) {
                return [metadata, markdown];
            }
            break;
        }
    }
    split = split.slice(index);
    var lastKey;
    var lastValue;
    for (index = 0; index < split.length; index++) {
        var line = split[index];
        if (stringIsWhitespace(line)) {
            var text = split.slice(index + 1)
                .join('\n');
            return [metadata, text];
        }
        var match = regex.exec(line);
        if (match === null) {
            var value = line.trim();
            if (lastValue === undefined) {
                lastValue = [];
            }
            lastValue.push(value);
        }
        else {
            lastKey = match[1];
            lastValue = [match[2]];
            metadata[lastKey] = lastValue;
        }
    }
    return [metadata, markdown];
};
//# sourceMappingURL=index.js.map