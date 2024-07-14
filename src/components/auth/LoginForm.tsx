import { Stack, Text, Heading, Box } from '@chakra-ui/react';
import LoginRealForm from './LoginRealForm';

export default function LoginForm(): React.ReactElement {
    return (
        <Stack>
            <Stack>
                <Heading>지브리 명장면 프로젝트</Heading>
                <Text>감상평과 좋아요를 남기세요!</Text>
            </Stack>
            <Box>
                <LoginRealForm />
            </Box>
        </Stack>
    );
}
