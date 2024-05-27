'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import styles from './noticeWrite.module.css'
import { noticeWriteUpdate } from '@/lib/server_logic/notice'
import Link from 'next/link'

export default function Component(props: any) {
  const [title, setTitle] = useState(props.noticeResult.title)
  const [content, setContent] = useState(props.noticeResult.content)
  const router = useRouter()

  console.log('props.noticeResult: ', props.noticeResult)

  const titleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const contentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const dbSend = async (e: FormEvent) => {
    e.preventDefault() // 폼의 기본 동작 막기

    const sendResult = {
      idx: props.noticeResult.idx,
      title: title,
      content: content,
      date: props.noticeResult.date, // 기존 날짜 유지
    }
    console.log('공지사항 글 클릭')
    await noticeWriteUpdate(sendResult)
    router.push('/notice')
    router.refresh() // 페이지 새로고침
  }

  return (
    <div id={styles.notice__write}>
      <div className="container">
        <h2>공지사항 글 수정하기</h2>

        <div className={styles.notice__write__box}>
          <form onSubmit={dbSend}>
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
