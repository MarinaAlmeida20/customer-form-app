import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Client {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  country: string;

  @Field()
  postcode: string;

  @Field()
  address: string;
}
