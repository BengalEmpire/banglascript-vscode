# 🇧🇩 BanglaScript - VSCode Extension

<div align="center">

![BanglaScript Logo](icons/extension-icon.png)

**বাংলায় কোডিং করুন!** | **Write Code in Bengali!**

[![Version](https://img.shields.io/badge/version-2.0.0-green.svg)](https://marketplace.visualstudio.com/items?itemName=BengalEmpire.banglascript)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.80+-blue.svg)](https://code.visualstudio.com/)

The first comprehensive VSCode extension for BanglaScript - a programming language that lets you write JavaScript using Bengali (বাংলা) keywords!

[📦 Install Extension](https://marketplace.visualstudio.com/items?itemName=BengalEmpire.banglascript) · [📚 Documentation](https://bangla-script.vercel.app) · [🐛 Report Bug](https://github.com/BengalEmpire/banglascript-vscode/issues)

</div>

---

## ✨ Features

### 🎨 Rich Syntax Highlighting
Beautiful, comprehensive syntax highlighting for all BanglaScript keywords with distinct colors for:
- Variables & Constants (ধ্রুবক, চলক, সংখ্যা)
- Functions (অনুষ্ঠান, ফাংশন)
- Control Flow (যদি, নাহলে, জন্য, যখন)
- Classes (ক্লাস, বিস্তৃত, নির্মাতা)
- Async/Await (অ্যাসিঙ্ক, অপেক্ষা)
- And 150+ more keywords!

### 🧠 Smart IntelliSense
- **Auto-complete** for all Bengali keywords
- **Hover documentation** with Bengali descriptions and examples
- **Signature help** for function parameters
- **Quick suggestions** as you type

### 📝 40+ Code Snippets
Type a keyword and press `Tab`:
| Snippet | Description |
|---------|-------------|
| `hello` | Hello World template |
| `সংখ্যা` | Number variable |
| `অনুষ্ঠান` | Function declaration |
| `যদি` | If-else statement |
| `জন্য` | For loop |
| `ক্লাস` | Class with inheritance |
| `চেষ্টা` | Try-catch block |
| `অ্যাসিঙ্ক` | Async function |

### 🔍 Code Diagnostics
- Detects JavaScript keywords and suggests Bengali alternatives
- Finds common typos and spelling errors
- Checks bracket matching
- Provides quick fixes

### 🎯 Quick Actions
- **Convert JS to Bengali**: Automatically convert JavaScript keywords
- **Run File**: Execute BanglaScript files with one click
- **Template Generator**: Create files from 7 different templates

### 🎨 Premium Themes
Two professionally designed color themes:
- **BanglaScript Dark Pro** - GitHub-inspired dark theme
- **BanglaScript Light Pro** - Clean, high-contrast light theme

### 📁 Custom File Icons
Unique `.bjs` file icons and folder icons for BanglaScript projects.

---

## 🚀 Quick Start

### 1. Install the Extension
- Open VS Code
- Go to Extensions (`Ctrl+Shift+X`)
- Search for "BanglaScript"
- Click Install

### 2. Create Your First File
Create a file with `.bjs` extension and start coding:

```banglascript
// হ্যালো ওয়ার্ল্ড 🇧🇩
লিখো("হ্যালো, বিশ্ব!");

// ফাংশন তৈরি করুন
অনুষ্ঠান যোগ(ক, খ) {
    প্রেরণ ক + খ;
}

সংখ্যা ফলাফল = যোগ(১০, ২০);
লিখো("যোগফল:", ফলাফল);
```

### 3. Run Your Code
- Press `Ctrl+Shift+R` to run the file
- Or click the ▶️ button in the editor toolbar

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+R` | Run current file |
| `Ctrl+Shift+D` | Show documentation |
| `Ctrl+Shift+N` | Create new BanglaScript file |
| `Ctrl+Space` | Trigger IntelliSense |
| `F12` | Go to definition |

---

## 📖 Language Reference

### Variables (ভেরিয়েবল)
```banglascript
ধ্রুবক নাম = "রহিম";      // const - immutable
চলক বয়স = ২৫;           // let - mutable
সংখ্যা টাকা = ১০০;       // let for numbers
শব্দ বার্তা = "হ্যালো";     // let for strings
```

### Functions (ফাংশন)
```banglascript
অনুষ্ঠান শুভেচ্ছা(নাম) {
    প্রেরণ "স্বাগতম, " + নাম + "!";
}

// Arrow function
ধ্রুবক বর্গ = (n) => n * n;
```

### Conditions (শর্ত)
```banglascript
যদি (নম্বর >= ৮০) {
    লিখো("A+ গ্রেড!");
} নাহলে যদি (নম্বর >= ৬০) {
    লিখো("B গ্রেড");
} নাহলে {
    লিখো("আরো চেষ্টা করুন");
}
```

### Loops (লুপ)
```banglascript
// For loop
জন্য (সংখ্যা i = ১; i <= ৫; i++) {
    লিখো(i);
}

// While loop
যখন (শর্ত) {
    // কোড
}

// For...of
জন্য (ধ্রুবক আইটেম অফ তালিকা) {
    লিখো(আইটেম);
}
```

### Classes (ক্লাস)
```banglascript
ক্লাস মানুষ {
    নির্মাতা(নাম, বয়স) {
        এই.নাম = নাম;
        এই.বয়স = বয়স;
    }
    
    পরিচয়() {
        লিখো("আমি " + এই.নাম);
    }
}

ক্লাস ছাত্র বিস্তৃত মানুষ {
    নির্মাতা(নাম, বয়স, রোল) {
        সুপার(নাম, বয়স);
        এই.রোল = রোল;
    }
}

ধ্রুবক ব্যক্তি = নতুন মানুষ("করিম", ২৫);
```

### Async/Await
```banglascript
অ্যাসিঙ্ক অনুষ্ঠান ডাটা_আনো() {
    চেষ্টা {
        ধ্রুবক response = অপেক্ষা fetch(url);
        ধ্রুবক ডাটা = অপেক্ষা response.json();
        প্রেরণ ডাটা;
    } ধরো (ত্রুটি) {
        ত্রুটি_লিখো(ত্রুটি);
    }
}
```

### Error Handling (ত্রুটি হ্যান্ডলিং)
```banglascript
চেষ্টা {
    ঝুঁকিপূর্ণ_কাজ();
} ধরো (ত্রুটি) {
    ত্রুটি_লিখো("সমস্যা:", ত্রুটি);
} অবশেষে {
    পরিষ্কার();
}
```

---

## 🛠️ Configuration

Access settings: `File` → `Preferences` → `Settings` → Search "BanglaScript"

| Setting | Default | Description |
|---------|---------|-------------|
| `banglascript.enableSnippets` | `true` | Enable code snippets |
| `banglascript.showWelcomeMessage` | `true` | Show welcome message |
| `banglascript.enableDiagnostics` | `true` | Enable code diagnostics |
| `banglascript.suggestBanglaKeywords` | `true` | Suggest Bengali alternatives |
| `banglascript.autoComplete` | `true` | Enable auto-complete |

---

## 📋 Requirements

- VS Code 1.80.0 or higher
- [BanglaScript CLI](https://www.npmjs.com/package/banglascript) (for running files)

```bash
npm install -g banglascript
```

---

<div align="center">

**Made with ❤️ for the Bengali developer community**

**বাংলায় কোড লিখুন!**

© 2025 [Mahmud Rahman](https://gravatar.com/floawd)

</div>