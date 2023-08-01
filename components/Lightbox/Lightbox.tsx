'use client'

import Image from "next/image"
import { FC, useEffect, useRef, useState } from "react"

interface LightboxProps {
  imagePaths: string[]
}

export const Lightbox: FC<LightboxProps> = ({ imagePaths }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  let timeoutRef = useRef<NodeJS.Timeout | null>(null)

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
      default:
        break;
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => {
      goForward(currentIndex)
    }, 3000)

    window.addEventListener('keydown', keyboardHandler)
    return () => {
      resetTimeout()
      window.removeEventListener('keydown', keyboardHandler)
    }
  }, [currentIndex])

  const currentImgSrc = (currentIndex: number, imagePaths: string[]) => `https://res.cloudinary.com/dalhkr6p8/image/upload/v1688113468/${imagePaths[currentIndex]}`

  const goForward = (currentIndex: number) => {
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
      <button onClick={() => goBack(currentIndex)} disabled={isButtonDisabled('prev')}>back</button>
      <Image
        src={currentImgSrc(currentIndex, imagePaths)}
        alt='concert'
        width={800}
        height={600}
      />
      <button onClick={() => goForward(currentIndex)} disabled={isButtonDisabled('next')}>next</button>
    </div>
  )
}