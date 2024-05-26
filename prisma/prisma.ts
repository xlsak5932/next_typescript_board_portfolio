import { PrismaClient } from '@prisma/client'

//API 내용이라 복붙하면 됨.
declare global {
  // global 타입을 확장하여, PrismaClient가 없을 수도 있음을 명시합니다.
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  // 프로덕션 환경에서는 매번 새로운 PrismaClient 인스턴스를 생성합니다.
  prisma = new PrismaClient({ log: ['query'] })
} else {
  // 개발 환경에서는 글로벌 인스턴스를 재사용합니다.
  // 이미 생성된 인스턴스가 있는지 확인하고, 없다면 새로 생성합니다.

  if (!global.prisma) {
    global.prisma = new PrismaClient({ log: ['query'] })
  }
  prisma = global.prisma
}

export default prisma
