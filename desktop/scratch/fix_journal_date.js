// Approach: Copy the DB to a temp file (no lock), fix it there, then swap back
const path = require('path');
const fs   = require('fs');
const Database = require('better-sqlite3');

const srcPath  = path.join(__dirname, '..', 'db', 'stitch.sqlite');
const tmpPath  = path.join(__dirname, '..', 'db', 'stitch_fix_tmp.sqlite');
const bakPath  = path.join(__dirname, '..', 'db', 'stitch_backup.sqlite');

const targetDateMs = new Date('2026-04-01T00:00:00.000Z').getTime(); // 1743465600000
const journalId    = 'mqi8z8uzDAYMnaHqj0PdxTpntr8K2r2M';

try {
    // Step 1: Copy the main db file to a temp file (no locks copied)
    fs.copyFileSync(srcPath, tmpPath);
    console.log('Copied DB to tmp file.');

    // Step 2: Open temp file with better-sqlite3 and fix the date
    const db = new Database(tmpPath);
    
    const before = db.prepare('SELECT id, date FROM account_journal WHERE id = ?').get(journalId);
    console.log('Before (in tmp):', before);

    const info = db.prepare('UPDATE account_journal SET date = ? WHERE id = ?')
                   .run(targetDateMs, journalId);
    console.log('Rows changed:', info.changes);

    const after = db.prepare('SELECT id, date FROM account_journal WHERE id = ?').get(journalId);
    console.log('After (raw in tmp):', after);
    console.log('Interpreted:', new Date(Number(after.date)));

    db.close();

    if (info.changes !== 1) {
        fs.unlinkSync(tmpPath);
        throw new Error('Update did not affect any rows — check the ID.');
    }

    // Step 3: Backup original, replace with fixed version
    if (fs.existsSync(bakPath)) fs.unlinkSync(bakPath);
    fs.copyFileSync(srcPath, bakPath);
    console.log('Backed up original to stitch_backup.sqlite');

    // Attempt to overwrite — this will fail if the original is locked
    fs.copyFileSync(tmpPath, srcPath);
    fs.unlinkSync(tmpPath);

    console.log('\n✅ Done! stitch.sqlite has been updated. Restart the app.');
} catch (e) {
    console.error('Error:', e.message);
    if (fs.existsSync(tmpPath)) {
        console.log('\n⚠️  The fixed database was saved as: db/stitch_fix_tmp.sqlite');
        console.log('    Manually rename it to stitch.sqlite after closing all processes that lock it.');
    }
}
