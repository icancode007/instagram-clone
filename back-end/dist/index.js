"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 8080; // default port to listen
// define a route handler for the default home page
app.get("/root", (req, res) => {
    const users = [
        { user1: "jonas@testing.com" },
        { user2: "jose@testing.com" },
        { user3: "pedro@testing.com" }
    ];
    res.json(users);
});
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map