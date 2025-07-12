"use client";

import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { Forms, FormsInput } from "@/components/forms";
import { LoginSchema } from "../schema";

export function LoginForm() {
  // const { mutate: login } = useMutation({
  //   mutationFn: (form: z.infer<typeof LoginSchema>) => postLogin(form),
  //   onMutate: () => <Loading />,
  //   onSuccess: (data) => {
  //     const userData = data.loginInfo;
  //     // zustand 전역 상태 관리 저장
  //     saveUser({
  //       ...userData,
  //       email: `${userData.loginID}.owlsystems.co.kr`,
  //       hireDate: new Date(userData.hireDate),
  //       profileImage: data.profileUrl,
  //     });

  //     saveNeedA2HS(true); //웹앱 설치 유도 알림 켜기

  //     router.push("/"); // 홈으로 이동
  //   },
  //   onError: (error: AxiosError) => {
  //     if (error.response?.status === 500)
  //       alert("서버 내부 오류입니다. 관리자에게 문의해 주세요.");
  //     else {
  //       alert("아이디와 비밀번호를 다시 한번 확인해주세요.");
  //     }
  //   },
  // });

  return (
    <Forms
      schema={LoginSchema}
      // onSubmit={login}
      className="[&_button[type='submit']]:w-full"
    >
      <FormsInput type="text" name="email" label="이메일" autoFocus />
      <FormsInput type="password" name="password" label="비밀번호" />
      <RippleButton type="submit">로그인</RippleButton>
    </Forms>
  );
}
