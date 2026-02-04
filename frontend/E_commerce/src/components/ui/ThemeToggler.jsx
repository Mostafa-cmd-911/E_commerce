import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@context/ThemeContextProvider'
import { useRef } from 'react'
import { flushSync } from 'react-dom'
import { IconButton } from '@mui/material'

export function ThemeToggler() {
  const { theme, toggleTheme } = useTheme()
  const buttonRef = useRef(null)
  const isDark = theme === 'dark'

  const handleToggle = () => {
    const { left, top, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    )

    if (!document.startViewTransition) {
      toggleTheme()
      return
    }

    document
      .startViewTransition(() => {
        flushSync(() => {
          toggleTheme()
        })
      })
      .ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
  }

  return (
    <>
      <IconButton
        className="border-divider relative h-8 w-8 border! border-zinc-300! bg-zinc-200! transition-colors duration-300 hover:bg-zinc-300! dark:border-zinc-600! dark:bg-zinc-800! dark:hover:bg-zinc-700!"
        ref={buttonRef}
        onClick={handleToggle}
      >
        {isDark ? <Moon size={18} /> : <Sun size={18} />}
      </IconButton>
    </>
  )
}
