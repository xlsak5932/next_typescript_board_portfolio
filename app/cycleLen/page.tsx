'use client'

import React, { useEffect, useState } from 'react'
import styles from './cycleLen.module.css'
import Image from 'next/image'
import { findEducation } from '@/lib/server_logic/education'

const page = () => {
  const [information, setInformation] = useState<any[]>([])

  useEffect(() => {
    const result = async () => {
      const eduInformation = await findEducation()

      setInformation(eduInformation)
    }
    result()
  }, [])

  return (
    <div className="container">
      <h2 className={styles.len__title}>교육 과정</h2>
      <div id={styles.len__box}>
        <div className={styles.len__introduce}>
          <div className={styles.total__box}>
            {information.map((item) => (
              <>
                <div className={styles.left__right__box}>
                  <div className={styles.box__left}>
                    <Image src="/images/len.jpeg" alt="싸이클" width={200} height={150} />
                  </div>
                  <div className={styles.box__right}>
                    <ul>
                      <li>시간 : {item.edu_time} (총 0시간)</li>
                      <li>정원 : {item.edu_person}명</li>
                      <li>교육 : {item.edu_description}</li>
                      <li>대상 : {item.edu_target}</li>
                      <li>교육비 : {item.edu_fee}원</li>
                    </ul>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
