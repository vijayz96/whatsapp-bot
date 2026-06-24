const chalk = require("chalk");
const { WAConnection } = require("@adiwajshing/baileys");
const { StringSession } = require("./whatsasena/");
const QRCode = require("qrcode");
const fs = require("fs");

async function whatsAsena() {
    const conn = new WAConnection();
    conn.version = [2,2119,6];

    const Session = new StringSession();
    conn.logger.level = "warn";

    conn.on("connecting", () => {
        console.log(chalk.blue("Connecting to WhatsApp..."));
    });

    conn.on("qr", async (qr) => {
        await QRCode.toFile("./qr.png", qr);
        console.log("✅ QR saved as qr.png");
        console.log("Open qr.png and scan it with WhatsApp");
    });

    conn.on("open", () => {
        const session = Session.createStringSession(
            conn.base64EncodedAuthInfo()
        );

        console.log("=================================");
        console.log("ASENA_SESSION:");
        console.log(session);
        console.log("=================================");

        fs.writeFileSync(
            "config.env",
            `ASENA_SESSION="${session}"`
        );

        process.exit(0);
    });

    await conn.connect();
}

whatsAsena();