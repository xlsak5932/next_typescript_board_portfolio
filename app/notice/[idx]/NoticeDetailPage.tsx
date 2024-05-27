import NoticeComponent from '@/app/notice/page'
import { fetchNoticeDetail } from '@/lib/server_logic/notice'

export default async function NoticeDetailPage({ params }: { params: { idx: string } }) {
  const noticeResult = await fetchNoticeDetail(Number(params.idx))
  return (
    <div>
      <NoticeComponent noticeResult={noticeResult} />
    </div>
  )
}
