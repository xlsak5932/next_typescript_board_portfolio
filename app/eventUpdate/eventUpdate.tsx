'use client'

import React, { ChangeEvent, useState } from 'react'
import styles from './eventWrite.module.css'
import Link from 'next/link'
import { createEvent, createEventUpdate } from '@/lib/server_logic/event'
import { useRouter } from 'next/navigation'

export default function component(props: any) {
  const [title, setTitle] = useState(props.eventResult.title)
  const [content, setContent] = useState(props.eventResult.content)
  const router = useRouter()

  const titleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const contentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const dbsend = async () => {
    const eventResult = {
      idx: props.eventResult.idx,
      title: title,
      content: content,
    }
    await createEventUpdate(eventResult)
    router.push('/event')
  }
  return (
    <div id={styles.event__write}>
      <div className="container">
        <h2>이벤트 글 수정</h2>

        <div className={styles.event__write__box}>
          <form action={dbsend}>
            <input type="text" className={styles.event__title} placeholder="제목을 입력해주세요" value={title} onChange={titleChange} />
            <textarea placeholder="내용을 입력해주세요." value={content} onChange={contentChange}></textarea>
            {/* accept: 입력받을 수 있는 파일의 유형을 지정하는 속성입니다. (text/plain, image/jpeg, audio/mpeg, image/* 등) */}
            <input type="file" className={styles.real_upload} accept="image/jpeg" required multiple />

            <div className={styles.btn__box}>
              <button type="submit" className={styles.event__regi__btn}>
                등록하기
              </button>
              <Link href="/event" className={styles.event__cencel__btn}>
                취소하기
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
