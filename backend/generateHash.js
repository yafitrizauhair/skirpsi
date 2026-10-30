
const bcrypt = require("bcryptjs");

async function main() {
  const password = "";
  const hash = await bcrypt.hash(password, 10);

  console.log("Password hash:");
  console.log(hash);
}

main().catch(console.error);
