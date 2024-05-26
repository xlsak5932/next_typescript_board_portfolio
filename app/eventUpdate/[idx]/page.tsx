import React, { ChangeEvent, useState } from 'react'
import styles from './eventWrite.module.css'
import Link from 'next/link'
import { createEvent, findUniqueFunction } from '@/lib/server_logic/event'
import { useRouter } from 'next/navigation'
import UpdateComponent from '../eventUpdate'

export default async function NoticeDetailPage({ params }: { params: { idx: string } }) {
  const eventResult = await findUniqueFunction(Number(params.idx))
  return <UpdateComponent eventResult={eventResult} />
}
