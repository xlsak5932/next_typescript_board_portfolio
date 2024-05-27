'use server'
import prisma from '@/prisma/prisma'
import { promises } from 'dns'

// idx Int @id @default(autoincrement())
//   title String
//   content String
//   date DateTime @default(now())
interface INotice {
  idx: number
  title: string
  content: string
  date: string
}

// noticeWrite 함수의 매개변수를 INotice 인터페이스로 변경합니다.
// 작성 글 등록하기
export async function noticeWrite(notice: INotice) {
  const noticeResult = await prisma.notice.create({
    data: {
      title: notice.title,
      content: notice.content,
      date: notice.date,
    },
  })

  return noticeResult
}

// 수정 글 업데이트
export async function noticeWriteUpdate(notice: INotice) {
  const noticeUpdate = await prisma.notice.update({
    where: {
      idx: notice.idx,
    },
    data: {
      title: notice.title,
      content: notice.content,
    },
  })

  return noticeUpdate
}

// 타입 에러 해결
export interface IFatcehedNotice {
  idx: number
  title: string
  content: string
  views: number
  date: string
}
// notice 게시판 글 조회
export async function noticeFind(): Promise<IFatcehedNotice[]> {
  // findMany: 다 들고옴
  const noticeFindResult = await prisma.notice.findMany({
    orderBy: {
      title: 'desc',
      // title: 'asc',
    },
  })

  return noticeFindResult
}

// notice 조회수 증가
export async function noticeUpdatePlus(idx: number, views: number) {
  const result = await prisma.notice.update({
    where: {
      idx,
    },
    data: {
      views: views + 1,
    },
  })
}

// Main 페이지의 왼쪽 공지사항
export async function noticeMainLeftFind() {
  // findMany: 다 들고옴

  const noticeFindResult = await prisma.notice.findMany({
    skip: 0,
    take: 5,
    orderBy: {
      idx: 'desc',
    },
  })
  console.log('noticeFindResult: ', noticeFindResult)
  return noticeFindResult
}

// Main 페이지의 오른쪽 공지사항
export async function noticeMainRightFind() {
  // findMany: 다 들고옴

  const noticeFindResult = await prisma.notice.findMany({
    skip: 5,
    take: 10,
    orderBy: {
      idx: 'desc',
    },
  })
  console.log('noticeFindResult: ', noticeFindResult)
  return noticeFindResult
}

// 제목 클릭시 이듕 + 수정하기 + 등등에 맞는 idx로 이동
export async function fetchNoticeDetail(idx: number) {
  const noticeDetail = await prisma.notice.findUnique({
    where: {
      idx,
    },
  })

  return noticeDetail
}

// notice 게시글 삭제
export async function noticeDelete(idx: number) {
  const noticeDelete = await prisma.notice.delete({
    where: {
      idx,
    },
  })

  return noticeDelete
}
