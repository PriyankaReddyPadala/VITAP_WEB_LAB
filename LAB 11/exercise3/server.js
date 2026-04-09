const EventEmitter = require('events');   // Import events module

// Create an instance of EventEmitter
const myEmitter = new EventEmitter();

console.log('🚀 Event-Driven Programming Demo Started...\n');

// ====================== 1. Register Multiple Listeners for Same Event ======================

// Listener 1: Log user login
myEmitter.on('userLogin', (username, timestamp) => {
    console.log(`✅ Listener 1: User "${username}" logged in at ${timestamp}`);
});

// Listener 2: Send welcome notification
myEmitter.on('userLogin', (username) => {
    console.log(`📧 Listener 2: Sending welcome email to ${username}`);
});

// Listener 3: Update activity log
myEmitter.on('userLogin', (username, timestamp) => {
    console.log(`📊 Listener 3: Activity logged for ${username} at ${timestamp}`);
});

// ====================== 2. Custom Event with Data Passing ======================

myEmitter.on('orderPlaced', (orderId, items, total) => {
    console.log(`🛒 Order Event: Order ID ${orderId}`);
    console.log(`   Items: ${items.join(', ')}`);
    console.log(`   Total Amount: ₹${total}\n`);
});

// ====================== 3. One-time Listener using .once() ======================

myEmitter.once('serverStart', () => {
    console.log('🔥 Server started successfully! (This listener runs only once)\n');
});

// ====================== 4. Error Handling Event (Best Practice) ======================

myEmitter.on('error', (err) => {
    console.error('❌ Error Event Triggered:', err.message);
});

// ====================== 5. Asynchronous Behavior Demonstration ======================

myEmitter.on('dataProcessed', (data) => {
    console.log(`📥 Data received for processing: ${data.filename}`);
    
    // Simulate async operation (non-blocking)
    setTimeout(() => {
        console.log(`✅ Processing completed for ${data.filename} after delay\n`);
    }, 1500);
});

// ====================== Triggering (Emitting) Events ======================

console.log('📢 Triggering Events...\n');

// Emit userLogin event (multiple listeners will respond)
myEmitter.emit('userLogin', 'Dakshita', new Date().toLocaleString());

// Emit orderPlaced event with multiple arguments
myEmitter.emit('orderPlaced', 'ORD-20260408-001', ['Laptop', 'Mouse', 'Keyboard'], 125000);

// Emit serverStart (once listener)
myEmitter.emit('serverStart');

// Emit dataProcessed to show async nature
myEmitter.emit('dataProcessed', { filename: 'report.pdf' });

// Trigger error event
myEmitter.emit('error', new Error('Database connection failed during save'));

// Try emitting serverStart again (once listener won't run again)
console.log('🔄 Trying to emit serverStart again...');
myEmitter.emit('serverStart');

console.log('\n🎉 All events processed. This demonstrates Node.js event-driven architecture!');
console.log('   - Multiple listeners per event');
console.log('   - Passing data via emit()');
console.log('   - Asynchronous behavior with setTimeout');
console.log('   - Proper error handling\n');