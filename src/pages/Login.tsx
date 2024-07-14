import { Box, Flex } from '@chakra-ui/react';
import CommonLayout from '../components/CommonLayout';
import LoginForm from '../components/auth/LoginForm';

export default function Login(): React.ReactElement {
    return (
        <Box>
            <CommonLayout>
                <Flex>
                    <LoginForm />
                </Flex>
            </CommonLayout>
        </Box>
    );
}
