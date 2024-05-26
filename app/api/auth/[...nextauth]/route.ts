import Header from '../../../components/Header'
import { registerUser, fetchUser } from '@/lib/server_logic/user'
import NextAuth, { AuthOptions, CookiesOptions } from 'next-auth'
import KakaoProvider from 'next-auth/providers/kakao'
import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      idx: string
      image?: string // 이미지 URL을 포함시킵니다.
      user_type: string
    } & DefaultSession['user']
  }

  interface User {
    user_type: string
    image?: string // 이미지 URL을 포함시킵니다.
    idx: string
  }
}

const kakaoCustomProvider = KakaoProvider({
  clientId: process.env.KAKAO_CLIENT_ID as string,
  clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
})

const cookies: Partial<CookiesOptions> = {
  sessionToken: {
    name: `next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true,
    },
  },
  csrfToken: {
    name: 'next-auth.csrf-token',
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true,
    },
  },
}

export const authOptions: AuthOptions = {
  providers: [kakaoCustomProvider],
  pages: {
    signIn: '/',
    error: '/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 3, // 3 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 60 * 60 * 24 * 3, // 3 days
  },
  cookies: cookies,
  logger: {
    error(code, message) {
      console.error('logger error', code, message)
    },
    warn(code) {
      console.warn('logger warn', code)
    },
    debug(code, metadata) {
      console.warn('logger debug', { code, metadata })
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const result = await fetchUser(user.email)
      if (result) {
        console.log('회원 가입된 유저')
      } else {
        if (account?.provider === 'kakao') {
          const userinfo = {
            name: user.name,
            img_url: user.image,
            email: user.email,
            user_type: 'user',
          }
          await registerUser(userinfo)
        }
      }
      return true
    },
    async jwt({ token, account, user, profile }) {
      if (account && user) {
        const fetchedUser = await fetchUser(user.email)
        if (fetchedUser) {
          return {
            ...token,
            idx: fetchedUser.idx,
            user_type: fetchedUser.user_type,
          }
        }
      }
      return token
    },
    async session({ session, token }) {
      session.user.idx = token.idx as string
      session.user.user_type = token.user_type as string
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

// import { registerUser, fetchUser } from '@/lib/server_logic/user'
// import { Prisma } from '@prisma/client'
// // import { createUser, selectUser } from '@/lib/serverlogic/user'
// import NextAuth, { AuthOptions, CookiesOptions } from 'next-auth'
// import KakaoProvider from 'next-auth/providers/kakao'

// interface ICustomUser {
//   idx: string
//   user_type: string
// }

// // 👍KakaoProvider를 이용하여 Kakao API에 대한 설정을 한다.
// // providers은 구분자임 "네이버, 카카오, 구글 등"
// // NextAuth 홈페이지 -> Document -> (중간에 있는거)Proviers클릭 -> Kakao 클릭
// const kakaoCustomProvider = KakaoProvider({
//   // Kakao API에 접근하기 위한 클라이언트 아이디. 환경 변수로부터 값을 가져와서 문자열로 형변환한다.
//   // clientId: process.env.KAKAO_CLIENT_ID as string,
//   clientId: '790d683378eb212e6b9f44a735a7f2ad',
//   // Kakao API에 접근하기 위한 클라이언트 시크릿. 환경 변수로부터 값을 가져와서 문자열로 형변환한다.
//   // clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
//   clientSecret: 'couQ8EN9j1gJK49usFdvAGIFwIGhNVpu',
//   // 코드에서는 클라이언트 아이디와 클라이언트 시크릿을 설정하기 위해
//   // 환경 변수에서 값을 가져와 사용하고 있습니다.
//   // 이러한 설정은 보통 API를 호출할 때 필요한 인증 정보를 제공하는 데 사용됩니다.
// })

// const cookies: Partial<CookiesOptions> = {
//   sessionToken: {
//     // 세션 토큰의 쿠키 이름
//     name: `next-auth.session-token`,
//     // 세션 토큰에 대한 옵션
//     options: {
//       httpOnly: true,

//       sameSite: 'lax',

//       path: '/',

//       secure: true, //true(Chrome) & false(Safari)
//     },
//   },

//   // 👍CSRF 공격은 공격자가 사용자의 인증된 세션을 이용하여 사용자가 의도하지 않은 요청을 서버로 보내는 것을 말합니다. 이를 방지하기 위해 CSRF 토큰은 다음과 같은 방식으로 작동합니다:(토큰 생성 / 페이지에 포함 / 요청시 포함 / 검증)
//   // CSRF 토큰에 대한 설정
//   csrfToken: {
//     // CSRF 토큰의 쿠키 이름
//     name: 'next-auth.csrf-token',
//     // CSRF 토큰에 대한 옵션
//     options: {
//       // HttpOnly 옵션 설정 (JavaScript로 쿠키에 접근을 막음)
//       httpOnly: true,
//       // SameSite 옵션 설정 (lax로 설정되어 일부 요청에서만 쿠키 전송)
//       sameSite: 'lax',
//       // 쿠키의 경로 설정
//       path: '/',
//       // Secure 옵션 설정 (HTTPS 연결에서만 쿠키 전송)
//       secure: true, //true(Chrome) & false(Safari)
//     },
//   },
// }

// // 👍AuthOptions : 이 객체는 인증에 관련된 다양한 설정을 포함할 수 있습니다.
// // 여기에는 사용자 인증 제공자 및 해당 옵션, 세션 설정, 쿠키 설정 등이 포함될 수 있습니다.
// // 이 상수는 다른 파일에서 가져와서 NextAuth 인증 구성에 사용될 수 있습니다.
// export const authOptions: AuthOptions = {
//   // 이 코드는 NextAuth 구성의 일부로 사용되는 providers 배열을 설정합니다.
//   // 이 배열은 사용자를 인증하는 데 사용될 여러 인증 제공자를 정의합니다.
//   // 예를 들어, 여기서 kakaoCustomProvider는 카카오 인증을 제공하는 사용자 정의 인증 제공자를 나타냅니다.
//   // 사용자가 카카오를 통해 로그인하고 인증되면 NextAuth는 해당 사용자를 인증하고 적절한 세션을 설정합니다.
//   // providers은 구분자임 "네이버, 카카오, 구글 등"
//   providers: [kakaoCustomProvider],

//   pages: {
//     signIn: '/',
//     error: '/error',
//   },

//   // 세션 관리에 대한 설정을 지정합니다.
//   session: {
//     strategy: 'jwt',
//     // 30 * 24 * 60 * 60, // 30일간 유효
//     // 세션의 최대 수명을 3일로 설정하고 있습니다.
//     maxAge: 60 * 60 * 24 * 3, // 3 days
//   },

//   //.env파일의 NEXTAUTH_SECRET의 이름을 가진 것을 호출 함
//   secret: process.env.NEXTAUTH_SECRET,

//   jwt: {
//     maxAge: 60 * 60 * 24 * 3, // 초단위로 시간 제한 주기
//   },
//   // 🤬쿠키에 대한 설정을 cookies 객체를 통해 지정합니다.
//   cookies: cookies,
//   // 👍로그 출력에 대한 설정을 지정합니다.
//   logger: {
//     // error Function은 에러에 대한 로그를 출력합니다.
//     // code: 에러 코드 또는 식별자를 전달합니다.
//     // message: 에러에 대한 설명이나 메시지를 전달합니다.
//     error(code, message) {
//       console.error('logger error', code, message)
//     },
//     // warn Function은 경고에 대한 로그를 출력합니다.
//     // code: 경고 코드 또는 식별자를 전달합니다.
//     warn(code) {
//       console.warn('logger warn', code)
//     },
//     // debug Function은 디버그 정보에 대한 로그를 출력합니다.
//     // code: 디버그 코드 또는 식별자를 전달합니다.
//     // metadata: 로그에 추가적인 메타데이터를 전달할 수 있습니다. 객체 형태로 전달됩니다.
//     debug(code, metadata) {
//       console.warn('logger debug', { code, metadata })
//     },
//   },
//   // 👍callbackUrl: 로그인 후에 사용자를 리디렉션할 URL을 지정합니다.
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       const result = await fetchUser(user.email)
//       if (result) {
//         console.log('회원 가입된 유저')
//       } else {
//         // providers은 구분자임 "네이버, 카카오, 구글 등"
//         if (account?.provider === 'kakao') {
//           console.log('userrrr: >>>', user)
//           console.log('accountttt: >>>', account)
//           console.log('profileeee: >>>', profile)

//           if (account.provider === 'kakao') {
//             const userinfo = {
//               name: user.name,
//               img_url: user.image,
//               email: user.email,
//               user_type: user.user_type
//             }
//             // ✅server_logic 폴더 안 / user.ts 파일 / registerUser() 함수
//             // ✅registerUser() 함수는 데이터베이스에 데이터를 넣는 prisma코드가 들어감
//             //
//             await registerUser(userinfo)
//           }
//         }
//       }
//       return true
//     },

//     //@ts-ignore d
//     async jwt({ token, account, user, profile, trigger }) {
//       console.log('token >>> ', token)
//       console.log('account >>> ', account)
//       console.log('user >>> ', user)
//       console.log('profile >>> ', profile)

//       // console.log('token.name', token.name)

//       if (account && user) {
//         console.log('JWT account: ', account)
//         console.log('JWT user: ', user)
//         if (account.provider === 'kakao') {
//           // ✅server_logic 폴더 안 / user.ts 파일 / registerUser() 함수
//           // fetchUser() 함수는 데이터베이스에 데이터를 넣는 prisma코드가 들어감
//           const fetchedUser = await fetchUser('email@gmail.com')

//           console.log('fetchedUser: ', fetchedUser)
//           if (fetchedUser) {
//             console.log('fetchedUser2222: ', fetchedUser)
//             return {
//               // 기존의 토큰을 포함시킨다.
//               ...token,
//               idx: fetchedUser.idx,
//               user_type: fetchedUser.user_type,
//               // idx: userIdx.result?.idx,
//               // isNew: userIdx.result?.is_new,
//               // provider: account.provider,
//               // user_type: userIdx.result?.user_type,
//             }
//           }
//         }
//         return {
//           ...token,
//         }
//       }
//     },

//     // interface ICustomUser {
//     //   idx: string
//     //   isNew: boolean
//     //   provider: string
//     //   user_type: string
//     // }

//     // - 비동기 함수 session을 정의합니다. 이 함수는 session과 token 두 개의 매개변수를 받습니다.
//     // - session: 현재 세션에 관련된 정보를 담고 있는 객체입니다.
//     // - token: 현재 사용자에게 할당된 토큰에 관련된 정보를 담고 있는 객체입니다.
//     async session({ session, token }) {
//       console.log('session555 ', session)
//       console.log('token555 ', token)

//       // 👍as는 TypeScript에서 타입 단언(Type Assertion)을 수행하는 키워드입니다.
//       // ㄴ타입 단언은 컴파일러에게 "이 변수는 내가 말하는 타입이다"라고 알려주는 것입니다.
//       // ㄴ일반적으로 TypeScript는 변수의 타입을 추론하여 자동으로 타입을 할당합니다.
//       // ㄴ그러나 때로는 개발자가 컴파일러보다 변수의 타입을 더 정확하게 알고 있는 경우가 있습니다.
//       // ㄴ이런 경우에 as 키워드를 사용하여 변수의 타입을 직접 명시할 수 있습니다.
//       // 👍해당 코드는 TypeScript에서 타입 단언(Type Assertion)을 사용하여
//       // ㄴsession.user를 ICustomUser 타입으로 캐스팅하고,
//       // ㄴ만약 session.user가 존재하지 않는 경우를 대비하여 undefined로 설정하는 것입니다.
//       const user = session.user as ICustomUser | undefined

//       // if (user) {
//       //   console.log('user222: ', user)
//       //   console.log('token22222: ', token)
//       //   user.idx = token.idx as string
//       //   user.user_type = token.user_type as string
//       // }
//       // console.log('session22: ', session)
//       return {
//         //반환해주면, client에서 접근 가능
//         ...session,
//       }
//     },
//   },
// }

// // 👍redirectTo: 사용자가 로그인하지 않은 상태에서 접근한 페이지로 리디렉션할 때 사용됩니다.
// // session: {
// //   redirectTo: '/login',
// // }

// // 👍sessionToken: 세션 토큰 관련 설정으로, 세션 토큰의 이름 및 유효 기간을 설정할 수 있습니다.
// // session: {
// //   sessionToken: {
// //     name: 'session_token',
// //     maxAge: 24 * 60 * 60, // 24시간
// //   },
// // }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }
