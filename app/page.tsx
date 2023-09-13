import PageLayout from '@/components/PageLayout/PageLayout'
import { Lightbox } from '@/components/Lightbox/Lightbox'
import { initialPhotos } from '@/data/initialPhotos'
import { NavBar } from '@/components/NavBar/NavBar'

export default function Home() {
  return (
    <PageLayout>
      <NavBar about />
      <Lightbox imagePaths={initialPhotos} />
    </PageLayout>
  )
}