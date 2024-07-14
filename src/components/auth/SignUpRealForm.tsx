import { Stack, FormControl, FormLabel, Input, Divider, Button, useToast } from '@chakra-ui/react';
import { SignUpInput, useSignUpMutation } from '../../generated/graphql';

export default function SignUpRealForm(): React.ReactElement {
    const [signUp, { loading }] = useSignUpMutation();
    const toast = useToast();

    const onSubmit = (event: any) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const signUpInput: SignUpInput = {
            email: formData.get('email') as string,
            username: formData.get('username') as string,
            password: formData.get('password') as string,
        };

        signUp({ variables: { signUpInput } }).then((res) => {
            if (res.data?.signUp) {
                toast({ title: '회원가입을 환영합니다', status: 'success' });
            }
        });
    };

    return (
        <Stack as="form" onSubmit={onSubmit}>
            <FormControl>
                <FormLabel>이메일</FormLabel>
                <Input type="email" name="email" placeholder="example@example.com" />
            </FormControl>

            <FormControl>
                <FormLabel>아이디</FormLabel>
                <Input type="text" name="username" placeholder="example" />
            </FormControl>

            <FormControl>
                <FormLabel>비밀번호</FormLabel>
                <Input type="password" name="password" placeholder="8자 이상의 영문, 숫자, 특수문자" />
            </FormControl>

            <Divider />
            <Button type="submit" isLoading={loading}>
                계정 생성
            </Button>
        </Stack>
    );
}
