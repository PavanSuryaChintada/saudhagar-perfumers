import { useSyncExternalStore } from 'react'

// Shared "the loading screen has handed over" flag, so the hero can start
// its entrance at exactly the moment the preloader's image settles into place.
let done = false
const subscribers = new Set()

export function finishIntro() {
  if (done) return
  done = true
  subscribers.forEach((fn) => fn())
}

export function useIntroDone() {
  return useSyncExternalStore(
    (cb) => {
      subscribers.add(cb)
      return () => subscribers.delete(cb)
    },
    () => done,
  )
}
