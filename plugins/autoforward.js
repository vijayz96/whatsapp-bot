const SOURCE_GROUP = "120363428389082831@g.us";
const TARGET_GROUP = "120363424960811886@g.us";

Asena.addCommand(
  {
    on: "image",
    fromMe: false
  },
  async (message) => {
    try {
      if (message.jid !== SOURCE_GROUP) return;

      await message.client.forwardMessage(
        TARGET_GROUP,
        message.data
      );

      console.log("Image forwarded successfully");
    } catch (err) {
      console.log("Forward Error:", err);
    }
  }
);