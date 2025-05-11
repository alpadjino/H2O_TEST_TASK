import jsonServer from "json-server";
import { db } from "./db";
import * as path from "path";
import * as fs from "fs";

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

const routesPath = path.join(__dirname, "routes.json");
const routes = JSON.parse(fs.readFileSync(routesPath, "utf-8"));

server.use(middlewares);
server.use(jsonServer.rewriter(routes));
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Mock API Server is running on port ${PORT}`);
});
