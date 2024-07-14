import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import SignUpRealForm from './SignUpRealForm';

export default function SignUpForm(): React.ReactElement {
    return (
        <Stack>
            <Stack>
                <Heading>계정 생성</Heading>
                <Text>환영합니다!</Text>
            </Stack>

            <Box>
                <SignUpRealForm />
            </Box>
        </Stack>
    );
}
