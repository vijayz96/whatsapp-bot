const Asena = require("../Utilis/events")

Asena.addCommand(
  { pattern: "testauto", fromMe: true },
  async (message) => {
    await message.sendMessage("✅ AutoRedirect plugin loaded")
  }
)