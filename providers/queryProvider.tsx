"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const makeQueryClient = (isLoginPage: boolean) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: true, // 요청 error가 errorBoundary에 걸릴 수 있도록 처리
        refetchOnWindowFocus: false, // 윈도우가 다시 포커스되었을때 데이터를 refetch
        refetchOnMount: false, // 데이터가 stale 상태이면 컴포넌트가 마운트될 때 refetch
        retry: 0, // API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
        /*
          SSR에서는 클라이언트에서 즉시 refetch하는 것을 피하기 위해
          staleTime을 0보다 크게 설정하는 것이 좋다.
        */
        staleTime: 60 * 1000,
      },
      mutations: { throwOnError: !isLoginPage }, // 로그인 요청을 제외한 모든 요청 error가 errorBoundary에 걸릴 수 있도록 처리
    },
  });
};

const QueryProvider = ({ children }: PropsWithChildren) => {
  const isLoginPage = usePathname().startsWith("/login");

  let browserQueryClient: QueryClient | undefined = undefined;

  const getQueryClient = () => {
    if (typeof window === "undefined") {
      // Server일 경우, 매번 새로운 queryClient를 만든다.
      return makeQueryClient(isLoginPage);
    } else {
      /*
        Browser일 경우,
        queryClient가 존재하지 않을 경우에만 새로운 queryClient를 만든다.
        React가 새 Client를 만들게 하기 위해 중요하다.
      */
      if (!browserQueryClient)
        browserQueryClient = makeQueryClient(isLoginPage);
      return browserQueryClient;
    }
  };

  // const [client] = useState(
  //   new QueryClient({
  //     defaultOptions: {
  //       queries: {
  //         refetchOnWindowFocus: false, // 윈도우가 다시 포커스되었을때 데이터를 refetch
  //         refetchOnMount: false, // 데이터가 stale 상태이면 컴포넌트가 마운트될 때 refetch
  //         retry: 1, // API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
  //       },
  //     },
  //   })
  // );

  // NOTE: queryClient를 useState를 사용하여 초기화 하면 안된다.
  // suspense boundary가 없을 경우 React의 렌더링이 중단될 수도 있고
  // queryClient 자체를 폐기할 수 도 있다.
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default QueryProvider;
