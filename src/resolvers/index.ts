import { NonEmptyArray } from 'type-graphql';
import CutFieldResolver from './cut/CutField';
import CutMutationResolver from './cut/CutMutation';
import CutQueryResolver from './cut/CutQuery';
import FilmFieldResolver from './film/FilmField';
import FilmQueryResolver from './film/FilmQuery';
import LogoutMutationResolver from './user/mutations/Logout';
import SignupMutationResolver from './user/mutations/SignUp';
import RefreshAccessTokenMutationResolver from './user/mutations/RefreshAccessToken';
import LoginMutationResolver from './user/mutations/Login';
import MeQueryResolver from './user/queries/Me';

export default [
    FilmQueryResolver,
    FilmFieldResolver,

    CutQueryResolver,
    CutMutationResolver,
    CutFieldResolver,

    MeQueryResolver,
    LoginMutationResolver,
    LogoutMutationResolver,
    SignupMutationResolver,
    RefreshAccessTokenMutationResolver,

    // eslint-disable-next-line @typescript-eslint/ban-types
] as NonEmptyArray<Function>;
