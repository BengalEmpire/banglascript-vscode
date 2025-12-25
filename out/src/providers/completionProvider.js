"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompletionProvider = createCompletionProvider;
exports.createSignatureHelpProvider = createSignatureHelpProvider;
// Comprehensive completion provider for BanglaScript
const vscode = __importStar(require("vscode"));
// Comprehensive keyword database with descriptions
const KEYWORD_DATABASE = [
    // Variables
    { bangla: 'ধ্রুবক', javascript: 'const', category: 'variable', description: 'স্থির মান ঘোষণা (constant)', snippet: 'ধ্রুবক ${1:নাম} = ${2:মান};', detail: 'একবার নির্ধারিত হলে পরিবর্তন করা যায় না' },
    { bangla: 'চলক', javascript: 'let', category: 'variable', description: 'পরিবর্তনযোগ্য মান ঘোষণা (let)', snippet: 'চলক ${1:নাম} = ${2:মান};', detail: 'মান পরিবর্তন করা যায়' },
    { bangla: 'সংখ্যা', javascript: 'let', category: 'variable', description: 'সংখ্যা ভেরিয়েবল (number)', snippet: 'সংখ্যা ${1:নাম} = ${2:০};', detail: 'সংখ্যা টাইপ ভেরিয়েবল' },
    { bangla: 'শব্দ', javascript: 'let', category: 'variable', description: 'স্ট্রিং ভেরিয়েবল (string)', snippet: 'শব্দ ${1:নাম} = "${2:মান}";', detail: 'টেক্সট টাইপ ভেরিয়েবল' },
    { bangla: 'বাক্য', javascript: 'let', category: 'variable', description: 'স্ট্রিং ভেরিয়েবল (sentence)', snippet: 'বাক্য ${1:নাম} = "${2:মান}";', detail: 'বড় টেক্সট টাইপ ভেরিয়েবল' },
    { bangla: 'পরিবর্তনশীল', javascript: 'var', category: 'variable', description: 'পুরাতন স্টাইল ভেরিয়েবল (var)', snippet: 'পরিবর্তনশীল ${1:নাম} = ${2:মান};', detail: 'var - পুরাতন পদ্ধতি (let বা const ব্যবহার করুন)' },
    { bangla: 'ব্যাক্তি', javascript: 'const', category: 'variable', description: 'অবজেক্ট/ব্যক্তি ঘোষণা', snippet: 'ব্যাক্তি ${1:নাম} = "${2:মান}";', detail: 'const এর সমতুল্য' },
    // Functions
    { bangla: 'অনুষ্ঠান', javascript: 'function', category: 'function', description: 'ফাংশন তৈরি করুন', snippet: 'অনুষ্ঠান ${1:নাম}(${2:প্যারামিটার}) {\n\t${3:কোড}\n\tপ্রেরণ ${4:মান};\n}', detail: 'একটি নতুন ফাংশন তৈরি করে' },
    { bangla: 'ফাংশন', javascript: 'function', category: 'function', description: 'ফাংশন তৈরি করুন', snippet: 'ফাংশন ${1:নাম}(${2:প্যারামিটার}) {\n\t${3:কোড}\n}', detail: 'একটি নতুন ফাংশন তৈরি করে' },
    { bangla: 'প্রেরণ', javascript: 'return', category: 'function', description: 'মান ফেরত দিন (return)', snippet: 'প্রেরণ ${1:মান};', detail: 'ফাংশন থেকে মান ফেরত দেয়' },
    { bangla: 'ফেরত', javascript: 'return', category: 'function', description: 'মান ফেরত দিন (return)', snippet: 'ফেরত ${1:মান};', detail: 'ফাংশন থেকে মান ফেরত দেয়' },
    // Conditionals
    { bangla: 'যদি', javascript: 'if', category: 'conditional', description: 'শর্তমূলক বিবৃতি (if)', snippet: 'যদি (${1:শর্ত}) {\n\t${2:কোড}\n}', detail: 'শর্ত সত্য হলে কোড চলবে' },
    { bangla: 'নাহলে', javascript: 'else', category: 'conditional', description: 'অন্যথায় (else)', snippet: 'নাহলে {\n\t${1:কোড}\n}', detail: 'শর্ত মিথ্যা হলে এই কোড চলবে' },
    { bangla: 'নাহলে যদি', javascript: 'else if', category: 'conditional', description: 'অন্যথায় যদি (else if)', snippet: 'নাহলে যদি (${1:শর্ত}) {\n\t${2:কোড}\n}', detail: 'আরেকটি শর্ত পরীক্ষা করে' },
    { bangla: 'সুইচ', javascript: 'switch', category: 'conditional', description: 'সুইচ কেস বিবৃতি', snippet: 'সুইচ (${1:মান}) {\n\tকেস ${2:১}:\n\t\t${3:কোড}\n\t\tথামাও;\n\tসাধারণ:\n\t\t${4:ডিফল্ট কোড}\n}', detail: 'একাধিক শর্ত পরীক্ষা করে' },
    { bangla: 'কেস', javascript: 'case', category: 'conditional', description: 'সুইচ কেস', snippet: 'কেস ${1:মান}:\n\t${2:কোড}\n\tথামাও;', detail: 'সুইচের মধ্যে একটি কেস' },
    { bangla: 'সাধারণ', javascript: 'default', category: 'conditional', description: 'ডিফল্ট কেস', snippet: 'সাধারণ:\n\t${1:কোড}', detail: 'কোনো কেস মিলে না গেলে এটি চলবে' },
    // Loops
    { bangla: 'জন্য', javascript: 'for', category: 'loop', description: 'for লুপ', snippet: 'জন্য (সংখ্যা ${1:i} = ${2:০}; ${1:i} < ${3:৫}; ${1:i}++) {\n\t${4:কোড}\n}', detail: 'নির্দিষ্ট সংখ্যকবার পুনরাবৃত্তি করে' },
    { bangla: 'যখন', javascript: 'while', category: 'loop', description: 'while লুপ', snippet: 'যখন (${1:শর্ত}) {\n\t${2:কোড}\n}', detail: 'শর্ত সত্য থাকা পর্যন্ত চলতে থাকে' },
    { bangla: 'করো', javascript: 'do', category: 'loop', description: 'do-while লুপ', snippet: 'করো {\n\t${1:কোড}\n} যখন (${2:শর্ত});', detail: 'কমপক্ষে একবার চলে, তারপর শর্ত পরীক্ষা করে' },
    { bangla: 'থামাও', javascript: 'break', category: 'loop', description: 'লুপ থামান (break)', snippet: 'থামাও;', detail: 'লুপ থেকে বের হয়ে যায়' },
    { bangla: 'চালিয়ে_যাও', javascript: 'continue', category: 'loop', description: 'পরবর্তী ইটারেশনে যান (continue)', snippet: 'চালিয়ে_যাও;', detail: 'বর্তমান ইটারেশন স্কিপ করে পরেরটিতে যায়' },
    // Classes
    { bangla: 'ক্লাস', javascript: 'class', category: 'class', description: 'ক্লাস তৈরি করুন', snippet: 'ক্লাস ${1:নাম} {\n\tনির্মাতা(${2:প্যারামিটার}) {\n\t\tএই.${3:প্রপার্টি} = ${2:প্যারামিটার};\n\t}\n\n\t${4:মেথড}() {\n\t\t${5:কোড}\n\t}\n}', detail: 'অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং এর ক্লাস' },
    { bangla: 'শ্রেণী', javascript: 'class', category: 'class', description: 'শ্রেণী/ক্লাস তৈরি করুন', snippet: 'শ্রেণী ${1:নাম} {\n\tগঠন(${2:প্যারামিটার}) {\n\t\tএটি.${3:প্রপার্টি} = ${2:প্যারামিটার};\n\t}\n}', detail: 'অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিং এর ক্লাস' },
    { bangla: 'নির্মাতা', javascript: 'constructor', category: 'class', description: 'ক্লাস কনস্ট্রাক্টর', snippet: 'নির্মাতা(${1:প্যারামিটার}) {\n\tএই.${2:প্রপার্টি} = ${1:প্যারামিটার};\n}', detail: 'ক্লাসের কনস্ট্রাক্টর মেথড' },
    { bangla: 'গঠন', javascript: 'constructor', category: 'class', description: 'ক্লাস কনস্ট্রাক্টর', snippet: 'গঠন(${1:প্যারামিটার}) {\n\tএটি.${2:প্রপার্টি} = ${1:প্যারামিটার};\n}', detail: 'ক্লাসের কনস্ট্রাক্টর মেথড' },
    { bangla: 'বিস্তৃত', javascript: 'extends', category: 'class', description: 'ক্লাস ইনহেরিট করুন (extends)', snippet: 'বিস্তৃত ${1:প্যারেন্টক্লাস}', detail: 'অন্য ক্লাস থেকে বৈশিষ্ট্য উত্তরাধিকার সূত্রে পায়' },
    { bangla: 'সুপার', javascript: 'super', category: 'class', description: 'প্যারেন্ট ক্লাস কল করুন', snippet: 'সুপার(${1:প্যারামিটার});', detail: 'প্যারেন্ট ক্লাসের কনস্ট্রাক্টর কল করে' },
    { bangla: 'নতুন', javascript: 'new', category: 'class', description: 'নতুন অবজেক্ট তৈরি করুন', snippet: 'নতুন ${1:ক্লাস}(${2:প্যারামিটার})', detail: 'ক্লাস থেকে নতুন অবজেক্ট তৈরি করে' },
    { bangla: 'এই', javascript: 'this', category: 'class', description: 'বর্তমান অবজেক্ট রেফারেন্স', snippet: 'এই.${1:প্রপার্টি}', detail: 'বর্তমান অবজেক্টকে নির্দেশ করে' },
    { bangla: 'এটি', javascript: 'this', category: 'class', description: 'বর্তমান অবজেক্ট রেফারেন্স', snippet: 'এটি.${1:প্রপার্টি}', detail: 'বর্তমান অবজেক্টকে নির্দেশ করে' },
    { bangla: 'স্ট্যাটিক', javascript: 'static', category: 'class', description: 'স্ট্যাটিক মেথড/প্রপার্টি', snippet: 'স্ট্যাটিক ${1:মেথড}() {\n\t${2:কোড}\n}', detail: 'ক্লাস লেভেল মেথড/প্রপার্টি' },
    // Async
    { bangla: 'অ্যাসিঙ্ক', javascript: 'async', category: 'async', description: 'অ্যাসিঙ্ক্রোনাস ফাংশন', snippet: 'অ্যাসিঙ্ক অনুষ্ঠান ${1:নাম}() {\n\t${2:অপেক্ষা} ${3:প্রমিজ};\n\tপ্রেরণ ${4:মান};\n}', detail: 'অ্যাসিঙ্ক্রোনাস অপারেশনের জন্য' },
    { bangla: 'অপেক্ষা', javascript: 'await', category: 'async', description: 'প্রমিজ অপেক্ষা করুন (await)', snippet: 'অপেক্ষা ${1:প্রমিজ}', detail: 'প্রমিজ সম্পন্ন হওয়ার অপেক্ষা করে' },
    { bangla: 'প্রমিজ', javascript: 'Promise', category: 'async', description: 'প্রমিজ তৈরি করুন', snippet: 'নতুন Promise(অনুষ্ঠান(resolve, reject) {\n\t${1:কোড}\n\tresolve(${2:মান});\n})', detail: 'অ্যাসিঙ্ক্রোনাস অপারেশনের প্রমিজ' },
    // Error handling
    { bangla: 'চেষ্টা', javascript: 'try', category: 'error', description: 'ত্রুটি হ্যান্ডলিং শুরু', snippet: 'চেষ্টা {\n\t${1:কোড}\n} ধরো (${2:ত্রুটি}) {\n\tত্রুটি_লিখো(${2:ত্রুটি});\n} অবশেষে {\n\t${3:শেষ কোড}\n}', detail: 'ত্রুটি ধরার চেষ্টা করে' },
    { bangla: 'ধরো', javascript: 'catch', category: 'error', description: 'ত্রুটি ধরুন (catch)', snippet: 'ধরো (${1:ত্রুটি}) {\n\tত্রুটি_লিখো(${1:ত্রুটি});\n}', detail: 'ত্রুটি ধরে এবং হ্যান্ডল করে' },
    { bangla: 'অবশেষে', javascript: 'finally', category: 'error', description: 'সবশেষে চলবে (finally)', snippet: 'অবশেষে {\n\t${1:কোড}\n}', detail: 'সবসময় চলবে, ত্রুটি হোক বা না হোক' },
    { bangla: 'ছুড়ে_দাও', javascript: 'throw', category: 'error', description: 'ত্রুটি নিক্ষেপ করুন (throw)', snippet: 'ছুড়ে_দাও নতুন Error("${1:বার্তা}");', detail: 'নতুন ত্রুটি তৈরি করে নিক্ষেপ করে' },
    // Modules
    { bangla: 'আমদানি', javascript: 'import', category: 'module', description: 'মডিউল আমদানি করুন', snippet: 'আমদানি { ${1:নাম} } থেকে "${2:./পথ}";', detail: 'অন্য ফাইল থেকে মডিউল আনে' },
    { bangla: 'রপ্তানি', javascript: 'export', category: 'module', description: 'মডিউল রপ্তানি করুন', snippet: 'রপ্তানি অনুষ্ঠান ${1:নাম}() {\n\t${2:কোড}\n}', detail: 'অন্য ফাইলে ব্যবহারের জন্য রপ্তানি করে' },
    { bangla: 'থেকে', javascript: 'from', category: 'module', description: 'উৎস নির্দেশ করুন', snippet: 'থেকে "${1:./পথ}"', detail: 'মডিউলের উৎস নির্দেশ করে' },
    // Console
    { bangla: 'লিখো', javascript: 'console.log', category: 'console', description: 'কনসোলে লিখুন', snippet: 'লিখো(${1:"বার্তা"});', detail: 'কনসোলে আউটপুট দেখায়' },
    { bangla: 'ত্রুটি_লিখো', javascript: 'console.error', category: 'console', description: 'ত্রুটি বার্তা লিখুন', snippet: 'ত্রুটি_লিখো(${1:"ত্রুটি বার্তা"});', detail: 'কনসোলে ত্রুটি বার্তা দেখায়' },
    { bangla: 'লিখো_সতর্কতা', javascript: 'console.warn', category: 'console', description: 'সতর্কতা বার্তা লিখুন', snippet: 'লিখো_সতর্কতা(${1:"সতর্কতা বার্তা"});', detail: 'কনসোলে সতর্কতা বার্তা দেখায়' },
    { bangla: 'পরিষ্কার_করো', javascript: 'console.clear', category: 'console', description: 'কনসোল পরিষ্কার করুন', snippet: 'পরিষ্কার_করো();', detail: 'কনসোল পরিষ্কার করে' },
    // Values
    { bangla: 'সত্য', javascript: 'true', category: 'value', description: 'বুলিয়ান সত্য মান', snippet: 'সত্য', detail: 'Boolean true' },
    { bangla: 'মিথ্যা', javascript: 'false', category: 'value', description: 'বুলিয়ান মিথ্যা মান', snippet: 'মিথ্যা', detail: 'Boolean false' },
    { bangla: 'শূন্য', javascript: 'null', category: 'value', description: 'শূন্য/null মান', snippet: 'শূন্য', detail: 'null - কোনো মান নেই' },
    { bangla: 'অনির্ধারিত', javascript: 'undefined', category: 'value', description: 'অনির্ধারিত মান', snippet: 'অনির্ধারিত', detail: 'undefined - মান নির্ধারিত হয়নি' },
    // DOM
    { bangla: 'দস্তাবেজ', javascript: 'document', category: 'dom', description: 'HTML ডকুমেন্ট', snippet: 'দস্তাবেজ', detail: 'ওয়েব পেজের ডকুমেন্ট অবজেক্ট' },
    { bangla: 'আইডি_দ্বারা_পাও', javascript: 'getElementById', category: 'dom', description: 'ID দিয়ে এলিমেন্ট পান', snippet: 'দস্তাবেজ.আইডি_দ্বারা_পাও("${1:id}")', detail: 'নির্দিষ্ট ID এর এলিমেন্ট খুঁজে আনে' },
    { bangla: 'সিলেক্টর_দ্বারা_পাও', javascript: 'querySelector', category: 'dom', description: 'CSS সিলেক্টর দিয়ে এলিমেন্ট পান', snippet: 'দস্তাবেজ.সিলেক্টর_দ্বারা_পাও("${1:.class বা #id}")', detail: 'CSS সিলেক্টর দিয়ে প্রথম ম্যাচিং এলিমেন্ট খুঁজে আনে' },
    { bangla: 'ইভেন্ট_যোগ_করো', javascript: 'addEventListener', category: 'dom', description: 'ইভেন্ট লিসেনার যোগ করুন', snippet: '${1:element}.ইভেন্ট_যোগ_করো("${2:click}", অনুষ্ঠান() {\n\t${3:কোড}\n});', detail: 'এলিমেন্টে ইভেন্ট লিসেনার যোগ করে' },
    { bangla: 'তৈরি_করো', javascript: 'createElement', category: 'dom', description: 'নতুন HTML এলিমেন্ট তৈরি করুন', snippet: 'দস্তাবেজ.তৈরি_করো("${1:div}")', detail: 'নতুন HTML এলিমেন্ট তৈরি করে' },
    // Array methods
    { bangla: 'ঠেলো', javascript: 'push', category: 'array', description: 'অ্যারেতে আইটেম যোগ করুন', snippet: '${1:অ্যারে}.ঠেলো(${2:মান});', detail: 'অ্যারের শেষে আইটেম যোগ করে' },
    { bangla: 'তোলা', javascript: 'pop', category: 'array', description: 'অ্যারে থেকে শেষ আইটেম বের করুন', snippet: '${1:অ্যারে}.তোলা()', detail: 'অ্যারের শেষ আইটেম বের করে ফেরত দেয়' },
    { bangla: 'প্রতিটিতে', javascript: 'forEach', category: 'array', description: 'প্রতিটি আইটেমে ফাংশন চালান', snippet: '${1:অ্যারে}.প্রতিটিতে(অনুষ্ঠান(${2:আইটেম}) {\n\t${3:কোড}\n});', detail: 'অ্যারের প্রতিটি আইটেমে ফাংশন চালায়' },
    { bangla: 'ম্যাপ', javascript: 'map', category: 'array', description: 'অ্যারে ট্রান্সফর্ম করুন', snippet: '${1:অ্যারে}.ম্যাপ(অনুষ্ঠান(${2:আইটেম}) {\n\tপ্রেরণ ${3:নতুন_মান};\n})', detail: 'প্রতিটি আইটেম ট্রান্সফর্ম করে নতুন অ্যারে তৈরি করে' },
    { bangla: 'ফিল্টার', javascript: 'filter', category: 'array', description: 'অ্যারে ফিল্টার করুন', snippet: '${1:অ্যারে}.ফিল্টার(অনুষ্ঠান(${2:আইটেম}) {\n\tপ্রেরণ ${3:শর্ত};\n})', detail: 'শর্ত অনুযায়ী আইটেম ফিল্টার করে' },
    { bangla: 'খুঁজে', javascript: 'find', category: 'array', description: 'অ্যারেতে আইটেম খুঁজুন', snippet: '${1:অ্যারে}.খুঁজে(অনুষ্ঠান(${2:আইটেম}) {\n\tপ্রেরণ ${3:শর্ত};\n})', detail: 'প্রথম ম্যাচিং আইটেম খুঁজে বের করে' },
    { bangla: 'হ্রাস', javascript: 'reduce', category: 'array', description: 'অ্যারে রিডিউস করুন', snippet: '${1:অ্যারে}.হ্রাস(অনুষ্ঠান(${2:acc}, ${3:curr}) {\n\tপ্রেরণ ${4:acc + curr};\n}, ${5:প্রাথমিক_মান})', detail: 'অ্যারেকে একটি মানে রিডিউস করে' },
    { bangla: 'সাজাও', javascript: 'sort', category: 'array', description: 'অ্যারে সাজান', snippet: '${1:অ্যারে}.সাজাও()', detail: 'অ্যারে সাজিয়ে দেয়' },
    { bangla: 'উল্টাও', javascript: 'reverse', category: 'array', description: 'অ্যারে উল্টান', snippet: '${1:অ্যারে}.উল্টাও()', detail: 'অ্যারের ক্রম উল্টে দেয়' },
    { bangla: 'জোড়া', javascript: 'join', category: 'array', description: 'অ্যারে জোড়া দিন', snippet: '${1:অ্যারে}.জোড়া("${2:,}")', detail: 'অ্যারে আইটেমগুলো জোড়া দিয়ে স্ট্রিং তৈরি করে' },
    { bangla: 'দৈর্ঘ্য', javascript: 'length', category: 'array', description: 'অ্যারে/স্ট্রিং এর দৈর্ঘ্য', snippet: '${1:অ্যারে}.দৈর্ঘ্য', detail: 'আইটেম/অক্ষরের সংখ্যা' },
    { bangla: 'অন্তর্ভুক্ত', javascript: 'includes', category: 'array', description: 'আইটেম আছে কিনা চেক করুন', snippet: '${1:অ্যারে}.অন্তর্ভুক্ত(${2:মান})', detail: 'নির্দিষ্ট আইটেম আছে কিনা চেক করে' },
    // String methods
    { bangla: 'বড়হাতের', javascript: 'toUpperCase', category: 'string', description: 'বড় হাতের অক্ষরে রূপান্তর', snippet: '${1:স্ট্রিং}.বড়হাতের()', detail: 'সব অক্ষর বড় হাতে রূপান্তর করে' },
    { bangla: 'ছোটহাতের', javascript: 'toLowerCase', category: 'string', description: 'ছোট হাতের অক্ষরে রূপান্তর', snippet: '${1:স্ট্রিং}.ছোটহাতের()', detail: 'সব অক্ষর ছোট হাতে রূপান্তর করে' },
    { bangla: 'ছাঁটাই', javascript: 'trim', category: 'string', description: 'শুরু ও শেষের স্পেস সরান', snippet: '${1:স্ট্রিং}.ছাঁটাই()', detail: 'শুরু ও শেষের স্পেস এবং নিউলাইন সরায়' },
    { bangla: 'প্রতিস্থাপন', javascript: 'replace', category: 'string', description: 'টেক্সট প্রতিস্থাপন করুন', snippet: '${1:স্ট্রিং}.প্রতিস্থাপন("${2:পুরাতন}", "${3:নতুন}")', detail: 'একটি টেক্সট অন্যটি দিয়ে প্রতিস্থাপন করে' },
    { bangla: 'ভাগ', javascript: 'split', category: 'string', description: 'স্ট্রিং ভাগ করে অ্যারে তৈরি করুন', snippet: '${1:স্ট্রিং}.ভাগ("${2:বিভাজক}")', detail: 'স্ট্রিংকে ভাগ করে অ্যারে তৈরি করে' },
    { bangla: 'খণ্ড', javascript: 'slice', category: 'string', description: 'স্ট্রিং/অ্যারের অংশ নিন', snippet: '${1:স্ট্রিং}.খণ্ড(${2:শুরু}, ${3:শেষ})', detail: 'নির্দিষ্ট অংশ কেটে নেয়' },
    { bangla: 'সূচকে', javascript: 'indexOf', category: 'string', description: 'টেক্সটের অবস্থান খুঁজুন', snippet: '${1:স্ট্রিং}.সূচকে("${2:খুঁজুন}")', detail: 'নির্দিষ্ট টেক্সটের প্রথম অবস্থান ফেরত দেয়' },
    // Math
    { bangla: 'গণিত', javascript: 'Math', category: 'math', description: 'গণিত অবজেক্ট', snippet: 'গণিত', detail: 'গাণিতিক ফাংশনসমূহের অবজেক্ট' },
    { bangla: 'এলোমেলো_সংখ্যা', javascript: 'Math.random', category: 'math', description: 'র‍্যান্ডম সংখ্যা (0-1)', snippet: 'এলোমেলো_সংখ্যা()', detail: '0 থেকে 1 এর মধ্যে র‍্যান্ডম সংখ্যা' },
    { bangla: 'বর্গমূল', javascript: 'Math.sqrt', category: 'math', description: 'বর্গমূল বের করুন', snippet: 'গণিত.বর্গমূল(${1:সংখ্যা})', detail: 'সংখ্যার বর্গমূল বের করে' },
    { bangla: 'শক্তি', javascript: 'Math.pow', category: 'math', description: 'ঘাত/পাওয়ার', snippet: 'গণিত.শক্তি(${1:ভিত্তি}, ${2:ঘাত})', detail: 'ভিত্তির ঘাত বের করে' },
    { bangla: 'পরম', javascript: 'Math.abs', category: 'math', description: 'পরম মান', snippet: 'গণিত.পরম(${1:সংখ্যা})', detail: 'সংখ্যার পরম মান (absolute value) বের করে' },
    { bangla: 'সর্বোচ্চ', javascript: 'Math.max', category: 'math', description: 'সর্বোচ্চ সংখ্যা', snippet: 'গণিত.সর্বোচ্চ(${1:সংখ্যাসমূহ})', detail: 'সবচেয়ে বড় সংখ্যা বের করে' },
    { bangla: 'সর্বনিম্ন', javascript: 'Math.min', category: 'math', description: 'সর্বনিম্ন সংখ্যা', snippet: 'গণিত.সর্বনিম্ন(${1:সংখ্যাসমূহ})', detail: 'সবচেয়ে ছোট সংখ্যা বের করে' },
    { bangla: 'রাউন্ড', javascript: 'Math.round', category: 'math', description: 'নিকটতম পূর্ণসংখ্যায় রাউন্ড', snippet: 'গণিত.রাউন্ড(${1:সংখ্যা})', detail: 'নিকটতম পূর্ণসংখ্যায় রাউন্ড করে' },
    { bangla: 'সিলিং', javascript: 'Math.ceil', category: 'math', description: 'উপরে রাউন্ড', snippet: 'গণিত.সিলিং(${1:সংখ্যা})', detail: 'উপরের দিকে রাউন্ড করে' },
    { bangla: 'ফ্লোর', javascript: 'Math.floor', category: 'math', description: 'নিচে রাউন্ড', snippet: 'গণিত.ফ্লোর(${1:সংখ্যা})', detail: 'নিচের দিকে রাউন্ড করে' },
    // Operators
    { bangla: 'ধরন', javascript: 'typeof', category: 'operator', description: 'টাইপ চেক করুন', snippet: 'ধরন ${1:মান}', detail: 'মানের টাইপ বের করে' },
    { bangla: 'মুছো', javascript: 'delete', category: 'operator', description: 'প্রপার্টি মুছুন', snippet: 'মুছো ${1:অবজেক্ট}.${2:প্রপার্টি};', detail: 'অবজেক্ট থেকে প্রপার্টি মুছে দেয়' },
];
// Category icons for completion items
const CATEGORY_ICONS = {
    variable: vscode.CompletionItemKind.Variable,
    function: vscode.CompletionItemKind.Function,
    conditional: vscode.CompletionItemKind.Keyword,
    loop: vscode.CompletionItemKind.Keyword,
    class: vscode.CompletionItemKind.Class,
    async: vscode.CompletionItemKind.Keyword,
    error: vscode.CompletionItemKind.Keyword,
    module: vscode.CompletionItemKind.Module,
    console: vscode.CompletionItemKind.Function,
    value: vscode.CompletionItemKind.Value,
    dom: vscode.CompletionItemKind.Method,
    array: vscode.CompletionItemKind.Method,
    string: vscode.CompletionItemKind.Method,
    math: vscode.CompletionItemKind.Method,
    operator: vscode.CompletionItemKind.Operator,
};
function createCompletionProvider() {
    return {
        provideCompletionItems(document, position, token, context) {
            const completionItems = [];
            // Get the line text and current word
            const linePrefix = document.lineAt(position).text.slice(0, position.character);
            // Add all keywords from database
            for (const keyword of KEYWORD_DATABASE) {
                const item = new vscode.CompletionItem(keyword.bangla, CATEGORY_ICONS[keyword.category] || vscode.CompletionItemKind.Keyword);
                item.detail = `${keyword.bangla} → ${keyword.javascript}`;
                item.documentation = new vscode.MarkdownString(`**${keyword.bangla}** (\`${keyword.javascript}\`)\n\n${keyword.description}\n\n${keyword.detail || ''}`);
                if (keyword.snippet) {
                    item.insertText = new vscode.SnippetString(keyword.snippet);
                    item.kind = vscode.CompletionItemKind.Snippet;
                }
                else {
                    item.insertText = keyword.bangla;
                }
                // Set sort text to prioritize common items
                item.sortText = `0${keyword.bangla}`;
                completionItems.push(item);
            }
            // Add Bengali numeral completions
            const banglaNumbers = [
                { bangla: '০', value: '0' },
                { bangla: '১', value: '1' },
                { bangla: '২', value: '2' },
                { bangla: '৩', value: '3' },
                { bangla: '৪', value: '4' },
                { bangla: '৫', value: '5' },
                { bangla: '৬', value: '6' },
                { bangla: '৭', value: '7' },
                { bangla: '৮', value: '8' },
                { bangla: '৯', value: '9' },
            ];
            for (const num of banglaNumbers) {
                const item = new vscode.CompletionItem(num.bangla, vscode.CompletionItemKind.Value);
                item.detail = `Bengali ${num.value}`;
                item.documentation = new vscode.MarkdownString(`বাংলা সংখ্যা: **${num.bangla}** = ${num.value}`);
                item.sortText = `9${num.bangla}`;
                completionItems.push(item);
            }
            return completionItems;
        }
    };
}
// Create signature help provider for function calls
function createSignatureHelpProvider() {
    return {
        provideSignatureHelp(document, position, token, context) {
            const lineText = document.lineAt(position).text;
            const linePrefix = lineText.slice(0, position.character);
            // Check for common function signatures
            const signatures = {};
            // লিখো function
            if (linePrefix.includes('লিখো(')) {
                const sigHelp = new vscode.SignatureHelp();
                const sig = new vscode.SignatureInformation('লিখো(...বার্তাসমূহ)', 'কনসোলে বার্তা প্রিন্ট করে (console.log)');
                sig.parameters = [
                    new vscode.ParameterInformation('...বার্তাসমূহ', 'প্রিন্ট করতে চান এমন যেকোনো মান')
                ];
                sigHelp.signatures = [sig];
                sigHelp.activeSignature = 0;
                sigHelp.activeParameter = 0;
                return sigHelp;
            }
            return null;
        }
    };
}
//# sourceMappingURL=completionProvider.js.map