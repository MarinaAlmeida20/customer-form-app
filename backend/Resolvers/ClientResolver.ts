import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateClientInput, EditClientInput } from "../Inputs/ClientInputs";
import { Client } from "../Models/Client";
import { ClientMongo } from "../mongodb/Models/Client";

@Resolver()
export class ClientResolver {
  // Get all clients
  @Query(() => [Client])
  async clients() {
    return await ClientMongo.find();
  }

  // Get one client
  @Query(() => Client)
  async client(@Arg("id") id: string) {
    // If _id === id return client
    return await ClientMongo.findOne({ _id: id });
  }

  // Create client
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

  // Edit Client
  @Mutation(() => Client)
  async editClient(@Arg("editClientObject") editClientObject: EditClientInput) {
    const client = { ...editClientObject };

    // If the _id === client.id, return client edited
    await ClientMongo.updateOne({ _id: client.id }, client);

    return client;
  }
}
