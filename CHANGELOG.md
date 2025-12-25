# Changelog

All notable changes to the BanglaScript VSCode Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-12-25

### 🎉 Major Release - Complete Rewrite

This is a major update that transforms BanglaScript from a basic syntax highlighter into a full-featured IDE experience for Bengali programming.

### ✨ Added

#### IntelliSense & Auto-Complete
- **Smart Completion Provider**: 100+ keywords with Bengali descriptions
- **Signature Help**: Function parameter hints while typing
- **Hover Documentation**: Detailed Bengali explanations with examples for all keywords
- **Category-based Completion Icons**: Different icons for variables, functions, classes, etc.

#### Code Diagnostics & Quick Fixes
- **Error Detection**: Bracket matching, syntax validation
- **JS to Bengali Suggestions**: Detects JavaScript keywords and suggests Bengali alternatives
- **Typo Detection**: Finds common spelling mistakes in Bengali keywords
- **Quick Fix Actions**: One-click conversion of JS code to BanglaScript
- **Bulk Conversion**: Convert entire documents from JS to Bengali

#### New Commands
- `নতুন ফাইল তৈরি করুন` - Create new file with template selection (7 options)
- `ফাইল চালান` - Run BanglaScript files directly
- `কীওয়ার্ড রেফারেন্স দেখুন` - Interactive keyword reference with search
- `JavaScript কীওয়ার্ড বাংলায় রূপান্তর করুন` - Bulk convert JS to Bengali

#### New Templates
- Empty file
- Hello World
- Function examples
- Class & OOP examples
- Array operations
- DOM manipulation
- Async/Await patterns

#### Themes
- **BanglaScript Dark Pro**: GitHub-inspired dark theme with beautiful syntax colors
- **BanglaScript Light Pro**: Clean, high-contrast light theme

#### Icons
- New professional extension icon with gradient design
- New file icon for `.bjs` files
- Folder icons for BanglaScript projects

#### Snippets
- 40+ new snippets covering all language features
- Bengali numeral support
- Context-aware snippet suggestions

#### UI Enhancements
- Status bar item showing "বাংলাস্ক্রিপ্ট" when editing .bjs files
- Context menu integration
- Editor toolbar run button
- Enhanced welcome message with Bengali text

#### Keyboard Shortcuts
- `Ctrl+Shift+R` - Run file
- `Ctrl+Shift+D` - Show documentation
- `Ctrl+Shift+N` - Create new file

### 🔄 Changed
- Complete rewrite of syntax highlighting grammar with 20+ scope categories
- Improved language configuration with proper folding and indentation
- Enhanced documentation webview with modern responsive design
- Updated package.json with new commands and configuration options

### 🐛 Fixed
- Fixed regex patterns in language configuration
- Fixed bracket matching issues
- Improved Unicode handling for Bengali characters
- Better tokenization for Bengali numerals (০-৯)

### 📚 Documentation
- Comprehensive README with installation guide
- Language reference with code examples
- Keyboard shortcuts reference
- Contributing guidelines

---

## [1.0.0] - 2025-12-01

### Added
- Initial release
- Basic syntax highlighting for BanglaScript keywords
- Simple code snippets
- Hover provider for keyword translation
- Basic dark and light themes
- Hello World template command
- Documentation webview

---

## Future Plans

### v2.1.0 (Planned)
- [ ] Code formatter
- [ ] Go to definition
- [ ] Find all references
- [ ] Rename symbol
- [ ] Code outline/breadcrumbs

### v2.2.0 (Planned)
- [ ] Debugger integration
- [ ] Test runner integration
- [ ] Project scaffolding
- [ ] NPM integration

---

**🇧🇩 বাংলায় কোড লিখুন!**