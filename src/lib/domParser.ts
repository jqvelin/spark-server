import jsdom from "jsdom"
const { JSDOM } = jsdom

export const parseDom = (htmlAsString: string, querySelector?: string) => {
    const dom = new JSDOM(htmlAsString)
    if (querySelector) {
        return dom.window.document.querySelector(querySelector)
    } else {
        return dom.window.document
    }
}