import { describe, test, expect } from "@jest/globals";
import { domParser } from "./domParser"

describe("domParser happy cases", () => {
    test("Returns document", () => {
        const html = "<html></html>"
        const dom = domParser(html)
        expect(dom).toBeTruthy()
    })

    test("Returns required node content", () => {
        const html = `
            <html>
            <head></head>
                <body>
                    <p id="paragraph">Text</p>
                </body>
            </html>
        `
        const dom = domParser(html, "#paragraph")
        expect(dom?.textContent).toBe("Text")
    })
})

describe("domParser unhappy cases", () => {
    test("Throws invalid node selector", () => {
        expect(() => {
            domParser("<html></html>", "/?*#!")
        }).toThrowError(/is not a valid selector/)
    })

    test("Returns null when no content found", () => {
        const html = `
            <html>
            <head></head>
                <body>
                </body>
            </html>
        `
        const dom = domParser(html, "#paragraph")
        expect(dom).toBe(null)
    })
})