'use client'

import React, { ChangeEvent, useState } from 'react'
import styles from './eventWrite.module.css'
import Link from 'next/link'
import { createEvent } from '@/lib/server_logic/event'
import { useRouter } from 'next/navigation'

export default function component(props: any) {
  return (
    <div id={styles.event__write}>
      <div className="container">
        <h2>이벤트 작성 글</h2>

        <div className={styles.event__write__box}>
          <form>
            <p className={styles.event__title}>{props.eventResult.title}</p>
            <p className={styles.event__content}>{props.eventResult.content}</p>

            <div className={styles.btn__box}>
              <Link href={`/eventUpdate/${props.eventResult.idx}`} className={styles.event__regi__btn}>
                수정하기
              </Link>
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
