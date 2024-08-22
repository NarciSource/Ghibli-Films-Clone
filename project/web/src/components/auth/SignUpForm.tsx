import { Stack, FormControl, FormLabel, Input, Divider, Button, useToast, FormErrorMessage } from '@chakra-ui/react';
import { SignUpMutationVariables, useSignUpMutation } from '../../generated/graphql';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SignUpFormLayout from './SignUpForm.layout';

export default function SignUpForm(): React.ReactElement {
    const [signUp, { loading }] = useSignUpMutation();
    // from 작업의 재렌더링 최소화
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpMutationVariables>();

    const toast = useToast();
    const navigate = useNavigate();

    const onSubmit = (data: SignUpMutationVariables) => {
        const { signUpInput } = data;

        signUp({ variables: { signUpInput } })
            .then((res) => {
                if (res.data?.signUp) {
                    toast({ title: '회원가입을 환영합니다!', status: 'success' });
                    navigate('/');
                } else {
                    toast({
                        title: '회원가입 도중 문제가 발생했습니다.',
                        status: 'error',
                    });
                }
            })
            .catch((err) => {
                toast({ title: '이메일 또는 아이디가 중복됩니다.', status: 'error' });
                return err;
            });
    };

    return (
        <SignUpFormLayout>
            <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
                {/* 필드 유효성 검사, isInvalid 값으로 판단 */}
                <FormControl isInvalid={!!errors.signUpInput?.email}>
                    {/* isInvalid = useForm의 errors값 */}
                    <FormLabel>이메일</FormLabel>
                    {/* register를 통해 input 필드를 reactForm에 등록 */}
                    <Input
                        type="email"
                        {...register('signUpInput.email', {
                            required: '이메일을 입력해주세요.',
                        })}
                        placeholder="example@example.com"
                    />
                    {/* 유효성 검사 통과하지 못했을 때 에러 메시지 */}
                    <FormErrorMessage>{errors.signUpInput?.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.signUpInput?.username}>
                    <FormLabel>아이디</FormLabel>
                    <Input
                        type="text"
                        {...register('signUpInput.username', {
                            required: '아이디를 입력해주세요.',
                        })}
                        placeholder="example"
                    />
                    <FormErrorMessage>{errors.signUpInput?.username?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.signUpInput?.password}>
                    <FormLabel>비밀번호</FormLabel>
                    <Input
                        type="password"
                        {...register('signUpInput.password', {
                            required: '암호를 입력해주세요.',
                            minLength: { value: 8, message: '8자리 이상이어야 합니다.' },
                        })}
                        placeholder="8자 이상의 영문, 숫자, 특수문자"
                    />
                    <FormErrorMessage>{errors.signUpInput?.password?.message}</FormErrorMessage>
                </FormControl>

                <Divider />
                <Button type="submit" isLoading={loading} colorScheme="teal">
                    계정 생성
                </Button>
            </Stack>
        </SignUpFormLayout>
    );
}
