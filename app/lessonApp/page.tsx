'use client'

import React, { ChangeEvent, useState } from 'react'
import styles from './lessonApp.module.css'
import { createLesson, createLesson2 } from '@/lib/server_logic/lesson'
// damin 폴더 안에 데이터베이스 넣는 코드 있음.
const page = () => {
  // left
  const [time, setTime] = useState('')
  const [time2, setTime2] = useState('')
  // right
  const [timee, setTimee] = useState('')
  const [timee2, setTimee2] = useState('')
  const [lessonClass, setLessonClass] = useState(0)
  const [lessonClass2, setLessonClass2] = useState(0)
  const [lesson_type, setSelect] = useState('')
  const [lesson_type2, setSelect2] = useState('')

  function selecFunction(e: ChangeEvent<HTMLSelectElement>) {
    setSelect(e.target.value)
  }
  function selecFunction2(e: ChangeEvent<HTMLSelectElement>) {
    setSelect2(e.target.value)
  }

  function lessonClassFunction(e: ChangeEvent<HTMLInputElement>) {
    setLessonClass(parseInt(e.target.value))
  }

  function lessonClassFunction2(e: ChangeEvent<HTMLInputElement>) {
    setLessonClass2(parseInt(e.target.value))
  }

  // left time
  function timeFunctionRight(e: ChangeEvent<HTMLInputElement>) {
    setTime(e.target.value)
  }
  function timeFunctionRight2(e: ChangeEvent<HTMLInputElement>) {
    setTime2(e.target.value)
  }

  // right time
  function timeFunctionRightt(e: ChangeEvent<HTMLInputElement>) {
    setTimee(e.target.value)
  }
  function timeFunctionRightt2(e: ChangeEvent<HTMLInputElement>) {
    setTimee2(e.target.value)
  }

  const dbsend = async () => {
    const resultSend = {
      lesson_class: lessonClass,
      lesson_type: lesson_type,
      current_people: 0,
      class_number: 1,
      class_time: `${time} ~ ${time2}`,
    }
    await createLesson(resultSend)
    return resultSend
  }

  const dbsend2 = async () => {
    const resultSend = {
      lesson_class: lessonClass2,
      lesson_type: lesson_type2,
      current_people: 0,
      class_number: 1,
      class_time: `${timee} ~ ${timee2}`,
    }
    await createLesson2(resultSend)

    return resultSend
  }

  return (
    <div>
      <div id={styles.lesson__section}>
        <div className="container">
          <div className={styles.lesson__box}>
            <h2>
              레슨 신청(관리자)
              <br />
              데이터베이스에 데이터를 넣기만 하였습니다.
            </h2>

            <div className={styles.lesson__sort__box}>
              <div className={styles.lesson__left__tab}>
                <form action={dbsend}>
                  <h2 className={styles.autonomy}>자율 신청</h2>
                  {/* 1클래스 복제본 div__box */}
                  <div className={styles.lesson__left__copy__box}>
                    <input type="text" className={styles.lesson__title} value={lessonClass} onChange={lessonClassFunction} placeholder="몇" />
                    <span className={styles.lesson__title__right}>클래스</span>

                    <div className={styles.time__box}>
                      <div className={styles.time}>
                        <input type="time" className={styles.time__left} step="0" value={time} onChange={timeFunctionRight} />
                        <p className={styles.time__center}>:</p>
                        <input type="time" className={styles.time__right} step="0" value={time2} onChange={timeFunctionRight2} />
                      </div>
                      <div className={styles.ronn__number}>
                        <span className={styles.one}>0명</span>
                        <span className={styles.two}>/</span>
                        <span className={styles.three}> 4명</span>
                      </div>
                      <div className={styles.lesson__type}>
                        <select value={lesson_type} onChange={selecFunction}>
                          <option value="레슨 종류">레슨 종류 선택</option>
                          <option value="lesson">레슨 신청</option>
                          <option value="free">자율 신청</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className={styles.lesson__application}>
                      만들기
                    </button>
                  </div>
                </form>

                {/* <div className={styles.more__box}>
                  <button className={styles.lesson__more}>추가하기</button>
                </div> */}
              </div>
              {/* (끝) lesson__left__tab  */}
              <div className={styles.lesson__right__tab}>
                <form action={dbsend2}>
                  <h2 className={styles.common}>레슨 신청</h2>

                  {/* 1클래스 복제본 div__box  */}
                  <div className={styles.lesson__right__copy__box}>
                    <input type="text" className={styles.lesson__title} value={lessonClass2} onChange={lessonClassFunction2} placeholder="몇" />
                    <span className={styles.lesson__title__right}>클래스</span>

                    <div className={styles.time__box}>
                      <div className={styles.time}>
                        <input type="time" className={styles.time__left} step="0" value={timee} onChange={timeFunctionRightt} />
                        <p className={styles.time__center}>:</p>
                        <input type="time" className={styles.time__right} step="0" value={timee2} onChange={timeFunctionRightt2} />
                      </div>
                      <div className={styles.ronn__number}>
                        <span className={styles.one}>0명 </span>
                        <span className={styles.two}>/</span>
                        <span className={styles.three}> 4명</span>
                      </div>
                      <div className={styles.lesson__type}>
                        <select value={lesson_type2} onChange={selecFunction2}>
                          <option value="레슨 종류">레슨 종류 선택</option>
                          <option value="lesson">레슨 신청</option>
                          <option value="free">자율 신청</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className={styles.lesson__application}>
                      만들기
                    </button>
                  </div>
                </form>
                {/* 
                <div className={styles.more__box}>
                  <button className={styles.lesson__more}>추가하기</button>
                </div> */}
              </div>{' '}
              {/* (끝) lesson__right__tab */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
