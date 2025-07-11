import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';

// カスタムレンダラーの作成
const renderer = {
  code({ text, lang }: { text: string; lang?: string }): string {
    if (lang && Prism.languages[lang]) {
      const highlighted = Prism.highlight(text, Prism.languages[lang], lang);
      return `<pre><code class="language-${lang}">${highlighted}</code></pre>`;
    }
    return `<pre><code>${text}</code></pre>`;
  },
  heading({ text, depth }: { text: string; depth: number }): string {
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  }
};

// マークダウンレンダラーの設定
marked.use({
  breaks: true,
  gfm: true,
  renderer: renderer
});

export function parseMarkdown(content: string): string {
  return marked.parse(content) as string;
}