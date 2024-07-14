import { Stack, FormControl, FormLabel, Input, Divider, Button } from '@chakra-ui/react';

export default function SignUpRealForm(): React.ReactElement {
    return (
        <Stack as="form">
            <FormControl>
                <FormLabel>이메일</FormLabel>
                <Input type="email" name="email" placeholder="example@example.com" />
            </FormControl>

            <FormControl>
                <FormLabel>아이디</FormLabel>
                <Input type="text" name="id" placeholder="example" />
            </FormControl>

            <FormControl>
                <FormLabel>비밀번호</FormLabel>
                <Input type="password" name="password" placeholder="8자 이상의 영문, 숫자, 특수문자" />
            </FormControl>

            <Divider />
            <Button type="submit">계정 생성</Button>
        </Stack>
    );
}
