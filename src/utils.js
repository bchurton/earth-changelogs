// code to get the latest .json file from the changelogs folder
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function latestChangelog() {
    const changelogFiles = fs.readdirSync(join(__dirname, '/changelogs'));
    const latestChangelog = changelogFiles.sort().reverse()[0];
    const changelog = JSON.parse(fs.readFileSync(join(__dirname, `/changelogs/${latestChangelog}`), 'utf8'));
    return changelog;
}

export function getChangelog(version) {
    if (!version.match(/^\d+\.\d+\.\d+$/)) return null;
    const changelog = JSON.parse(fs.readFileSync(join(__dirname, `/changelogs/${version}.json`), 'utf8'));
    return changelog;
}

export function listChangelogs() {
    const changelogFiles = fs.readdirSync(join(__dirname, '/changelogs'));
    return changelogFiles.filter(file => file.match(/^\d+\.\d+\.\d+\.json$/)).map(file => file.replace('.json', '')).sort().reverse();
}