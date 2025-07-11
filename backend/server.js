// console.log('Starting server.js');
require("dotenv").config(); // Load environment variables from .env file
const app = require("./src/app");

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
//to start server
//when server start app.listen callback ke andar waala execute

//now server can take requests now
