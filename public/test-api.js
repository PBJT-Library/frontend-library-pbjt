// Simple test to verify API connection
// Open browser console and run: testAPI()

async function testAPI() {
    try {
        const response = await fetch('http://localhost:3000/books');
        const data = await response.json();
        console.log('✅ API Connection Success!');
        console.log('Books:', data);
        return data;
    } catch (error) {
        console.error('❌ API Connection Failed:', error);
        return null;
    }
}

// Auto-run on page load
window.testAPI = testAPI;
console.log('Test API function loaded. Run testAPI() to test connection.');
