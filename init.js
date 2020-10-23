const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

const PORT = process.env.PORT || 8000;

const handleListening = () => console.log(`Listening on port ${PORT}`);

app.listen(PORT, handleListening);