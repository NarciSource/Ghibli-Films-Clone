import { fromPromise } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { refreshAccessToken } from '../auth';
import { apolloClient } from '../createApolloClient';

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        if (graphQLErrors.find((err) => err.message === 'access token expired')) {
            return fromPromise(refreshAccessToken(apolloClient, operation))
                .filter((result) => !!result)
                .flatMap(() => forward(operation));
        }

        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(`[GraphQL error]: ${operation.operationName}
                Message: ${message}, Query: ${path}, Location: ${JSON.stringify(locations)}`);
        });
    }
    if (networkError) {
        console.log(`[NetworkError]: ${operation.operationName}
            Message: ${networkError.message}`);
    }
});
export default errorLink;
