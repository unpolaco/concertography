import Image from 'next/image'
import styles from './page.module.css'
import { Form } from '@/components/Form/Form'
import { Lightbox } from '@/components/Lightbox/Lightbox'

export default async function Home() {
  

  return (
    <>
      <main className={styles.main}>
        <div>
          <Lightbox />
          <Form />
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              src={`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1688113468/concerts/Masala_Soundsystem-Ostroda_Reggae_Festiwal-Ostroda-other--04.jpg`}
              fill
              alt='masala soundsystem'
            />
          </div>
        </div>
      </main>
    </>
  )
}
