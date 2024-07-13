import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Film {
    @Field(() => Int, { description: '영화 고유 아이디' })
    id: number;

    @Field({ description: '영화 제목' })
    title: string;

    @Field({ nullable: true, description: '영화 부제목' })
    subtitle?: string;

    @Field({ description: '영화 장르' })
    genre: string;

    @Field({ description: '영화 러닝 타임, minute' })
    runningTime: number; // number 기본은 float

    @Field({ description: '영화 줄거리 및 설명' })
    description: string;

    @Field(() => Int, { description: '제작자 고유 아이디' })
    director_id: number;

    @Field({ description: '포스터 이미지 URL' })
    posterImg: string;

    @Field({ description: '개봉일' })
    release: string;
}

// --SDL--
// type Film {
//     id: Int!
//     title: String
//     subtitle: String
//     genre: String!
//     runningTime: Float!
//     description: String!
//     director_id: Int!
//     posterImg: String!
//     release: String
// }
