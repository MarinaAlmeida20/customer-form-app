import { Field, ID, InputType } from "type-graphql";

// Create Input
@InputType()
export class CreateClientInput {
  @Field()
  firstName: string;

  @Field()
  surname: string;

  @Field()
  email: string;

  @Field()
  country: string;
}

// Edit Input (needs ID)
@InputType()
export class EditClientInput {
  @Field((type) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  surname: string;

  @Field()
  email: string;

  @Field()
  country: string;
}
