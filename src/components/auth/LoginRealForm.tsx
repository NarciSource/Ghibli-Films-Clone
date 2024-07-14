import { Box, Stack, Button, Divider, FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

export default function LoginRealForm(): React.ReactElement {
    return (
        <Box>
            <Stack as="form">
                <FormControl>
                    <FormLabel>이메일 또는 아이디</FormLabel>
                    <Input type="emailOrUsername" placeholder="이메일 또는 아이디를 입력하세요" />
                    <FormErrorMessage></FormErrorMessage>
                </FormControl>

                <FormControl>
                    <FormLabel>암호</FormLabel>
                    <Input type="password" placeholder="********" />
                    <FormErrorMessage></FormErrorMessage>
                </FormControl>

                <Divider />

                <Button type="submit">로그인</Button>
            </Stack>
        </Box>
    );
}
