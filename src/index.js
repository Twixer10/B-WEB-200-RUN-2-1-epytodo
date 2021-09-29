const express = require("express");
const app = express();
const auth = require("./routes/auth/auth");
const user = require("./routes/user/user");
const todos = require("./routes/todos/todos");
const not_found = require("./middleware/notFound");
const db = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", auth);
app.use("/", user);
app.use("/", todos);

app.use("/", not_found);

app.listen(process.env.PORT, () => {
    console.log('\x1b[32mStarting Project epytodo');
    console.log(`\x1b[33mBackend running at http://localhost:${process.env.PORT}\n\n`);
});
