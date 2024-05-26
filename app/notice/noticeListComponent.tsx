'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import styles from './notice.module.css'
import { IFatcehedNotice } from '@/lib/server_logic/notice'

interface INoticeListComponentProps {
  notices: IFatcehedNotice[]
  onRefresh: () => void
}

export default function NoticeListComponent({ notices, onRefresh }: INoticeListComponentProps) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  const indexOfLastNotice = currentPage * pageSize
  const indexOfFirstNotice = indexOfLastNotice - pageSize
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice)
  const totalPages = Math.ceil(notices.length / pageSize)

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    router.refresh() // 페이지 새로고침
  }, [])

  return (
    <div id={styles.notice__section}>
      <div className="container">
        <div className={styles.notice__box}>
          <h2>공지사항</h2>
          <div className={styles.board__table__box}>
            <table>
              <colgroup>
                <col width="5%" />
                <col width="50%" />
                <col width="10%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>날짜</th>
                  <th>조회수</th>
                </tr>
              </thead>
              <tbody>
                {currentNotices.map((notice, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstNotice + index + 1}</td>
                    <td>
                      <div className={styles.link__center}>
                        <Link href={`noticeDetail/${notice.idx}`} className={styles.notice__title}>
                          {notice.title}
                        </Link>
                      </div>
                    </td>
                    <td>{notice.date}</td>
                    <td>{notice.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.notice__btn}>
            <form>
              <Link href={`/noticeWrite`} className={styles.notice__write__btn}>
                글쓰기
              </Link>

              <ul className={styles.notice__btn__number}>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button type="button" className={currentPage === index + 1 ? styles.active : ''} onClick={() => handlePageClick(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
