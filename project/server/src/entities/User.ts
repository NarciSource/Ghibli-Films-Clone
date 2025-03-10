import { Field, Int, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { CutVote } from './CutVote';
import { CutReview } from './CutReview';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field({ description: '유저 이름' })
    @Column({ unique: true, comment: '유저 이름' })
    username: string;

    @Field({ description: '유저 이메일' })
    @Column({ unique: true, comment: '유저 이름' })
    email: string;

    @Column({ comment: '유저 비밀번호' })
    password: string;

    @Field(() => String, { description: '생성일자' })
    @CreateDateColumn({ comment: '생성일자' })
    createdAt: Date;

    @Field(() => String, { description: '수정일자' })
    @UpdateDateColumn({ comment: '수정일자' })
    updatedAt: Date;

    @OneToMany(() => CutVote, (cutVote) => cutVote.user)
    cutVotes: CutVote[];

    @OneToMany(() => CutReview, (cutReview) => cutReview.user)
    cutReviews: CutReview[];
}
