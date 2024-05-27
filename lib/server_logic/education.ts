'use server'

import prisma from '@/prisma/prisma'

interface EDUCATION_INFORMATION {
  time: string
  person: number
  edu: string
  target: string
  fee: string
}

// 레슨 과정 등록하기
export async function createEducation(edoInfor: EDUCATION_INFORMATION) {
  const result = await prisma.education.create({
    data: {
      edu_time: edoInfor.time,
      edu_person: edoInfor.person,
      edu_description: edoInfor.edu,
      edu_target: edoInfor.target,
      edu_fee: edoInfor.fee,
    },
  })

  return result
}

// 레슨 과정 찾기
export async function findEducation() {
  const result = await prisma.education.findMany({})
  return result
}
