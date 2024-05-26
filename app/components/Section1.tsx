'use client'

import React from 'react'
import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './Section1.module.css'

const Section1 = () => {
  return (
    <div>
      <div id={styles.section1}>
        <div className={styles.slide__box}>
          <Carousel showArrows={true} autoPlay={true} interval={3000} infiniteLoop={true} showThumbs={false}>
            <div>
              <img src="/images/banner1.jpg" />
            </div>
            <div>
              <img src="/images/banner2.jpg" />
            </div>
            <div>
              <img src="/images/banner3.jpg" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Section1
