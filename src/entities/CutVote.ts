import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Cut } from './Cut';
import { User } from './User';

@ObjectType()
@Entity()
export class CutVote extends BaseEntity {
    @PrimaryColumn()
    @Field(() => Int)
    userId: number;

    @PrimaryColumn()
    @Field(() => Int)
    cutId: number;

    @Field(() => Cut)
    cut: Cut;

    @ManyToOne(() => User, (user) => user.cutVotes)
    @Field(() => User)
    user: User;
}
