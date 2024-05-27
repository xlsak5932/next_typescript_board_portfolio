'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './Section2.module.css'
import { noticeFind, noticeMainLeftFind, noticeMainRightFind } from '@/lib/server_logic/notice'

const Section2 = () => {
  const [noticeLeftMain, setNoticeLeftMain] = useState<any[]>([])
  const [noticeRightMain, setNoticeRightMain] = useState<any[]>([])

  useEffect(() => {
    async function noticeSection() {
      const resultLeft = await noticeMainLeftFind()
      const resultRight = await noticeMainRightFind()

      setNoticeLeftMain(resultLeft)
      setNoticeRightMain(resultRight)
    }
    noticeSection()
  }, [])
  console.log('noticeMain : ', noticeLeftMain)

  return (
    <div id={styles.section2}>
      <div className="container">
        <div className={styles.notice__container}>
          <h2 className={styles.notice__title}>공지사항 + (공지사항 게시판에 글을 쓰면 올라옵니다.)</h2>

          <div className={styles.notice__board__box}>
            <div className={styles.notice__board__left}>
              {noticeLeftMain.map((item, index) => (
                <>
                  <ul>
                    {item.length == 0 ? (
                      '등록 된 글이 없습니다.'
                    ) : (
                      <li>
                        <Link href={`/noticeDetail/${item.idx}`} className={styles.notice__link}>
                          <p key={index} className={styles.section2__title}>
                            {item.title}
                          </p>
                          <p>{item.date}</p>
                        </Link>
                      </li>
                    )}
                  </ul>
                </>
              ))}
            </div>
            <div className={styles.notice__board__right}>
              {noticeRightMain.map((item, index) => (
                <>
                  <ul>
                    <li>
                      <Link href={`/noticeDetail/${item.idx}`} className={styles.notice__link}>
                        <p key={index} className={styles.section2__title}>
                          {item.title}
                        </p>
                        <p>{item.date}</p>
                      </Link>
                    </li>
                  </ul>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Section2
