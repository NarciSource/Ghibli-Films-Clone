import { setContext } from '@apollo/client/link/context';

const authLink = setContext((request, prevContext) => {
    const accessToken = localStorage.getItem('access_token');
    return {
        headers: {
            ...prevContext.headers,
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
    };
});
export default authLink;
