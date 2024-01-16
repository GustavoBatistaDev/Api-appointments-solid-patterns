import app from "./index";

const port = process.env.SERVER_EXPRESS_PORT || 3000;

app.listen(port);
