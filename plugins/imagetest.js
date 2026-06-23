const Asena = require("../Utilis/events");

Asena.addCommand(
  { on: "image", fromMe: false },
  async (message) => {
    await message.sendMessage("📸 Image detected!");
  }
);