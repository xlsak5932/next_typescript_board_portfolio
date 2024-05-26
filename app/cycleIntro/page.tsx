import React from 'react'
import Image from 'next/image'
import styles from './cycleIntro.module.css'

const page = () => {
  return (
    <div>
      <div id={styles.introduce__section}>
        <div className="container">
          <div className={styles.introduce__box}>
            <div className={styles.introduce__box2}>
              <img src="/download.jpg" alt="회사 대표" className={styles.introduce__img} />
            </div>
            <div className={styles.introduce__write}>
              <div>
                <h2>아카데미 소개</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In illo quis mollitia consectetur laboriosam ex aperiam cum, odit commodi
                  doloribus praesentium. Alias non, optio quis dolor eligendi itaque quisquam rem?
                </p>
              </div>

              <div className={styles.company__career}>
                <h2>회사 경력</h2>
                <ol>
                  <li>1.회사의 경력</li>
                  <li>2.회사의 경력</li>
                  <li>3.회사의 경력</li>
                  <li>4.회사의 경력</li>
                  <li>5.회사의 경력</li>
                  <li>6.회사의 경력</li>
                  <li>7.회사의 경력</li>
                  <li>8.회사의 경력</li>
                  <li>9.회사의 경력</li>
                  <li>10.회사의 경력</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
