import prisma from '@/prisma/prisma'

interface IUserInfo {
  name: string | null | undefined
  img_url: string | null | undefined
  email: string | null | undefined
}

interface IReturnUser {
  idx: string
  name: string | null
  img_url: string | null
  user_type: string
}

// 데이터 넣기
export async function registerUser(userinfo: IUserInfo) {
  // prisma.ts 쓰니간 에러 사라짐

  const result = await prisma.users.create({
    data: {
      name: userinfo.name,
      img_url: userinfo.img_url,
      email: userinfo.email,
    },
  })
  const returnUserInfo: IReturnUser = {
    idx: result.idx,
    name: result.name,
    img_url: result.img_url,
    user_type: result.user_type,
  }
  // console.log('user.ts의 result: ', result)
  return returnUserInfo
}

// 데이터 가져오기
// export async function fetchUser(email: string): Promise<IReturnUser> {
export async function fetchUser(email: string | undefined | null): Promise<any> {
  const result = await prisma.users.findFirst({
    where: {
      // email: email,
      email,
    },
    select: {
      idx: true,
      name: true,
      img_url: true,
      user_type: true,
    },
  })
  // console.log('가져오기 result: ', result)
  return result
}

// name String?
// email String? @unique
// gender String?
// img_url String?
