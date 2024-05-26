'use server'

import prisma from '@/prisma/prisma'

// title String
// content String
// 글 작성 후 등록하기
export async function createEvent(event_write: any): Promise<any> {
  const result = prisma.event.create({
    data: {
      title: event_write.title,
      content: event_write.content,
      date: event_write.date,
    },
  })

  return result
}

// 글 수정 후 등록하기
export async function createEventUpdate(event_write: any): Promise<any> {
  const result = await prisma.event.update({
    where: {
      idx: event_write.idx,
    },
    data: {
      title: event_write.title,
      content: event_write.content,
    },
  })

  return result
}

export async function findEvent() {
  const result = await prisma.event.findMany({
    orderBy: {
      idx: 'desc',
    },
  })

  return result
}

export async function findUniqueFunction(idx: number) {
  const result = await prisma.event.findUnique({
    where: {
      idx,
    },
  })

  return result
}
