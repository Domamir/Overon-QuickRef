// Cleans up whitespace in longDescription fields of OveronElementsCategories.json.
//
// Usage:
//   node scripts/cleanDescriptions.js           -> report only, file is not modified
//   node scripts/cleanDescriptions.js --write   -> apply changes to the file
//
// The file is written back with the same BOM, line endings and 2-space indentation,
// so `git diff` shows only real content changes.

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'src', 'JsonData', 'OveronElementsCategories.json');
const WRITE = process.argv.includes('--write');

// Each rule takes the description text and returns the cleaned text.
// Order matters: later rules assume earlier ones have already run.
const rules = [
    {
        name: 'Ujednolicenie końców linii (\\r\\n -> \\n)',
        apply: text => text.replace(/\r\n?/g, '\n'),
    },
    {
        name: 'Spacje na końcach linii',
        apply: text => text.replace(/[ \t]+$/gm, ''),
    },
    {
        name: 'Spacje na początku linii',
        apply: text => text.replace(/^[ \t]+/gm, ''),
    },
    {
        name: 'Wielokrotne spacje w środku linii',
        apply: text => text.replace(/ {2,}/g, ' '),
    },
    {
        name: 'Zdania złamane w połowie (sklejenie linii)',
        // Line ends with a lowercase letter or comma and the next line starts with a lowercase letter.
        apply: text => text.replace(/([a-z,])\n(?=[a-z])/g, '$1 '),
    },
    {
        name: '3+ entery zwinięte do jednej pustej linii',
        apply: text => text.replace(/\n{3,}/g, '\n\n'),
    },
    {
        name: 'Puste linie / spacje na początku i końcu opisu',
        apply: text => text.trim(),
    },
];

// Short lines without ending punctuation, preceded by an empty line - possible "## heading" or "- list item".
function findStructureCandidates(text) {
    const lines = text.split('\n');
    const headings = [];
    const listItems = [];

    lines.forEach((line, i) => {
        const isAfterEmptyLine = i > 0 && lines[i - 1] === '';
        const isShort = line.length > 0 && line.length < 40;
        const endsWithPunctuation = /[.!?;,]$/.test(line);

        if (!isShort || endsWithPunctuation) {
            return;
        }

        if (/^[^:]{1,20}:\s*\S/.test(line)) {
            listItems.push(line);
        } else if (isAfterEmptyLine && !line.endsWith(':')) {
            headings.push(line);
        }
    });

    return {headings, listItems};
}

function readJson(file) {
    const raw = fs.readFileSync(file, 'utf8');
    const hasBom = raw.startsWith('﻿');
    const body = hasBom ? raw.slice(1) : raw;

    return {
        data: JSON.parse(body),
        hasBom,
        lineEnding: body.includes('\r\n') ? '\r\n' : '\n',
        endsWithNewline: /\n$/.test(body),
    };
}

function writeJson(file, {data, hasBom, lineEnding, endsWithNewline}) {
    let out = JSON.stringify(data, null, 2).replace(/\n/g, lineEnding);

    if (endsWithNewline) {
        out += lineEnding;
    }

    fs.writeFileSync(file, (hasBom ? '﻿' : '') + out, 'utf8');
}

function main() {
    const json = readJson(FILE);
    const ruleCounts = new Map(rules.map(rule => [rule.name, 0]));
    const changedElements = [];
    const headingCandidates = [];
    const listCandidates = [];

    json.data.forEach(category => {
        category.actions.forEach(action => {
            const original = action.longDescription;

            if (typeof original !== 'string') {
                return;
            }

            const appliedRules = [];
            let text = original;

            rules.forEach(rule => {
                const next = rule.apply(text);

                if (next !== text) {
                    ruleCounts.set(rule.name, ruleCounts.get(rule.name) + 1);
                    appliedRules.push(rule.name);
                    text = next;
                }
            });

            if (text !== original) {
                changedElements.push({category: category.category, name: action.name, appliedRules});
                action.longDescription = text;
            }

            const {headings, listItems} = findStructureCandidates(text);
            headings.forEach(line => headingCandidates.push(`${action.name}: ${line}`));
            listItems.forEach(line => listCandidates.push(`${action.name}: ${line}`));
        });
    });

    const totalElements = json.data.reduce((sum, category) => sum + category.actions.length, 0);

    console.log(`\n=== Zmienione opisy: ${changedElements.length} / ${totalElements} ===\n`);
    changedElements.forEach(({category, name, appliedRules}) => {
        console.log(`[${category}] ${name}`);
        appliedRules.forEach(rule => console.log(`    - ${rule}`));
    });

    console.log('\n=== Liczba opisów zmienionych przez każdą regułę ===\n');
    ruleCounts.forEach((count, name) => console.log(`${String(count).padStart(4)}  ${name}`));

    console.log(`\n=== Kandydaci na podtytuły "## " (${headingCandidates.length}) - tylko do przejrzenia ===\n`);
    headingCandidates.forEach(line => console.log(`    ${line}`));

    console.log(`\n=== Kandydaci na punkty listy "- " (${listCandidates.length}) - tylko do przejrzenia ===\n`);
    listCandidates.forEach(line => console.log(`    ${line}`));

    if (WRITE) {
        writeJson(FILE, json);
        console.log(`\nZapisano zmiany w ${path.relative(process.cwd(), FILE)}`);
    } else {
        console.log('\nTryb raportu - plik NIE został zmieniony. Uruchom z --write, aby zapisać.');
    }
}

main();
