import { NonEmptyArray } from 'type-graphql';
import VoteMutationResolver from './cut/mutations/Vote';
import CreateOrUpdateReviewMutationResolver from './cut/mutations/CreateOrUpdateReview';
import CutQueryResolver from './cut/CutQuery';
import CutFieldResolver from './cut/fields/Cut';
import FilmFieldResolver from './film/FilmField';
import FilmQueryResolver from './film/FilmQuery';
import LogoutMutationResolver from './user/mutations/Logout';
import SignupMutationResolver from './user/mutations/SignUp';
import RefreshAccessTokenMutationResolver from './user/mutations/RefreshAccessToken';
import LoginMutationResolver from './user/mutations/Login';
import MeQueryResolver from './user/queries/Me';
import ReviewFieldResolver from './cut/fields/Review';
import DeleteReviewMutationResolver from './cut/mutations/DeleteReview';

export default [
    FilmQueryResolver,
    FilmFieldResolver,

    CutQueryResolver,
    VoteMutationResolver,
    CreateOrUpdateReviewMutationResolver,
    DeleteReviewMutationResolver,
    CutFieldResolver,
    ReviewFieldResolver,

    MeQueryResolver,
    LoginMutationResolver,
    LogoutMutationResolver,
    SignupMutationResolver,
    RefreshAccessTokenMutationResolver,

    // eslint-disable-next-line @typescript-eslint/ban-types
] as NonEmptyArray<Function>;
