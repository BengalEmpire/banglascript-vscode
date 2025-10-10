
# BanglaScript VS Code Extension

Welcome to the **BanglaScript** Visual Studio Code extension! This extension provides syntax highlighting, code snippets, and basic language support for **BanglaScript** (.bjs files), a transpiler that allows programming in the Bengali language by compiling to JavaScript.

## Features

-   **Syntax Highlighting**: Highlights BanglaScript keywords (e.g., `বাক্য`, `অনুষ্ঠান`, `যদি`), strings, comments, numbers, and identifiers in .bjs files using TextMate grammar.
-   **Code Snippets**: Pre-defined snippets for common BanglaScript patterns, including variable declarations (`বাক্য`), functions (`অনুষ্ঠান`), if-else (`যদি...নাহলে`), loops (`জন্য`, `যখন`), classes (`শ্রেণী`), and a "Hello World" template.
-   **Language Support**: Supports auto-closing brackets, proper indentation for Bangla keywords, and comment toggling (using `//` or `/* */`).
-   **Unicode Bengali Support**: Fully supports Bengali characters for identifiers and keywords.

## Installation

1.  **Install via VS Code Marketplace** (once published):
    
    -   Search for "BanglaScript" in the Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X` on macOS).
    -   Click **Install**.
2.  **Manual Installation** (using .vsix):
    
    -   Download the `.vsix` file from the [Releases](https://github.com/BengalEmpire/banglascript-vscode/releases) page.
    -   In VS Code, go to Extensions view, click the `...` menu, select **Install from VSIX**, and choose the file.
3.  **Verify Installation**:
    
    -   Open a `.bjs` file (e.g., `hello.bjs`).
    -   Ensure keywords like `লিখো` or `যদি` are highlighted (e.g., blue for keywords, green for strings in most themes).

## Usage

### Writing BanglaScript Code

1.  Create a new file with a `.bjs` extension (e.g., `hello.bjs`).
2.  Write BanglaScript code, such as:
    
    ```banglascript
    বাক্য নাম = "হ্যালো, বিশ্ব!";
    লিখো(নাম);
    
    ```
    
3.  Save the file and observe syntax highlighting:
    -   Keywords (`বাক্য`, `লিখো`) in blue or theme-specific color.
    -   Strings (`"হ্যালো, বিশ্ব!"`) in green.
    -   Comments (`// এটি একটি মন্তব্য`) in gray.

### Using Snippets

1.  Open a `.bjs` file.
2.  Type a snippet prefix (e.g., `func`, `if`, `hello`) and press `Ctrl+Space` (or `Tab` if auto-complete is enabled).
3.  Select a snippet to insert a template. For example:
    -   `hello` → `লিখো("হ্যালো, বিশ্ব!");`
    -   `func` →
        
        ```banglascript
        অনুষ্ঠান যোগ(ক, খ) {
            প্রেরণ ক + খ;
        }
        
        ```
        
4.  Use tabstops (`${1:}`) to jump between placeholders and customize the code.

### Editing Features

-   **Auto-Closing**: Brackets `{`, `[`, `(`, and quotes (`"`, `'`) auto-close.
-   **Indentation**: Automatically indents after keywords like `যদি`, `অনুষ্ঠান`, or `জন্য`.
-   **Comment Toggling**: Use `Ctrl+/` (`Cmd+/` on macOS) to toggle `//` comments or `/* */` block comments.

### Compiling BanglaScript

This extension provides editing support. To compile .bjs files to JavaScript, use the BanglaScript CLI:

```bash
npm install -g banglascript
bjs build hello.bjs
node build/hello.js

```

