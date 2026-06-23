const Asena = require("../Utilis/events");

Asena.addCommand(
  { pattern: "jid", fromMe: true },
  async (message) => {
    await message.sendMessage(message.jid);
  }
);