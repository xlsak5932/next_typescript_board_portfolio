import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div id="footer">
      <div className="container">
        <div className="footer__container">
          <div className="footer__left">
            <Link href={'#'}>로고</Link>
          </div>
          <div className="footer__right">
            <ul className="footer__right__first">
              <li>상호 : (주)cyclie 아카데미</li>
              <li>사업자등록번호: 000-00-00000</li>
              <li>통신판매업신고번호: 제0000-서울-0000호</li>
              <li>대표:안교남</li>
              <li>주소: 000 000 000 000</li>
              <li>연락처: 010-7644-3349</li>
            </ul>
            <ul className="footer__right__second">
              <li>
                <Link href={'#'}>이용약관 및 개인정보처리방침</Link>
              </li>
              <li>
                <Link href={'#'}>고객지원</Link>
              </li>
              <li>
                <Link href={'#'}>오시는 길</Link>
              </li>
            </ul>
            <p>© All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
