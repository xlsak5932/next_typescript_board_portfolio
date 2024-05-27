import react from 'next'
import Section1 from '@/app/components/Section1'
import Section2 from '@/app/components/Section2'
import Section3 from '@/app/components/Section3'
import Popup from '@/app/components/Popup'

export default function Home() {
  return (
    <div>
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  )
}
