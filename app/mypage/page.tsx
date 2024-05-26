'use client'

import { getSession } from 'next-auth/react'
import type { Session } from 'next-auth'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './mypage.module.css'

const page = () => {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession()
      setSession(session)
      console.log('mypage >> session: ', session)
      console.log('mypage >> session user:', session?.user)
      // 세션을 처리하는 로직 추가
    }
    fetchSession()
  }, [])
  return (
    <div id={styles.mypage__section}>
      <div className="container">
        <div className={styles.mypage__box}>
          <h2>개인정보</h2>
          <form>
            <div className={styles.mypage__flex}>
              <div className={styles.mypage__left}>
                <div className={styles.profile}>
                  <img src={session?.user.image} alt={session && session.user && session.user.name ? session.user.name : ''} />
                </div>
              </div>
              <div className={styles.mypage__right}>
                <input
                  type="text"
                  placeholder="이름"
                  className={styles.name}
                  value={session && session.user && session.user.name ? session.user.name : ''}
                />
                <input
                  type="text"
                  placeholder="이메일"
                  className={styles.email}
                  value={session && session.user && session.user.email ? session.user.email : ''}
                />

                <div className={styles.update__btn}>
                  <button type="button" className={styles.cancel} onClick={() => router.push('/')}>
                    돌아가기
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default page
