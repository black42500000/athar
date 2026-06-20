import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Set initial value without synchronously triggering cascade render if possible, 
    // or use a setup function.
    const update = () => setIsMobile(mql.matches);
    update();
    
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  return !!isMobile
}
