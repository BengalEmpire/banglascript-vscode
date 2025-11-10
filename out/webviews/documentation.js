"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentationHTML = getDocumentationHTML;
const highlighter_1 = require("../utils/highlighter");
const codeTemplates_1 = require("../templates/codeTemplates");
function getDocumentationHTML() {
    // Highlight all code examples
    const highlightedExamples = codeTemplates_1.CODE_TEMPLATES.map(template => ({
        ...template,
        highlightedCode: (0, highlighter_1.highlightBangla)(template.code)
    }));
    // Snippet docs section
    const snippetDocs = `
    <h2>🔧 Snippets (Shortcuts)</h2>
    <p>ব্যবহার করুন <code>Ctrl+Space</code> বা <code>⌃Space</code> স্নিপেট দেখতে। উদাহরণ:</p>
    <ul>
        <li><strong>hello</strong>: হ্যালো ওয়ার্ল্ড টেমপ্লেট</li>
        <li><strong>সংখ্যা</strong>: সংখ্যা ভেরিয়েবল ডিক্লেয়ার</li>
        <li><strong>যদি</strong>: If-else স্টেটমেন্ট</li>
        <li><strong>জন্য</strong>: For loop</li>
        <li><strong>অনুষ্ঠান</strong>: ফাংশন ডেফিনিশন</li>
        <!-- Add more as per snippets.json -->
    </ul>
    <p>আরও স্নিপেটসমূহ snippets.json থেকে লোড হয়। নতুন যোগ করতে package.json আপডেট করুন।</p>
    `;
    // Examples section
    const examplesSection = highlightedExamples.map(ex => `
        <div class="example">
            <h3>${ex.title}</h3>
            <div class="code">${ex.highlightedCode}</div>
        </div>
    `).join('');
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            padding: 20px;
            background: #1e1e1e;
            color: #d4d4d4;
        }
        h1 { color: #00D4AA; }
        h2 { color: #0099FF; margin-top: 30px; }
        h3 { color: #60A5FA; margin-top: 20px; }
        code { 
            background: #2d2d2d; 
            padding: 2px 6px; 
            border-radius: 3px;
            color: #ce9178;
        }
        .code { 
            background: #2d2d2d; 
            padding: 10px; 
            border-radius: 5px; 
            font-family: monospace; 
            white-space: pre-wrap;
            margin: 10px 0;
            border-left: 4px solid #00D4AA;
        }
        .example { margin-bottom: 30px; }
        /* Highlighting classes */
        .text-green-600 { color: #10B981; }
        .text-emerald-400 { color: #34D399; }
        .text-amber-400 { color: #F59E0B; }
        .text-purple-400 { color: #A855F7; }
        .text-blue-300 { color: #60A5FA; }
        .text-orange-400 { color: #F97316; }
        .text-gray-400 { color: #9CA3AF; }
        .font-semibold { font-weight: bold; }
        .italic { font-style: italic; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #444; padding: 10px; text-align: left; }
        th { background: #2d2d2d; }
        ul { list-style-type: none; padding: 0; }
        li { margin: 5px 0; }
    </style>
</head>
<body>
    <h1>BanglaScript Documentation</h1>
    <p>বাংলায় প্রোগ্রামিং করুন! JS equivalents: Hover over keywords.</p>

    <h2>📦 Variables</h2>
    <table>
        <tr><th>Keyword</th><th>JS</th><th>Example</th></tr>
        <tr><td>সংখ্যা</td><td>let</td><td>সংখ্যা x = 10;</td></tr>
        <tr><td>শব্দ</td><td>let</td><td>শব্দ name = "বাংলা";</td></tr>
        <tr><td>ধ্রুবক</td><td>const</td><td>ধ্রুবক PI = 3.14;</td></tr>
    </table>

    <h2>🔧 Functions</h2>
    <table>
        <tr><th>Keyword</th><th>JS</th><th>Example</th></tr>
        <tr><td>অনুষ্ঠান</td><td>function</td><td>অনুষ্ঠান যোগ(a, b) { প্রেরণ a + b; }</td></tr>
        <tr><td>প্রেরণ</td><td>return</td><td>প্রেরণ ফলাফল;</td></tr>
    </table>

    <h2>🔄 Control Flow</h2>
    <table>
        <tr><th>Keyword</th><th>JS</th><th>Example</th></tr>
        <tr><td>যদি</td><td>if</td><td>যদি (x > 5) { ... }</td></tr>
        <tr><td>নাহলে</td><td>else</td><td>নাহলে { ... }</td></tr>
        <tr><td>জন্য</td><td>for</td><td>জন্য (সংখ্যা i = 0; i < 5; i++) { ... }</td></tr>
    </table>

    <h2>📝 Console</h2>
    <table>
        <tr><th>Function</th><th>JS</th></tr>
        <tr><td>লিখো()</td><td>console.log()</td></tr>
        <tr><td>সমস্যা_লিখো()</td><td>console.error()</td></tr>
    </table>

    ${snippetDocs}

    <h2>💡 Code Examples</h2>
    ${examplesSection}
</body>
</html>`;
}
//# sourceMappingURL=documentation.js.map