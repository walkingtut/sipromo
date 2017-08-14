const fs = require('fs');
const path = require('path');
const sipforms = path.join(__dirname, 'src', 'sipforms');
const mkdirp = require('mkdirp').sync;

let result = {};

function extractAll(dir) {
    const files = fs.readdirSync(dir);
    const parts = dir.split(path.sep);
    const sipform = parts[parts.length - 1];

    for (let file of files) {
        const fullPath = path.join(dir, file);
        
        if (fs.lstatSync(fullPath).isDirectory()) {
            extractAll(fullPath); 
        } else if (file === `${sipform}.js`) {
            try {
                extractFrom(sipform, file, fullPath);
            } catch (e) {
                console.log(`Error extracting code from ${file}`, e);
            }
        }
    }
}

function extractFrom(sipform, file, fullPath) {
    if (!fs.existsSync(fullPath)) return;

    const content = fs.readFileSync(path.join(fullPath), 'utf8');
    const importRegex = /import[^'"]+['"]([^'"]+)['"];/gi;
    let match;

    (result[sipform] = result[sipform] || {})[file] = content;

    while (match = importRegex.exec(content)) {
        file = `${match[1]}.js`;
        
        if (file.startsWith('.')) {
            extractFrom(sipform, path.basename(file), path.join(path.dirname(fullPath), file));
        }
    }
}

function run() {
    const outputDir = path.join(__dirname, 'build', 'resources');
    extractAll(sipforms); 
    mkdirp(outputDir);
    fs.writeFileSync(path.join(outputDir, 'code.js'), `window._code = ${JSON.stringify(result, null, '\t')}`, 'utf8');
    console.log('wrote code.js');
}

run();