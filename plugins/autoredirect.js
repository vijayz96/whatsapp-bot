const Asena = require("../Utilis/events");

const SOURCE_GROUP = "120363428389082831@g.us";
const TARGET_GROUP = "120363424960811886@g.us";
const OWNER_NUMBER = "918589822129@s.whatsapp.net";

// Test command to confirm plugin is loaded
Asena.addCommand(
  { pattern: "autotest", fromMe: true },
  async (message) => {
    await message.sendMessage("✅ AutoRedirect plugin is active!");
  }
);

// Main auto-forward function
Asena.addCommand(
  { on: "image", fromMe: false },
  async (message) => {
    try {
      if (message.jid !== SOURCE_GROUP) return;
      
      await message.client.sendMessage(OWNER_NUMBER, {
        text: "📸 Image detected in source group!"
      });
      
      await message.forward(TARGET_GROUP);
      
      console.log("✅ Image forwarded");
    } catch (err) {
      console.log("❌ Error:", err.message);
    }
  }
);

console.log("✅ Auto-redirect loaded!");