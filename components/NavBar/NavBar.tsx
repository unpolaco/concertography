'use client'
import { FC } from 'react'
import styles from './NavBar.module.css'
import Link from 'next/link'
import { Icon } from 'semantic-ui-react'

interface NavBarParams {
    about?: boolean;
    home?: boolean;
}

export const NavBar: FC<NavBarParams> = ({ about, home }) => {
    return (
        <div className={styles.buttonWrapper}>
            {
                about &&
                <Link className={styles.button} href="/about">
                    <Icon name='info' size='big' />
                </Link>
            }
            {
                home &&
                <Link className={styles.button} href="/">
                    <Icon name='home' size='big' />
                </Link>
            }
        </div>
    )
}

