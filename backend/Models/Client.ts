import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Client {
  /* the only place to use ID : Client itself, edit */
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
