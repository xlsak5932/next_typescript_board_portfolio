'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import styles from './noticeWrite.module.css'
import { noticeWrite } from '@/lib/server_logic/notice'
import Link from 'next/link'

const Page = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())

  const titleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const contentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const dbSend = async () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1 // getMonth()는 0부터 시작하므로 1을 더해줌
    const day = currentDate.getDate()

    const sendResult = {
      idx: 5,
      title: title,
      content: content,
      date: `${year}-${month}-${day}`,
    }
    console.log('공지사항 글 클릭')
    await noticeWrite(sendResult)
    router.push('/notice')
    router.refresh() // 페이지 새로고침
  }

  return (
    <div id={styles.notice__write}>
      <div className="container">
        <h2>공지사항 글 쓰기</h2>
        <div className={styles.notice__write__box}>
          <form action={dbSend}>
            <input type="text" className={styles.notice__title} placeholder="제목을 입력해주세요" value={title} onChange={titleChange} />
            <textarea placeholder="내용을 입력해주세요." value={content} onChange={contentChange}></textarea>

            <div className={styles.btn__box}>
              <button type="submit" className={styles.notice__regi__btn}>
                등록하기
              </button>
              <Link href="/notice" className={styles.notice__cancel__btn}>
                취소하기
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page
