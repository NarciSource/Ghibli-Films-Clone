import { NonEmptyArray } from 'type-graphql';
import CutFieldResolver from './cut/CutField';
import CutMutationResolver from './cut/CutMutation';
import CutQueryResolver from './cut/CutQuery';
import FilmFieldResolver from './film/FilmField';
import FilmQueryResolver from './film/FilmQuery';
import UserMutationResolver from './user/UserMutation';
import UserQueryResolver from './user/UserQuery';

export default [
    FilmQueryResolver,
    FilmFieldResolver,

    CutQueryResolver,
    CutMutationResolver,
    CutFieldResolver,

    UserQueryResolver,
    UserMutationResolver,
    // eslint-disable-next-line @typescript-eslint/ban-types
] as NonEmptyArray<Function>;
