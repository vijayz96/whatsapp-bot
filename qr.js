const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@adiwajshing/baileys');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    
    const sock = makeWASocket({
        printQRInTerminal: false,  // Disable QR
        auth: state,
        browser: ['Chrome', 'Windows', '10.0']
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        // Request pairing code when connection is open
        if (connection === 'open') {
            console.log('✅ Bot connected successfully!');
            console.log(`📱 Bot Number: ${sock.user.id.split(':')[0]}`);
            
            // Check if already registered
            if (!state.creds.registered) {
                console.log('\n📱 Requesting pairing code...');
                const phoneNumber = '918589822129'; // YOUR NUMBER
                
                try {
                    const code = await sock.requestPairingCode(phoneNumber);
                    console.log('\n🔐 ========================================');
                    console.log(`🔐 YOUR PAIRING CODE: ${code}`);
                    console.log('🔐 ========================================');
                    console.log('\n📲 To link your WhatsApp:');
                    console.log('1. Open WhatsApp on your phone');
                    console.log('2. Go to Settings → Linked Devices → Link a Device');
                    console.log('3. Choose "Link with phone number instead"');
                    console.log(`4. Enter this code: ${code}`);
                    console.log('\n✅ Bot will connect after pairing!\n');
                } catch (error) {
                    console.error('❌ Error getting pairing code:', error.message);
                    console.log('⚠️ Please scan the QR code below:\n');
                    if (qr) {
                        qrcode.generate(qr, { small: true });
                    }
                }
            }
        }

        // Show QR as fallback
        if (qr && !state.creds.registered) {
            console.log('\n📱 Scan this QR code with WhatsApp:\n');
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed. Reconnecting:', shouldReconnect);
            if (shouldReconnect) {
                setTimeout(startBot, 3000);
            }
        }
    });

    sock.ev.on('creds.update', saveCreds);
    return sock;
}

startBot().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});