const Asena = require("../Utilis/events");

const SOURCE_GROUP = "120363428389082831@g.us";
const TARGET_GROUP = "120363424960811886@g.us";

Asena.addCommand(
  { on: "image", fromMe: false },
  async (message) => {
    try {
      if (message.jid !== SOURCE_GROUP) return;

      await message.sendMessage(
        `📸 Image detected in source group`
      );

      // We'll add actual forwarding after confirming image events work
    } catch (err) {
      console.log(err);
    }
  }
);