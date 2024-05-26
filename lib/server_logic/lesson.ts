'use server'
import prisma from '@/prisma/prisma'

// 데이터 불러오기(left)
export async function createLesson(lesson_info: any): Promise<any> {
  // prisma.ts 쓰니간 에러 사라짐

  const result = await prisma.lesson.create({
    data: {
      lesson_class: lesson_info.lesson_class,
      lesson_type: lesson_info.lesson_type,
      current_people: lesson_info.current_people,
      class_number: lesson_info.class_number,
      class_time: lesson_info.class_time,
    },
  })
  return result
}

// 데이터 불러오기(right)
export async function createLesson2(lesson_info: any): Promise<any> {
  // prisma.ts 쓰니간 에러 사라짐

  const result = await prisma.lesson.create({
    data: {
      lesson_class: lesson_info.lesson_class,
      lesson_type: lesson_info.lesson_type,
      current_people: lesson_info.current_people,
      class_number: lesson_info.class_number,
      class_time: lesson_info.class_time,
    },
  })
  return result
}

// admin이 올린거 user한테 데이터 뿌리는 중
export async function findLesson() {
  const result = await prisma.lesson.findMany({})

  console.log('event22: ', result)

  return result
}

// left 자율 신청 삭제.(유저)
export async function deleteLesson(idx: string) {
  const result = await prisma.lesson.delete({
    where: {
      idx,
    },
  })

  return result
}

// left 자율 신청 수정.(유저)
export async function updateLesson(idx: any, update: any) {
  const result = await prisma.lesson.update({
    where: {
      idx,
    },
    data: {
      lesson_class: update.lesson_class,
      lesson_type: update.lesson_type,
      current_people: update.current_people,
      class_number: update.class_number,
      class_time: update.class_time,
    },
  })

  return result
}
