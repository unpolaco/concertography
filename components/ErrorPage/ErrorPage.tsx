'use client'
import Image from 'next/image'
import styles from './ErrorPage.module.css'
import errorImage from '@/public/assets/error.jpg'
import Link from 'next/link'

export default function ErrorPage({ errorCode, reset }: { errorCode?: number, reset: () => void }) {
    let message = ''
    switch (errorCode) {
        case 404:
            message = 'Nothing here...'
            break;
        default:
            message = `Something went wrong`
            break;
    }

    return (
        <main className={styles.pageLayout}>
            <div className={styles.wrapper}>
                <h2 className={styles.mainText}>Ups!</h2>
                <h4>{message}</h4>
                <div className={styles.flex}>
                    {errorCode !== 404 ?
                        <>
                            <button className={styles.button} onClick={() => reset()}>Try again</button>
                            <span>or</span>
                        </>
                        : null
                    }
                    <Link className={styles.button} href="/">Go to home page</Link>
                </div>
                <Image fill src={errorImage} alt='error' className={styles.errorPhoto} />
            </div>
        </main>
    )
}