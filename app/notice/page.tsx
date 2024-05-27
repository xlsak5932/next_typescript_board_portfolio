import { noticeFind } from '@/lib/server_logic/notice'
import NoticeListComponent from './noticeListComponent'

export default async function NoticePage() {
  const allNotices = await noticeFind()
  // console.log('allNotices:::', allNotices)

  return <NoticeListComponent notices={allNotices} />
}
