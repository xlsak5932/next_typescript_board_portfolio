'use client'

import React, { useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { getToken } from 'next-auth/jwt'

const Header = (props: any) => {
  // const { data: session } = useSession() // pre-fetch된 session
  const searchParams = useSearchParams()
  const search = searchParams.get('callbackUrl')
  // console.log('data >>> ', session)
  const kakaoLogin = () => {
    console.log('process.env.KAKAO_CLIENT_ID >>> ', process.env.KAKAO_CLIENT_ID)
    signIn(
      'kakao',
      {
        redirect: true, // 로그인 실패 시 새로고침 여부
        callbackUrl: search ? search : '/',
      },
      { prompt: 'login' }
    )
  }

  // 로그인하면 session 영역 확인
  // useEffect(() => {
  //   console.log('session: ', props.session)
  //   if (props.session?.user) {
  //     console.log('session.user.user.image: ', props.session.user.image)
  //   }
  // }, [props.session])

  // console.log('props.session.idx: ', props.session.user.idx)
  // console.log('props.session.name: ', props.session.user.name)
  // console.log('props.session.email: ', props.session.user.email)
  // console.log('props.session.img: ', props.session.user.img_url)
  // const userImage = props.session.user.image
  // console.log('User Image URL:', userImage ? userImage : 'Image URL not available')

  return (
    <div id="header">
      <div className="container">
        <div className="header__top__container">
          <div className="header__top__left">
            <Link href={'/'}>next, typescript 게시판 포트폴리오</Link>
          </div>
          <div className="header__top__right">
            <ul>
              {props.session && props.session.user && props.session.user.email ? (
                <>
                  <li className="logout">
                    <button onClick={() => signOut()}>카카오 로그아웃</button>
                  </li>
                  <li>
                    <Link href="/mypage">개인정보</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button onClick={kakaoLogin}>카카오 로그인</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* {props.session.user.email === undefined ? ( */}
      <div className="header__bottom__container">
        <div id="nav">
          <ul>
            <li>
              {props.session && props.session.user && props.session.user.user_type ? (
                props.session.user.user_type === 'admin' ? (
                  <Link href={'../lessonApp'}>레슨 신청(관리자)</Link>
                ) : (
                  <Link href={'../lessonApp'}>레슨 신청(유저)</Link>
                )
              ) : (
                <Link href={'../lessonApp'}>레슨 신청</Link>
              )}
            </li>
            <li>
              <Link href={'../notice'}>공지사항</Link>
            </li>
            <li>
              <Link href={'../event'}>이벤트</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
