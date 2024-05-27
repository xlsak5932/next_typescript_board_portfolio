import React from 'react'
import ViewDetail from './noticeComponent'
import { fetchNoticeDetail, noticeFind, noticeUpdatePlus } from '@/lib/server_logic/notice'
import ViewUpdate from './noticeUpdate'

export default async function NoticeDetailPage({ params }: { params: { idx: string } }) {
  const noticeResult = await fetchNoticeDetail(Number(params.idx))
  const noticeViewsPlus = await noticeUpdatePlus(Number(params.idx), noticeResult?.views)

  console.log('noticeResult:::', noticeResult)
  return (
    <div>
      <ViewDetail noticeResult={noticeResult} />
      <ViewUpdate noticeResult={noticeResult} />
    </div>
  )
}
