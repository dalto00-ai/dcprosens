import https from 'https';
import { posts } from '../src/lib/posts';
import { stories } from '../src/lib/stories';

const HOST = 'dcprosens.com';
const KEY = 'd11bb27999754f2586c5fb8bea3a4ee4'; // Bing Key from verify file
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Core static pages
const staticPages = [
    `https://${HOST}/`,
    `https://${HOST}/about`,
    `https://${HOST}/contact`,
    `https://${HOST}/privacy`,
    `https://${HOST}/terms`,
    `https://${HOST}/games`,
    `https://${HOST}/dpi`,
    `https://${HOST}/blog`,
    `https://${HOST}/web-stories`,
];

// Dynamic blog posts
const blogPosts = posts.map(post => `https://${HOST}/blog/${post.slug}`);

// Dynamic web stories
const webStories = stories.map(story => `https://${HOST}/web-stories/${story.slug}`);

// Combine all pages
const urlList = [
    ...staticPages,
    ...blogPosts,
    ...webStories,
];

console.log(`Preparing to submit ${urlList.length} URLs to IndexNow...`);

const data = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList,
});

const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(data),
    },
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
