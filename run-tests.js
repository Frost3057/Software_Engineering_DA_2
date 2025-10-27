const { spawn } = require('child_process');

console.log('Starting test execution...\n');

// Start the server
console.log('Starting server...');
const server = spawn('node', ['server.js'], { stdio: 'pipe' });

// Wait for server to start
setTimeout(() => {
    console.log('Server started on http://localhost:3000\n');
    
    // Run Selenium tests
    console.log('Running Selenium tests...');
    const seleniumTests = spawn('npm.cmd', ['test'], { stdio: 'inherit', shell: true });
    
    seleniumTests.on('close', (code) => {
        console.log(`\nSelenium tests completed with code ${code}\n`);
        
        // Kill server
        server.kill();
        
        console.log('Test execution completed!');
        console.log('\nTo run Postman tests:');
        console.log('1. Start server: npm start');
        console.log('2. Import tests/postman/login-api-tests.json into Postman');
        console.log('3. Run the collection');
    });
}, 2000);

// Handle server output
server.stdout.on('data', (data) => {
    console.log(`Server: ${data}`);
});

server.stderr.on('data', (data) => {
    console.error(`Server Error: ${data}`);
});