import {
    Box,
    Stack,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react';
import { FieldError, LoginMutationVariables, useLoginMutation, UserWithToken } from '../../generated/graphql';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function LoginRealForm(): React.ReactElement {
    const [login, { loading }] = useLoginMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginMutationVariables>();

    const toast = useToast();
    const navigate = useNavigate();

    const onSubmit = ({ loginInput }: LoginMutationVariables) => {
        login({ variables: { loginInput } })
            .then(({ data }) => {
                if (data?.login as FieldError) {
                    const fieldForm = 'loginInput.';
                    const { field, message } = data?.login as FieldError;

                    setError((fieldForm + field) as Parameters<typeof setError>[0], { message });
                }
                if (data?.login as UserWithToken) {
                    const { user, accessToken } = data?.login as UserWithToken;

                    localStorage.setItem('access_token', accessToken);
                    toast({ title: '환영합니다!', status: 'success' });
                    navigate('/');
                }
            })
            .catch((err) => {
                toast({ title: '로그인 과정에 문제가 생겼습니다.', status: 'error' });
                return err;
            });
    };

    return (
        <Box>
            <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.loginInput?.emailOrUsername}>
                    <FormLabel>이메일 또는 아이디</FormLabel>
                    <Input
                        type="emailOrUsername"
                        {...register('loginInput.emailOrUsername', {
                            required: '이메일 또는 아이디를 입력해주세요.',
                        })}
                        placeholder="example@example.com"
                    />
                    <FormErrorMessage>{errors.loginInput?.emailOrUsername?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.loginInput?.password}>
                    <FormLabel>암호</FormLabel>
                    <Input
                        type="password"
                        {...register('loginInput.password', {
                            required: '암호를 입력해주세요.',
                            minLength: { value: 8, message: '8자리 이상이어야 합니다.' },
                        })}
                        placeholder="********"
                    />
                    <FormErrorMessage>{errors.loginInput?.password?.message}</FormErrorMessage>
                </FormControl>

                <Divider />

                <Button type="submit" isLoading={loading}>
                    로그인
                </Button>
            </Stack>
        </Box>
    );
}
