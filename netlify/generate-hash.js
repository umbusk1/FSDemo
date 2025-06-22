const crypto = require("crypto");

exports.handler = async (event) => {
  const { user_id } = JSON.parse(event.body);

  // ¡Pon tu secret key aquí! (guárdala como variable de entorno en producción)
  const secret = process.env.CHATBASE_SECRET_KEY;

  if (!user_id || !secret) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Faltan parámetros o secret key" }),
    };
  }

  const user_hash = crypto.createHmac("sha256", secret)
    .update(user_id)
    .digest("hex");

  return {
    statusCode: 200,
    body: JSON.stringify({ user_hash }),
  };
};
