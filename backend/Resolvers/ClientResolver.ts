import { Query, Resolver } from "type-graphql";
import { Client } from "../Models/Client";

@Resolver()
export class ClientResolver {
  @Query(() => [Client])
  async clients() {
    return "Hello World!";
  }
}
