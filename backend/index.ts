import "reflect-metadata";
import path from "path";

require("dotenv").config({ path: ".env" });

import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { ClientResolver } from "./Resolvers/ClientResolver";

async function main() {
  const schema = await buildSchema({
    resolvers: [ClientResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.ggl"),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen();
  console.log(`🚀  Server ready at: ${url}`);
}

main();
