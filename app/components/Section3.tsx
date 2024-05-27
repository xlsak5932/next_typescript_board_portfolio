'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Section3.module.css'
import { findEvent } from '@/lib/server_logic/event'

const Section3 = () => {
  const [event, setEvent] = useState<any[]>([])

  useEffect(() => {
    async function sectionFunction() {
      const result = await findEvent()
      setEvent(result)
    }
    sectionFunction()
  }, [])
  return (
    <div id={styles.section3}>
      <div className="container">
        <h2 className={styles.event__title}>이벤트 + (이벤트 게시판에 글을 쓰면 올라옵니다.)</h2>
        <div className={styles.event__container}>
          {event.map((item, index) => (
            <>
              {index <= 3 ? (
                <div className={styles.section3__event__write__board}>
                  <div className={styles.section3__board__top}>
                    <img src="/download.jpg" alt="졸라맨" />
                  </div>
                  <div className={styles.section3__board__bottom}>
                    <Link href={`/eventDetail/${item.idx}`}>
                      <p className={styles.bottom__title}>{item.title}</p>
                      <p className={styles.bottom__year}>{item.date}</p>
                    </Link>
                  </div>
                </div>
              ) : (
                ''
              )}
            </>
          ))}

          {/* (끝) .section3__event__write__board */}
        </div>
      </div>
    </div>
  )
}

export default Section3
