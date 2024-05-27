'use client'

import React, { ChangeEvent, useState } from 'react'
import styles from './LenAdmin.module.css'
import Image from 'next/image'
import { createEducation } from '@/lib/server_logic/education'
import { useRouter } from 'next/navigation'

const page = () => {
  const [time, setTime] = useState('')
  const [person, setPerson] = useState(0)
  const [edu, setEdu] = useState('')
  const [target, setTarget] = useState('')
  const [fee, setFee] = useState('')
  const router = useRouter()

  function timeFunction(e: ChangeEvent<HTMLInputElement>) {
    setTime(e.target.value)
  }
  function personFunction(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const valueInt = parseInt(value)
    setPerson(valueInt)
  }
  function eduFunction(e: ChangeEvent<HTMLInputElement>) {
    setEdu(e.target.value)
  }
  function targetFunction(e: ChangeEvent<HTMLInputElement>) {
    setTarget(e.target.value)
  }
  function feeFunction(e: ChangeEvent<HTMLInputElement>) {
    setFee(e.target.value)
  }

  async function lenDbsend() {
    const confirmNotice = confirm('레슨 과정을 등록하시겠습니까?')

    if (confirmNotice) {
      const result = {
        time: time,
        person: person,
        edu: edu,
        target: target,
        fee: fee,
      }

      await createEducation(result)
      router.push('/cycleLen')
    }
  }
  return (
    <div className="container">
      <h2 className={styles.len__title}>교육 과정</h2>
      <div id={styles.len__box}>
        <div className={styles.len__introduce}>
          <div className={styles.total__box}>
            <div className={styles.box__left}>
              <Image src="/images/len.jpeg" alt="싸이클" width={200} height={150} />
              <input type="file" className={styles.img__file} accept="image/*" required multiple />
            </div>
            <div className={styles.box__right}>
              <form action={lenDbsend}>
                <ul>
                  <li>
                    시간 : <input type="text" placeholder="00:00 ~ 00:00" value={time} onChange={timeFunction} className={styles.time} />
                  </li>
                  <li>
                    정원 : <input type="number" placeholder="0" value={person} onChange={personFunction} className={styles.person} />
                  </li>
                  <li>
                    교육 : <input type="text" placeholder="교육 내용 입력" value={edu} onChange={eduFunction} className={styles.edu} />
                  </li>
                  <li>
                    대상 : <input type="text" placeholder="대상 내용 입력" value={target} onChange={targetFunction} className={styles.target} />
                  </li>
                  <li>
                    교육비 : <input type="text" placeholder="000,000원" value={fee} onChange={feeFunction} className={styles.fee} />
                  </li>
                </ul>
                <button type="submit" className={styles.register}>
                  등록하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
