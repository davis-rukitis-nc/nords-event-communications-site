import { useSyncExternalStore } from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener("change", callback)
  return () => mq.removeEventListener("change", callback)
}

/** True when the visitor asked the OS for reduced motion. `serverValue` is used during SSR. */
export function usePrefersReducedMotion(serverValue = true) {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => serverValue,
  )
}
