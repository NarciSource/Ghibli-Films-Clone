import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
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
