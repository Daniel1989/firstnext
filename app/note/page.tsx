'use client'
import { Editor } from "novel";
import Bold from '@tiptap/extension-bold'
// Option 2: Browser-only (lightweight)
// import { generateHTML } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
// Option 1: Browser + server-side
import { generateHTML, generateJSON } from '@tiptap/html'
// 其他插件 https://github.com/ueberdosis/tiptap/tree/main/packages

export default function Home() {
  const defaultHtmlStr = '<p>Example <strong>Text</strong></p>'
  const defaultJson = generateJSON(defaultHtmlStr, [
    Document,
    Paragraph,
    Text,
    Bold,
    // other extensions …
  ])

  const update = (editor) => {
    const json = editor.getJSON();
    console.log(generateHTML(json, [
      Document,
      Paragraph,
      Text,
      Bold,
      // other extensions …
    ]))
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Editor onUpdate={update} defaultValue={defaultJson} disableLocalStorage/>
    </main>
  );
}
