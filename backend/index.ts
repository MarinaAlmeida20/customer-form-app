import "reflect-metadata";
import path from "path";

require("dotenv").config({ path: ".env" });
import "./mongodb/connect";

import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { ClientResolver } from "./Resolvers/ClientResolver";

// async function main() {
//   const schema = await buildSchema({
//     resolvers: [ClientResolver],
//     emitSchemaFile: path.resolve(__dirname, "schema.ggl"),
//   });

//   const server = new ApolloServer({
//     schema,
//   });

//   const { url } = await server.listen();
//   console.log(`🚀  Server ready at: ${url}`);
// }

// main();

async function main() {
  const schema = await buildSchema({
    resolvers: [ClientResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.ggl"),
  });

  const server = new ApolloServer({
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
