'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { NavBar } from '@/components/NavBar/NavBar'
import backgroundPhoto from '@/public/assets/backgroundPhoto.jpg'

export default async function About() {
    return (
        <main className={styles.main}>
            <NavBar home />
            <div >
                <article className={styles.pageWrapper}>
                    <h2>Concertography</h2>
                    <p className={styles.text}>Thank you for visiting my page.
                        <br />All photos you can see here were made with ❤️ by myself.
                        <br />Each of these concerts was an amazing experience,
                        <br />I hope that the photos at least partially reflect this feeling.
                        <br />Big thanks to all the bands that are here.
                        <br />
                        <br />Michal Borowski
                        <br /> <a href="mailto:unpolacoo@gmail.com">unpolacoo@gmail.com</a>
                    </p>
                </article>
            </div>
            <Image fill src={backgroundPhoto} alt='error' className={styles.backgroundPhoto} />
        </main>
    )
}