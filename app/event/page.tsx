'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './event.module.css'
import { findEvent } from '@/lib/server_logic/event'

export default function NoticeComponent(props: any) {
  const [notices, setNotices] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const noticesPerPage = 6

  useEffect(() => {
    async function fetchNotices() {
      const allNotices = await findEvent()
      setNotices(allNotices)
    }
    fetchNotices()
  }, [])

  // Calculate the current notices to display
  const indexOfLastNotice = currentPage * noticesPerPage
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const totalPages = Math.ceil(notices.length / noticesPerPage)

  // console.log('Event notice: ', notices)
  return (
    <div id={styles.event__section}>
      <div className="container">
        <h2>이벤트</h2>

        <div className={styles.event__box}>
          {currentNotices.map((event) => (
            <div key={event.idx} className={styles.event__write__board}>
              <div className={styles.board__top}>
                <img src="/download.jpg" alt="졸라맨" />
              </div>
              <div className={styles.board__bottom}>
                <Link href={`/eventDetail/${event.idx}`}>
                  <p className={styles.bottom__title}>{event.title}</p>
                  <p className={styles.word}>{event.content}</p>
                  <p className={styles.bottom__year}>{event.date}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.event__box__btn}>
          <ul>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i}>
                <Link href="#" onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? styles.active : ''}>
                  {i + 1}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/eventWrite" className={styles.event__write__btn}>
            글 쓰기
          </Link>
        </div>
      </div>
    </div>
  )
}
