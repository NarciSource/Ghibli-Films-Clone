import { IsString } from 'class-validator';
import { InputType, Field, Int, ArgsType } from 'type-graphql';

@InputType()
export class CreateOrUpdateReviewInput {
    @Field(() => Int, { description: '명장면 번호' })
    cutId: number;

    @Field(() => String, { description: '감상평 내용' })
    @IsString()
    contents: string;
}

@ArgsType()
export class PaginationArgs {
    @Field(() => Int, { defaultValue: 2 })
    take: number;

    @Field(() => Int, { nullable: true })
    skip?: number;

    @Field(() => Int)
    cutId: number;
}
