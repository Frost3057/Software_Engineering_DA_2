const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Login Page Tests', function() {
    let driver;
    
    before(async function() {
        this.timeout(10000);
        console.log('\n🚀 Starting Selenium UI Tests...\n');
        driver = await new Builder().forBrowser('chrome').build();
    });
    
    after(async function() {
        await driver.quit();
        console.log('\n✅ Selenium Testing Complete!\n');
    });
    
    // TC_001: Login Functionality - Verify login with valid credentials
    it('TC_001: Should login successfully with valid credentials', async function() {
        this.timeout(10000);
        
        console.log('TC_001: Testing valid login credentials...');
        
        await driver.get('http://localhost:3000');
        console.log('   ✓ Navigated to login page');
        
        // Enter valid credentials
        await driver.findElement(By.id('username')).sendKeys('admin');
        await driver.findElement(By.id('password')).sendKeys('password123');
        console.log('   ✓ Entered valid credentials (admin/password123)');
        
        // Click login button
        await driver.findElement(By.css('button[type="submit"]')).click();
        console.log('   ✓ Clicked login button');
        
        // Wait for dashboard to load
        await driver.wait(until.urlContains('/dashboard'), 5000);
        console.log('   ✓ Redirected to dashboard');
        
        // Verify dashboard loaded
        const title = await driver.getTitle();
        expect(title).to.equal('Dashboard');
        console.log('   ✓ Page title: ' + title);
        
        const welcomeMessage = await driver.findElement(By.css('.welcome-message')).getText();
        expect(welcomeMessage).to.contain('Welcome to your Dashboard!');
        console.log('   ✓ Welcome message: ' + welcomeMessage);
        
        console.log('✅ TC_001: PASS - Dashboard loaded correctly\n');
    });
    
    // TC_002: Invalid Login - Attempt login with incorrect password
    it('TC_002: Should show error message with invalid credentials', async function() {
        this.timeout(10000);
        
        console.log('TC_002: Testing invalid login credentials...');
        
        await driver.get('http://localhost:3000');
        console.log('   ✓ Navigated to login page');
        
        // Enter invalid credentials
        await driver.findElement(By.id('username')).sendKeys('admin');
        await driver.findElement(By.id('password')).sendKeys('wrongpassword');
        console.log('   ✓ Entered invalid credentials (admin/wrongpassword)');
        
        // Click login button
        await driver.findElement(By.css('button[type="submit"]')).click();
        console.log('   ✓ Clicked login button');
        
        // Wait for error message to appear
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('errorMessage'))), 5000);
        console.log('   ✓ Error message appeared');
        
        // Verify error message is displayed
        const errorMessage = await driver.findElement(By.id('errorMessage'));
        const isDisplayed = await errorMessage.isDisplayed();
        expect(isDisplayed).to.be.true;
        
        const errorText = await errorMessage.getText();
        expect(errorText).to.equal('Invalid credentials');
        console.log('   ✓ Error message text: ' + errorText);
        
        // Verify we're still on login page
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.contain('localhost:3000');
        console.log('   ✓ Remained on login page (no redirect)');
        
        console.log('✅ TC_002: PASS - Error message displayed correctly\n');
    });
});