
const fs = require('fs');
const path = require('path');

// Folder to store all files
const folderPath = path.join(__dirname, 'files');

// Create folder if it doesn't exist
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log('📁 Created "files" folder');
}

const filePath = path.join(folderPath, 'demo.txt');

// ==================== FILE OPERATIONS ====================

console.log('🚀 Starting File Operations Exercise...\n');

// 1. CREATE a new file using fs.writeFile()
function createFile() {
    const content = "Hello from Exercise 2!\nThis file was created using Node.js fs.writeFile()\n";

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('❌ Error creating file:', err.message);
            return;
        }
        console.log('✅ File created successfully: demo.txt');
        console.log(`   Location: ${filePath}\n`);
        readFile();        // Move to next operation
    });
}

// 2. READ the file using fs.readFile()
function readFile() {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ Error reading file:', err.message);
            return;
        }
        console.log('📖 File Content:');
        console.log('----------------------------------------');
        console.log(data);
        console.log('----------------------------------------\n');
        appendToFile();
    });
}

// 3. APPEND data to the file using fs.appendFile()
function appendToFile() {
    const newData = `\n--- Appended on ${new Date().toLocaleString()} ---\nThis line was added using fs.appendFile()\n`;

    fs.appendFile(filePath, newData, (err) => {
        if (err) {
            console.error('❌ Error appending to file:', err.message);
            return;
        }
        console.log('📝 Data appended successfully to demo.txt');
        readFileAgain();
    });
}

// 4. READ the file again to show appended content
function readFileAgain() {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ Error reading updated file:', err.message);
            return;
        }
        console.log('📖 Updated File Content:');
        console.log('----------------------------------------');
        console.log(data);
        console.log('----------------------------------------\n');
        deleteFile();
    });
}

// 5. DELETE the file using fs.unlink()
function deleteFile() {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('❌ Error deleting file:', err.message);
            return;
        }
        console.log('🗑️  File deleted successfully: demo.txt');
        console.log('\n🎉 All file operations completed successfully!');
        console.log('Exercise 2 finished.');
    });
}

// ==================== START EXECUTION ====================

// Start the chain of asynchronous operations
createFile();

// Bonus: Synchronous version demonstration (for learning)
console.log('\n💡 Note: All operations above are asynchronous using callbacks.');
console.log('   This follows Node.js non-blocking I/O model.\n');