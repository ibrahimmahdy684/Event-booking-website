require("dotenv").config({ path: "./Backend/.env" });

const app = require("./app");

// get port number or default to 5000
const PORT = process.env.PORT || 5000;

// continously listen
app.listen(PORT, () => {
    console.log("Listening to port " + PORT);
});
