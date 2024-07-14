import { ObjectType, Field } from 'type-graphql';

@ObjectType({ description: '필드 에러 타입' })
export class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;

    constructor(field: string, message: string) {
        this.field = field;
        this.message = message;
    }
}
