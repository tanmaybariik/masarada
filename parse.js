const fs = require('fs');
const html = fs.readFileSync('C:\\\\Users\\\\tanma\\\\.gemini\\\\antigravity-ide\\\\brain\\\\344050a0-6704-4d3c-b7d6-2930cf9aac4c\\\\.system_generated\\\\steps\\\\621\\\\content.md', 'utf8');

const titleMatch = [...html.matchAll(/<h3 class='post-title[^>]*>([\s\S]*?)<\/h3>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
const imgMatch = [...html.matchAll(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/g)].map(m => m[1]);

console.log(titleMatch.slice(0, 5));
console.log(imgMatch.filter(url => url.includes('blogger.googleusercontent.com')).slice(0, 5));
