'use client'
import { FC } from 'react'
import { Icon } from 'semantic-ui-react'
import styles from './PlayButtons.module.css'
import { PlayPopup } from '../PlayPopup/PlayPopup'

interface PlayButtonsProps {
    isPaused: boolean
    duration: number
    setIsPaused: () => void
    setDuration: (duration: number) => void
}

export const PlayButtons: FC<PlayButtonsProps> = ({ isPaused, duration, setIsPaused, setDuration }) => {
    return (
        <div className={styles.buttonsWrapper}>
            <PlayPopup />
            <button className={`${styles.button} ${styles.playButton}`} onClick={() => setIsPaused()}>
                <Icon name={isPaused ? 'play' : 'pause'} />
            </button  >
            <button className={styles.button} onClick={() => setDuration(duration - 1)}>
                <Icon name='minus' />
            </button>
            <span>{duration}s</span>
            <button className={styles.button} onClick={() => setDuration(duration + 1)}>
                <Icon name='plus' />
            </button  >
        </div>
    )
}
