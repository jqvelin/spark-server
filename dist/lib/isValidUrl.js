"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUrl = void 0;
const isValidUrl = (url) => {
    const regexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return !!url.match(regexp);
};
exports.isValidUrl = isValidUrl;
