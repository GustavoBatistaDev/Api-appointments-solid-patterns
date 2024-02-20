import app from "./index";

const port = process.env.SERVER_EXPRESS_PORT || 3001;

app.listen(port, () => console.log("server", port));
