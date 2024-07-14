import { Box, Flex } from '@chakra-ui/react';
import CommonLayout from '../components/CommonLayout';
import SignUpForm from '../components/auth/SignUpForm';

export default function SignUp(): React.ReactElement {
    return (
        <Box>
            <CommonLayout>
                <Flex>
                    <SignUpForm />
                </Flex>
            </CommonLayout>
        </Box>
    );
}
