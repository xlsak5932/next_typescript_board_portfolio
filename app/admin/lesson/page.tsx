'use client'

import { createLesson } from '@/lib/server_logic/lesson'
import { useForm } from 'react-hook-form'

// 리액트 훅 폼 사용함.. 설치 후 사용
export default function CreateLessonPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: 'onChange',
  })
  async function lessonBtn() {
    await createLesson('')
  }
  async function mySubmit(data: any) {
    const lessonInfo = {
      lesson_type: 'lesson',
      current_people: 0,
      class_number: 1,
      class_time: `${data.date1} ~ ${data.date2}`,
    }

    console.log('data >>> ', data)
    createLesson(lessonInfo)
  }
  return (
    <>
      <form onSubmit={handleSubmit(mySubmit)}>
        <input type="time" {...register('date1')} />
        <input type="time" {...register('date2')} />
        <button type="submit">레슨 생성</button>
      </form>
    </>
  )
}
