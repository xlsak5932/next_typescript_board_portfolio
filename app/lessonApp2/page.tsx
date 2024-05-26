'use client'

import React, { useEffect, useState } from 'react'
import styles from './lessonApp2.module.css'
import { deleteLesson, findLesson } from '@/lib/server_logic/lesson'
import { useRouter } from 'next/navigation'
import LessonUpdate from './lessonUpdate'

const page = () => {
  const [room, setRoom] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const lessonUserFind = async () => {
      const lessonFind = await findLesson()

      setRoom(lessonFind)
    }
    lessonUserFind()
  }, [])

  console.log('lesson!!!!', room)

  return (
    <div>
      <div id={styles.lesson__section2}>
        <div className="container">
          <div className={styles.lesson__box2}>
            <h2>레슨 신청(유저)</h2>

            {/* <!-- 1클래스 복제본 div__box --> */}
            <div className={styles.lesson__sort__box}>
              <div className={styles.lesson__left__tab}>
                <form>
                  <h2 className={styles.autonomy}>자율 신청</h2>

                  {room.map((item) =>
                    item.lesson_type === 'free' ? (
                      <div className={styles.lesson__left__copy__box}>
                        <p className={styles.lesson__title}>{item.lesson_class}클래스 :</p>

                        <div className={styles.time__box}>
                          <div className={styles.time}>
                            <p className={styles.class__time}>{item.class_time}</p>
                          </div>
                          <div className={styles.ronn__number}>
                            <span className={styles.one}>{item.current_people}명</span>
                            <span className={styles.two}>/</span>
                            <span className={styles.three}>4명</span>
                          </div>
                        </div>

                        <div className={styles.avatar}>
                          <button type="submit" className={styles.lesson__btn__application}>
                            신청하기
                          </button>
                          <button type="button" className={styles.lesson__btn__update}>
                            수정하기.(1)
                          </button>
                          <button
                            type="button"
                            className={styles.lesson__btn__delete}
                            onClick={function lessonDelete() {
                              const confirmDelete = confirm('삭제하시겠습니까?')

                              if (confirmDelete) {
                                const deleteResult = async () => {
                                  await deleteLesson(item.idx)
                                }
                                return deleteResult()
                              }
                            }}
                          >
                            삭제하기
                          </button>
                        </div>
                      </div>
                    ) : (
                      ''
                    )
                  )}
                </form>
              </div>{' '}
              {/* <!--(끝) lesson__left__tab --> */}
              <div className={styles.lesson__right__tab}>
                <form>
                  <h2 className={styles.common}>레슨 신청</h2>

                  {room.map((item) =>
                    item.lesson_type === 'lesson' ? (
                      <>
                        {/* <!-- 1클래스 복제본 div__box --> */}
                        <div className={styles.lesson__right__copy__box}>
                          <p className={styles.lesson__title}>{item.lesson_class}클래스 : </p>

                          <div className={styles.time__box}>
                            <div className={styles.time}>
                              <p className={styles.class__time}>{item.class_time}</p>
                            </div>
                            <div className={styles.ronn__number}>
                              <span className={styles.one}>0명</span>
                              <span className={styles.two}>/</span>
                              <span className={styles.three}>4명</span>
                            </div>
                          </div>

                          <div className={styles.avatar}>
                            <button type="submit" className={styles.lesson__btn__application}>
                              신청하기
                            </button>
                            <button type="button" className={styles.lesson__btn__update}>
                              수정하기(2)
                            </button>
                            <button
                              type="button"
                              className={styles.lesson__btn__delete}
                              onClick={function lessonDelete() {
                                const confirmDelete = confirm('삭제하시겠습니까?')

                                if (confirmDelete) {
                                  const deleteResult = async () => {
                                    await deleteLesson(item.idx)
                                  }
                                  return deleteResult()
                                }
                              }}
                            >
                              삭제하기
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      ''
                    )
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
