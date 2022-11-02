import { Field, InputType } from "type-graphql";

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
