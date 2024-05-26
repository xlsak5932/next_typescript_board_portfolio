'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './popup.module.css'

const Popup = () => {
  const [opacity, setOpacity] = useState(1)
  const [visibility, setVisibility] = useState<'visible' | 'hidden'>('visible')

  // 팝업창 opacity "닫기"
  // const ClickPopupCancel = () => {
  //   console.log('팝업 닫기')
  //   // setOpacity(opacity * 0)
  //   setOpacity(0)
  //   setVisibility('hidden')
  // }

  useEffect(() => {
    const popupNoShow = localStorage.getItem('popupNoShow')
    if (popupNoShow === 'true') {
      // setOpacity(0)
      setVisibility('display:none')
    }
  }, [opacity, visibility])

  const clickPopupCancel = () => {
    console.log('팝업 닫기')
    setOpacity(0)
    setVisibility('hidden')
    localStorage.setItem('popupNoShow', 'true') // "오늘 하루 안 보기" 옵션을 선택한 경우 로컬 스토리지에 저장
  }

  return (
    // <!-- 메인화면의 "팝업창" -->
    <div className={styles.popup} style={{ opacity, visibility }}>
      <div className={styles.popup__box}>
        <h2>메인화면에 보여줄 팝업창 제목!</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam libero possimus inventore dolores tempora magnam est, quod recusandae
          officiis rem voluptatem adipisci? A atque in tempore, fugiat labore repellendus iusto.
        </p>
      </div>
      <div className={styles.popup__flex}>
        <div className={styles.popup__day}>
          <input type="checkbox" id={styles.day__check} />
          <label className={styles.day__check} htmlFor={styles.day__check}>
            오늘 하루 안 보기
          </label>
        </div>
        <Link href="#" className={styles.popup__close} onClick={clickPopupCancel}>
          닫기
        </Link>
      </div>
    </div>
  )
}

export default Popup
