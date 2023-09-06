import PageLayout from '@/components/PageLayout/PageLayout'
import { Lightbox } from '@/components/Lightbox/Lightbox'
import { initialPhotos } from '@/data/initialPhotos'

export default async function Home() {

  return (
    <PageLayout>
      <Lightbox imagePaths={initialPhotos} />
    </PageLayout>
  )
}