See the [BanglaScript Documentation](https://bangla-script.vercel.app/docs) for CLI details.

## Example Code

Here’s a sample `.bjs` file demonstrating syntax highlighting and snippets:

```banglascript
// হ্যালো ওয়ার্ল্ড প্রোগ্রাম
বাক্য শুভেচ্ছা = "হ্যালো, বিশ্ব!";
লিখো(শুভেচ্ছা);

// ফাংশন সংজ্ঞা
অনুষ্ঠান যোগ(ক, খ) {
    প্রেরণ ক + খ;
}

// লুপ এবং শর্ত
জন্য (বাক্য আই = ১; আই <= ৫; আই++) {
    যদি (আই % ২ == ০) {
        লিখো(যোগ(আই, ২));
    } নাহলে {
        লিখো("বিজোড়: " + আই);
    }
}

```

Expected output when compiled and run:

```
হ্যালো, বিশ্ব!
বিজোড়: 1
4
বিজোড়: 3
6
বিজোড়: 5

```

## Configuration

Enable/disable snippets via VS Code settings:

1.  Go to `File > Preferences > Settings` (or `Ctrl+,`).
2.  Search for `banglascript`.
3.  Toggle `banglascript.enableSnippets` (default: `true`).

## Supported Keywords

The extension highlights BanglaScript keywords, including:

-   Variables: `বাক্য`, `সংখ্যা`, `চলক`, `ধ্রুবক`, `পরিবর্তনশীল`
-   Functions: `অনুষ্ঠান`, `ফাংশন`, `প্রেরণ`, `ফেরত`
-   Control Flow: `যদি`, `নাহলে`, `নাহলে_যদি`, `যখন`, `জন্য`, `প্রতিটি`, `করো`, `থামাও`, `চালিয়ে_যাও`
-   Classes: `শ্রেণী`, `ক্লাস`, `গঠন`, `এটি`, `বিস্তৃত`, `স্ট্যাটিক`
-   Console: `লিখো`, `ছাপাও`, `সমস্যা_লিখো`, `সতর্কতা`, `তথ্য`
-   Others: `সত্য`, `মিথ্যা`, `শূন্য`, `অনির্ধারিত`, `চেষ্টা`, `ধরো`, `অবশেষে`, `ফেলা`, etc.

For a full list, see the [BanglaScript Documentation](https://github.com/your-repo/banglascript).

## Development

### Prerequisites

-   Node.js (v14+)
-   npm or yarn
-   VS Code (v1.80+)
-   Yeoman and VS Code generator: `npm install -g yo generator-code`

### Setup

1.  Clone the repository:
    
    ```bash
    git clone https://github.com/BengalEmpire/banglascript-vscode.git
    cd banglascript-vscode
    
    ```
    
2.  Install dependencies:
    
    ```bash
    npm install
    
    ```
    
3.  Compile TypeScript:
    
    ```bash
    npm run compile
    
    ```
    

### Testing Locally

1.  Open the project in VS Code.
2.  Press `F5` to launch the Extension Development Host.
3.  Open a `.bjs` file to test highlighting and snippets.
4.  Use the "Developer: Inspect Editor Tokens and Scopes" command to debug highlighting.

### Packaging

1.  Install vsce: `npm install -g vsce`.
2.  Package: `vsce package` (creates `banglascript-0.0.1.vsix`).
3.  Publish (requires Marketplace account): `vsce publish`.

## Contributing

Contributions are welcome! To contribute:

1.  Fork the repository.
2.  Create a feature branch: `git checkout -b feature/your-feature`.
3.  Commit changes: `git commit -m "Add your feature"`.
4.  Push to the branch: `git push origin feature/your-feature`.
5.  Open a Pull Request.

Please follow the [Code of Conduct](https://github.com/BengalEmpire/banglascript-vscode/CODE_OF_CONDUCT.md) and report issues on the [Issues](https://github.com/BengalEmpire/banglascript-vscode/issues) page.

### Ideas for Contributions

-   Add Language Server Protocol (LSP) for error checking and hover tooltips.
-   Enhance snippets with more templates (e.g., async functions).
-   Add custom theme colors for BanglaScript keywords.
-   Improve regex for complex Bangla identifiers.


## Acknowledgments

-   Built with the [VS Code Extension API](https://code.visualstudio.com/api).
-   Inspired by the BanglaScript transpiler for programming in Bengali.
-   Thanks to the open-source community for TextMate grammar tools.

----------

**Happy Coding in BanglaScript!**  
For more details, visit the [BanglaScript Project](https://github.com/BengalEmpire/BanglaScript).