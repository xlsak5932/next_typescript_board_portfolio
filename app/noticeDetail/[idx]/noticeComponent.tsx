'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import styles from './noticeWrite.module.css'
import { noticeWrite, noticeFind, noticeDelete } from '@/lib/server_logic/notice'
import Link from 'next/link'
import noticeUpdate from './noticeUpdate'

export default function ViewDetail(props: any) {
  const noticeDetail = props.noticeResult
  const router = useRouter()
  // console.log('noticeDetail: ', noticeDetail)

  async function noticeDelte() {
    const deleteConfirm = confirm('게시글을 정말로 삭제하겠습니까?')

    if (deleteConfirm) {
      await noticeDelete(props.noticeResult.idx)

      router.push('/notice')
      router.refresh() // 페이지 새로고침
      console.log('noticeDelte!!!!!!!!!!')
    }
  }

  function aaaaa() {
    router.push('/')
  }

  return (
    <div id={styles.notice__write}>
      <div className="container">
        <h2>공지사항 글 쓰기</h2>
        <div className={styles.notice__write__box}>
          <form>
            {/* 첫 번째 공지사항만 표시 */}
            <p className={styles.notice__title}>{noticeDetail.title}</p>
            <p className={styles.notice__content}>{noticeDetail.content}</p>

            <div className={styles.btn__box}>
              <Link
                href={`/noticeUpdate/${noticeDetail.idx}`}
                className={styles.notice__regi__btn}
                onClick={() => {
                  noticeUpdate(noticeDetail.idx)
                }}
              >
                수정하기
              </Link>
              <button type="button" className={styles.notice__cancel__btn2} onClick={noticeDelte}>
                삭제하기
              </button>
              <Link href="/notice" type="button" className={styles.notice__cancel__btn}>
                목록보기
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
