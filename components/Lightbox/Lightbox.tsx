'use client'
import Image from "next/image"
import { FC, useEffect, useRef, useState } from "react"
import { Icon } from "semantic-ui-react"
import styles from './Lightbox.module.css'
import { PlayButtons } from "../PlayButtons/PlayButtons"

interface LightboxProps {
  imagePaths: string[]
}

export const Lightbox: FC<LightboxProps> = ({ imagePaths }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [duration, setDuration] = useState(5)
  const [isPaused, setIsPaused] = useState(false)

  const handleSetDuration = (duration: number) => setDuration(duration)
  const handlesetIsPaused = () => setIsPaused(!isPaused)

  let timeoutRef = useRef<NodeJS.Timeout | null>(null)
  let imageStyle = 'styles.imageOnLoading'

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }
  const keyboardHandler = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight':
        return goForward(currentIndex)
      case 'ArrowLeft':
        return goBack(currentIndex)
      case ' ':
        event.preventDefault()
        return handlesetIsPaused()
      default:
        break;
    }
  }

  useEffect(() => {
    if (!isPaused) {
      resetTimeout()
      timeoutRef.current = setTimeout(() => {
        goForward(currentIndex)
      }, duration * 1000)
    }

    window.addEventListener('keydown', keyboardHandler)
    return () => {
      resetTimeout()
      window.removeEventListener('keydown', keyboardHandler)
    }
  }, [currentIndex, duration, isPaused])


  const goForward = (currentIndex: number) => {
    imageStyle = 'styles.image'
    if (currentIndex < imagePaths.length - 1) {
      return setCurrentIndex(currentIndex + 1)
    }
    setCurrentIndex(0)
  }
  const goBack = (currentIndex: number) => {
    if (currentIndex > 0) {
      return setCurrentIndex(currentIndex - 1)
    }
    setCurrentIndex(imagePaths.length - 1)
  }

  const isButtonDisabled = (button: 'next' | 'prev') => {
    if (button === 'next' && imagePaths[currentIndex + 1] === undefined)
      return true
    if (button === 'prev' && imagePaths[currentIndex - 1] === undefined)
      return true
    return false
  }

  return (
    <div>
      <button className={`${styles.button} ${styles.buttonLeft}`} onClick={() => goBack(currentIndex)} disabled={isButtonDisabled('prev')}>
        <Icon name='chevron left' size='huge' />
      </button>
      <div className={styles.imageWrapper}>
        {imagePaths.map((imagePath, index) => (
          <Image
            key={index}
            src={`https://res.cloudinary.com/dalhkr6p8/image/upload/v1688113468/${imagePath}`}
            alt='concert'
            fill
            className={`${styles.image} ${index === currentIndex ? styles.active : ''}`}
          />
        ))}
      </div>
      <button className={`${styles.button} ${styles.buttonRight}`} onClick={() => goForward(currentIndex)} disabled={isButtonDisabled('next')}>
        <Icon name='chevron right' size='huge' />
      </button>
      <PlayButtons isPaused={isPaused} duration={duration} setDuration={handleSetDuration} setIsPaused={handlesetIsPaused} />
    </div>
  )
}


