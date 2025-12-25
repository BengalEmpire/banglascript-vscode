import { highlightBangla } from '../utils/highlighter';
import { CODE_TEMPLATES } from '../templates/codeTemplates';

export function getDocumentationHTML(): string {
    // Highlight all code examples
    const highlightedExamples = CODE_TEMPLATES.slice(0, 10).map(template => ({
        ...template,
        highlightedCode: highlightBangla(template.code)
    }));

    const examplesSection = highlightedExamples.map(ex => `
        <div class="example-card">
            <h3>${ex.title}</h3>
            <div class="code">${ex.highlightedCode}</div>
        </div>
    `).join('');

    return `
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>বাংলাস্ক্রিপ্ট ডকুমেন্টেশন</title>
    <style>
        :root {
            --bg-primary: #0D1117;
            --bg-secondary: #161B22;
            --bg-tertiary: #21262D;
            --text-primary: #E6EDF3;
            --text-secondary: #8B949E;
            --accent-green: #3FB950;
            --accent-blue: #58A6FF;
            --accent-purple: #D2A8FF;
            --accent-orange: #FFA657;
            --accent-red: #FF7B72;
            --border-color: #30363D;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body { 
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            padding: 0;
        }
        
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 30px;
        }
        
        /* Header */
        .header {
            text-align: center;
            padding: 40px 0;
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 40px;
        }
        
        .header h1 {
            font-size: 2.5rem;
            color: var(--accent-green);
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }
        
        .header p {
            color: var(--text-secondary);
            font-size: 1.1rem;
        }
        
        .badge {
            display: inline-block;
            background: var(--accent-green);
            color: var(--bg-primary);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-top: 15px;
        }
        
        /* Navigation */
        .nav {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 40px;
            padding: 15px;
            background: var(--bg-secondary);
            border-radius: 10px;
            border: 1px solid var(--border-color);
        }
        
        .nav a {
            color: var(--accent-blue);
            text-decoration: none;
            padding: 8px 16px;
            border-radius: 6px;
            transition: all 0.2s;
        }
        
        .nav a:hover {
            background: var(--bg-tertiary);
            color: var(--accent-green);
        }
        
        /* Sections */
        .section {
            margin-bottom: 50px;
        }
        
        h2 {
            color: var(--accent-blue);
            font-size: 1.5rem;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--bg-tertiary);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        h3 {
            color: var(--accent-purple);
            font-size: 1.1rem;
            margin-bottom: 15px;
        }
        
        /* Tables */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: var(--bg-secondary);
            border-radius: 10px;
            overflow: hidden;
        }
        
        th, td {
            padding: 14px 18px;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }
        
        th {
            background: var(--bg-tertiary);
            color: var(--accent-orange);
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
        }
        
        tr:hover {
            background: var(--bg-tertiary);
        }
        
        tr:last-child td {
            border-bottom: none;
        }
        
        /* Code */
        code {
            background: var(--bg-tertiary);
            padding: 3px 8px;
            border-radius: 4px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            color: var(--accent-purple);
            font-size: 0.9rem;
        }
        
        .code {
            background: var(--bg-secondary);
            padding: 20px;
            border-radius: 10px;
            font-family: 'Consolas', 'Monaco', monospace;
            white-space: pre-wrap;
            overflow-x: auto;
            border-left: 4px solid var(--accent-green);
            margin: 15px 0;
            font-size: 0.9rem;
            line-height: 1.8;
        }
        
        /* Example Cards */
        .example-card {
            background: var(--bg-secondary);
            border-radius: 12px;
            margin-bottom: 25px;
            overflow: hidden;
            border: 1px solid var(--border-color);
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .example-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        }
        
        .example-card h3 {
            background: var(--bg-tertiary);
            padding: 15px 20px;
            margin: 0;
            border-bottom: 1px solid var(--border-color);
        }
        
        .example-card .code {
            margin: 0;
            border-radius: 0;
            border-left: none;
        }
        
        /* Snippets Grid */
        .snippets-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        
        .snippet-card {
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 15px;
            transition: all 0.2s;
        }
        
        .snippet-card:hover {
            border-color: var(--accent-blue);
            background: var(--bg-tertiary);
        }
        
        .snippet-card strong {
            color: var(--accent-green);
            font-size: 1.1rem;
        }
        
        .snippet-card p {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-top: 5px;
        }
        
        /* Tips */
        .tip {
            background: linear-gradient(135deg, rgba(63, 185, 80, 0.1) 0%, rgba(88, 166, 255, 0.1) 100%);
            border: 1px solid var(--accent-green);
            border-radius: 10px;
            padding: 20px;
            margin: 25px 0;
        }
        
        .tip::before {
            content: '💡';
            margin-right: 10px;
        }
        
        /* Highlighting classes */
        .text-green-600 { color: #10B981; }
        .text-emerald-400 { color: #34D399; }
        .text-amber-400 { color: #F59E0B; }
        .text-purple-400 { color: #A855F7; }
        .text-blue-300 { color: #60A5FA; }
        .text-orange-400 { color: #F97316; }
        .text-gray-400 { color: #9CA3AF; }
        .text-red-400 { color: #F87171; }
        .font-semibold { font-weight: 600; }
        .italic { font-style: italic; }
        
        /* Footer */
        .footer {
            text-align: center;
            padding: 30px;
            border-top: 1px solid var(--border-color);
            margin-top: 50px;
            color: var(--text-secondary);
        }
        
        .footer a {
            color: var(--accent-blue);
            text-decoration: none;
        }
        
        /* Responsive */
        @media (max-width: 600px) {
            .container {
                padding: 15px;
            }
            
            .header h1 {
                font-size: 1.8rem;
            }
            
            .nav {
                flex-direction: column;
            }
            
            .snippets-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🇧🇩 বাংলাস্ক্রিপ্ট ডকুমেন্টেশন</h1>
            <p>বাংলায় প্রোগ্রামিং করুন - JavaScript এর সম্পূর্ণ ক্ষমতা, বাংলা সিনট্যাক্সে!</p>
            <span class="badge">সংস্করণ 2.0</span>
        </div>
        
        <!-- Navigation -->
        <nav class="nav">
            <a href="#variables">📦 ভেরিয়েবল</a>
            <a href="#functions">⚡ ফাংশন</a>
            <a href="#conditions">🔀 শর্ত</a>
            <a href="#loops">🔁 লুপ</a>
            <a href="#console">🖥️ লিখো</a>
            <a href="#snippets">✂️ স্নিপেট</a>
            <a href="#examples">💡 উদাহরণ</a>
        </nav>
        
        <!-- Quick Start -->
        <div class="section">
            <h2>🚀 দ্রুত শুরু</h2>
            <p>বাংলাস্ক্রিপ্ট দিয়ে কোডিং শুরু করতে:</p>
            <ol style="margin: 15px 0; padding-left: 20px; color: var(--text-secondary);">
                <li><code>.bjs</code> এক্সটেনশন দিয়ে নতুন ফাইল তৈরি করুন</li>
                <li>বাংলায় কোড লিখুন এবং সিনট্যাক্স হাইলাইটিং উপভোগ করুন</li>
                <li><code>Ctrl+Space</code> চেপে অটো-কমপ্লিট সাজেশন দেখুন</li>
                <li><code>Ctrl+Shift+R</code> দিয়ে ফাইল চালান</li>
            </ol>
            
            <div class="tip">
                <strong>প্রথম প্রোগ্রাম:</strong> টাইপ করুন <code>hello</code> এবং Tab চাপুন - হ্যালো ওয়ার্ল্ড টেমপ্লেট তৈরি হবে!
            </div>
        </div>
        
        <!-- Variables Section -->
        <div class="section" id="variables">
            <h2>📦 ভেরিয়েবল ঘোষণা</h2>
            <table>
                <thead>
                    <tr>
                        <th>বাংলা</th>
                        <th>JavaScript</th>
                        <th>ব্যবহার</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>ধ্রুবক</code></td>
                        <td><code>const</code></td>
                        <td>স্থির মান (পরিবর্তন হবে না)</td>
                    </tr>
                    <tr>
                        <td><code>চলক</code> / <code>সংখ্যা</code></td>
                        <td><code>let</code></td>
                        <td>পরিবর্তনযোগ্য মান</td>
                    </tr>
                    <tr>
                        <td><code>শব্দ</code> / <code>বাক্য</code></td>
                        <td><code>let</code></td>
                        <td>টেক্সট ভেরিয়েবল</td>
                    </tr>
                    <tr>
                        <td><code>পরিবর্তনশীল</code></td>
                        <td><code>var</code></td>
                        <td>পুরাতন স্টাইল (এড়িয়ে চলুন)</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="code">ধ্রুবক নাম = "বাংলাদেশ";
সংখ্যা বয়স = ২৫;
চলক সক্রিয় = সত্য;</div>
        </div>
        
        <!-- Functions Section -->
        <div class="section" id="functions">
            <h2>⚡ ফাংশন</h2>
            <table>
                <thead>
                    <tr>
                        <th>বাংলা</th>
                        <th>JavaScript</th>
                        <th>উদাহরণ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>অনুষ্ঠান</code></td>
                        <td><code>function</code></td>
                        <td>ফাংশন তৈরি করে</td>
                    </tr>
                    <tr>
                        <td><code>প্রেরণ</code></td>
                        <td><code>return</code></td>
                        <td>মান ফেরত দেয়</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="code">অনুষ্ঠান যোগ(ক, খ) {
    প্রেরণ ক + খ;
}

ধ্রুবক ফল = যোগ(১০, ২০);
লিখো("যোগফল:", ফল); // 30</div>
        </div>
        
        <!-- Conditions Section -->
        <div class="section" id="conditions">
            <h2>🔀 শর্তমূলক বিবৃতি</h2>
            <table>
                <thead>
                    <tr>
                        <th>বাংলা</th>
                        <th>JavaScript</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>যদি</code></td><td><code>if</code></td></tr>
                    <tr><td><code>নাহলে</code></td><td><code>else</code></td></tr>
                    <tr><td><code>নাহলে যদি</code></td><td><code>else if</code></td></tr>
                    <tr><td><code>সুইচ</code></td><td><code>switch</code></td></tr>
                    <tr><td><code>কেস</code></td><td><code>case</code></td></tr>
                </tbody>
            </table>
            
            <div class="code">সংখ্যা নম্বর = ৮৫;

যদি (নম্বর >= ৮০) {
    লিখো("A+ গ্রেড! 🎉");
} নাহলে যদি (নম্বর >= ৬০) {
    লিখো("B গ্রেড 👍");
} নাহলে {
    লিখো("আরো চেষ্টা করুন 💪");
}</div>
        </div>
        
        <!-- Loops Section -->
        <div class="section" id="loops">
            <h2>🔁 লুপ</h2>
            <table>
                <thead>
                    <tr>
                        <th>বাংলা</th>
                        <th>JavaScript</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>জন্য</code></td><td><code>for</code></td></tr>
                    <tr><td><code>যখন</code></td><td><code>while</code></td></tr>
                    <tr><td><code>করো...যখন</code></td><td><code>do...while</code></td></tr>
                    <tr><td><code>থামাও</code></td><td><code>break</code></td></tr>
                    <tr><td><code>চালিয়ে_যাও</code></td><td><code>continue</code></td></tr>
                </tbody>
            </table>
            
            <div class="code">// জন্য লুপ
জন্য (সংখ্যা i = ১; i <= ৫; i++) {
    লিখো("সংখ্যা:", i);
}

// যখন লুপ
চলক গণনা = ০;
যখন (গণনা < ৩) {
    লিখো(গণনা);
    গণনা++;
}</div>
        </div>
        
        <!-- Console Section -->
        <div class="section" id="console">
            <h2>🖥️ কনসোল ফাংশন</h2>
            <table>
                <thead>
                    <tr>
                        <th>বাংলা</th>
                        <th>JavaScript</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>লিখো()</code></td><td><code>console.log()</code></td></tr>
                    <tr><td><code>ত্রুটি_লিখো()</code></td><td><code>console.error()</code></td></tr>
                    <tr><td><code>লিখো_সতর্কতা()</code></td><td><code>console.warn()</code></td></tr>
                    <tr><td><code>পরিষ্কার_করো()</code></td><td><code>console.clear()</code></td></tr>
                </tbody>
            </table>
        </div>
        
        <!-- Snippets Section -->
        <div class="section" id="snippets">
            <h2>✂️ স্নিপেট (শর্টকাট)</h2>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">
                নিচে প্রদত্ত কীওয়ার্ড টাইপ করে <code>Tab</code> চাপুন:
            </p>
            
            <div class="snippets-grid">
                <div class="snippet-card">
                    <strong>hello</strong>
                    <p>হ্যালো ওয়ার্ল্ড টেমপ্লেট</p>
                </div>
                <div class="snippet-card">
                    <strong>সংখ্যা</strong>
                    <p>সংখ্যা ভেরিয়েবল</p>
                </div>
                <div class="snippet-card">
                    <strong>অনুষ্ঠান</strong>
                    <p>ফাংশন ডেফিনিশন</p>
                </div>
                <div class="snippet-card">
                    <strong>যদি</strong>
                    <p>If-else স্টেটমেন্ট</p>
                </div>
                <div class="snippet-card">
                    <strong>জন্য</strong>
                    <p>For loop</p>
                </div>
                <div class="snippet-card">
                    <strong>যখন</strong>
                    <p>While loop</p>
                </div>
                <div class="snippet-card">
                    <strong>ক্লাস</strong>
                    <p>Class ডিক্লারেশন</p>
                </div>
                <div class="snippet-card">
                    <strong>চেষ্টা</strong>
                    <p>Try-catch ব্লক</p>
                </div>
                <div class="snippet-card">
                    <strong>অ্যাসিঙ্ক</strong>
                    <p>Async ফাংশন</p>
                </div>
                <div class="snippet-card">
                    <strong>অ্যারে</strong>
                    <p>Array ডিক্লারেশন</p>
                </div>
            </div>
        </div>
        
        <!-- Examples Section -->
        <div class="section" id="examples">
            <h2>💡 কোড উদাহরণ</h2>
            ${examplesSection}
        </div>
        
        <!-- Keyboard Shortcuts -->
        <div class="section">
            <h2>⌨️ কীবোর্ড শর্টকাট</h2>
            <table>
                <thead>
                    <tr>
                        <th>শর্টকাট</th>
                        <th>কাজ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>Ctrl+Shift+R</code></td>
                        <td>ফাইল চালান</td>
                    </tr>
                    <tr>
                        <td><code>Ctrl+Shift+D</code></td>
                        <td>ডকুমেন্টেশন দেখুন</td>
                    </tr>
                    <tr>
                        <td><code>Ctrl+Shift+N</code></td>
                        <td>নতুন ফাইল তৈরি</td>
                    </tr>
                    <tr>
                        <td><code>Ctrl+Space</code></td>
                        <td>অটো-কমপ্লিট সাজেশন</td>
                    </tr>
                    <tr>
                        <td><code>F12</code></td>
                        <td>ডেফিনিশনে যান</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>
                <strong>🇧🇩 বাংলাস্ক্রিপ্ট</strong> - বাংলায় কোড লিখুন!<br>
                <a href="https://github.com/BengalEmpire/banglascript-vscode">GitHub</a> | 
                <a href="https://npmjs.com/package/banglascript">NPM</a>
            </p>
            <p style="font-size: 0.85rem; margin-top: 10px;">
                Made with ❤️ by Mahmud Rahman
            </p>
        </div>
    </div>
</body>
</html>`;
}