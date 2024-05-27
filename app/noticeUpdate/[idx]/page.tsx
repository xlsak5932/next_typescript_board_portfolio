import { fetchNoticeDetail } from '@/lib/server_logic/notice'
import React from 'react'
import Component from '../component'

export default async function NoticeDetailPage({ params }: { params: { idx: string } }) {
  const noticeResult = await fetchNoticeDetail(Number(params.idx))

  return (
    <div>
      <Component noticeResult={noticeResult} />
    </div>
  )
}
