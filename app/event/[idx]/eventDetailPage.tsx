import React from 'react'
import EventMain from '@/app/event/page'
import { findUniqueFunction } from '@/lib/server_logic/event'

export default async function EventDetailPage({ params }: { params: { idx: string } }) {
  const eventResult = await findUniqueFunction(Number(params.idx))

  return (
    <div>
      <EventMain eventResult={eventResult} />
    </div>
  )
}
