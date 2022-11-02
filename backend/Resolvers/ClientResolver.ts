import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateClientInput } from "../Inputs/ClientInputs";
import { Client } from "../Models/Client";
import { ClientMongo } from "../mongodb/Models/Client";

@Resolver()
export class ClientResolver {
  @Query(() => [Client])
  async clients() {
    return await ClientMongo.find();
  }

  @Mutation(() => Client)
  async createClient(
    @Arg("createClientObject") createClientObject: CreateClientInput
  ) {
    const { firstName, surname, email, country } = createClientObject;

    return await ClientMongo.create({
      firstName,
      surname,
      email,
      country,
    });
  }
}
