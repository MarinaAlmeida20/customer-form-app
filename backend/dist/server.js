"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const path_1 = __importDefault(require("path"));
require("dotenv").config({ path: ".env" });
require("./mongodb/connect");
const type_graphql_1 = require("type-graphql");
const apollo_server_1 = require("apollo-server");
const ClientResolver_1 = require("./Resolvers/ClientResolver");
async function main() {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [ClientResolver_1.ClientResolver],
        emitSchemaFile: path_1.default.resolve(__dirname, "schema.ggl"),
    });
    const server = new apollo_server_1.ApolloServer({
        schema,
    });
    const { url, port } = await server.listen({ port: process.env.PORT || 4000 });
    console.log(`
    🚀  Server is running!
    🔉  Listening on port ${port}
    📭  Query at ${url}
  `);
}
main();
