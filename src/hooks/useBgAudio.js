import { useEffect } from 'react'

export const useBgAudio = (name) => {
    useEffect(() => {
        const audio = document.getElementById(name)
        audio.volume = 0.2
        audio?.play?.()
        return () => {
            console.log('return on pauses')
            audio.currentTime = 0
            audio?.pause?.()
        }
    }, [])
}
