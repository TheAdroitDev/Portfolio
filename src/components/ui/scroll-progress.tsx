"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

export type ScrollProgressSection = { id: string; label: string }

const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const
const EASE_OUT = [0.22, 1, 0.36, 1] as const
const SIZE_SPRING = { type: "spring", bounce: 0.16, duration: 0.5 } as const
const LABEL_CROSSFADE = { duration: 0.22, ease: EASE_OUT } as const
const LAYER_FADE = { duration: 0.24, ease: EASE_IN_OUT } as const

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

type Size = { width: number; height: number }

export type ScrollProgressProps = React.ComponentProps<"div"> & {
  sections?: ScrollProgressSection[]
  containerRef?: React.RefObject<HTMLElement | null>
  offset?: number
}

const ScrollProgress = ({
  className,
  sections = [],
  containerRef,
  offset = 120,
  ...props
}: ScrollProgressProps) => {
  const layoutId = React.useId()
  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll(
    containerRef ? { container: containerRef } : undefined
  )
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  const [activeId, setActiveId] = React.useState(sections[0]?.id)
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const scrollLock = React.useRef(false)
  const scrollLockTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  React.useEffect(() => {
    const scroller = containerRef?.current ?? window

    const update = () => {
      if (scrollLock.current) return
      const anchor =
        (containerRef?.current?.getBoundingClientRect().top ?? 0) + offset
      const active = sections.findLast(({ id }) => {
        const top = document.getElementById(id)?.getBoundingClientRect().top
        return top !== undefined && top <= anchor
      })
      setActiveId(active?.id ?? sections[0]?.id)
    }

    update()
    scroller.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      scroller.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [sections, containerRef, offset])

  const label = sections.find((s) => s.id === activeId)?.label

  const labelVersion = React.useRef(0)
  const prevLabel = React.useRef(label)
  if (label !== prevLabel.current) {
    prevLabel.current = label
    labelVersion.current += 1
  }

  const collapsedRef = React.useRef<HTMLDivElement>(null)
  const openRef = React.useRef<HTMLDivElement>(null)
  const labelRef = React.useRef<HTMLSpanElement>(null)
  const rootRef = React.useRef<HTMLDivElement>(null)

  const [collapsedSize, setCollapsedSize] = React.useState<Size>()
  const [openSize, setOpenSize] = React.useState<Size>()
  const [labelWidth, setLabelWidth] = React.useState<number>()

  useIsoLayoutEffect(() => {
    if (sections.length === 0) {
      setCollapsedSize((prev) => prev ?? { width: 38, height: 38 })
      return
    }

    const measure = () => {
      if (labelRef.current) setLabelWidth(labelRef.current.offsetWidth)
      if (collapsedRef.current) {
        setCollapsedSize({
          width: collapsedRef.current.offsetWidth,
          height: collapsedRef.current.offsetHeight,
        })
      }
      if (openRef.current) {
        setOpenSize({
          width: openRef.current.offsetWidth,
          height: openRef.current.offsetHeight,
        })
      }
    }

    measure()
    const ro = new ResizeObserver(measure)
    if (labelRef.current) ro.observe(labelRef.current)
    if (collapsedRef.current) ro.observe(collapsedRef.current)
    if (openRef.current) ro.observe(openRef.current)
    document.fonts?.ready.then(measure).catch(() => {})
    return () => ro.disconnect()
  }, [sections])

  React.useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  React.useEffect(() => () => clearTimeout(scrollLockTimer.current), [])

  const triggerHaptic = () => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(15)
      } catch {
        // ignore
      }
    }
  }

  const selectSection = (id: string) => {
    triggerHaptic()
    scrollLock.current = true
    clearTimeout(scrollLockTimer.current)
    scrollLockTimer.current = setTimeout(
      () => {
        scrollLock.current = false
      },
      reduceMotion ? 0 : 700
    )

    setActiveId(id)
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    })
  }

  const size = open ? openSize : collapsedSize
  const radius = open ? 24 : (collapsedSize?.height ?? 38) / 2
  const squircle = "[corner-shape:squircle]"

  return (
    <>
      {/* Portal backdrop overlay — fixed inset-0 z-[190] so backdrop blur covers the entire viewport */}
      {mounted &&
        open &&
        createPortal(
          <AnimatePresence key="scroll-progress-backdrop-portal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[190] bg-background/25 backdrop-blur-[2px] cursor-pointer"
              onClick={() => {
                triggerHaptic()
                setOpen(false)
              }}
            />
          </AnimatePresence>,
          document.body
        )}

      <div
        ref={rootRef}
        data-slot="scroll-progress"
        className={cn("fixed bottom-5 left-1/2 z-200 -translate-x-1/2", className)}
        {...props}
      >
        <div className="pointer-events-none invisible absolute" aria-hidden>
          <div
            ref={collapsedRef}
            className="inline-flex items-center gap-2.5 py-2 pl-3 pr-4 max-w-55 sm:max-w-[260px]"
          >
            <span className="h-5 w-5 shrink-0" />
            <span
              ref={labelRef}
              className="block max-w-37.5 sm:max-w-[190px] truncate text-xs sm:text-sm font-medium leading-none"
            >
              {label}
            </span>
          </div>
          <div ref={openRef} className="w-max max-w-[90vw] p-1.5">
            {sections.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-2.5 px-3.5 py-2 text-xs sm:text-sm font-medium leading-none whitespace-nowrap"
              >
                <span className="h-1.5 w-1.5 shrink-0" />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {size && (
          <motion.div
            data-slot="scroll-progress-surface"
            className={cn(
              "absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden border border-border/60 bg-background/90 shadow-2xl backdrop-blur-md",
              squircle
            )}
            initial={false}
            animate={{
              width: size.width,
              height: size.height,
              borderRadius: radius,
            }}
            transition={reduceMotion ? { duration: 0 } : SIZE_SPRING}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {open ? (
                <motion.ul
                  key="list"
                  className="absolute inset-0 flex flex-col p-1.5"
                  initial={{
                    opacity: 0,
                    filter: reduceMotion ? undefined : "blur(4px)",
                  }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    filter: reduceMotion ? undefined : "blur(4px)",
                  }}
                  transition={LAYER_FADE}
                >
                  {sections.map((s, i) => {
                    const isActive = s.id === activeId
                    return (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => selectSection(s.id)}
                          className={cn(
                            "relative flex w-full items-center gap-2.5 rounded-[12px] px-3.5 py-2 text-left text-xs sm:text-sm font-medium leading-none transition-colors",
                            squircle,
                            isActive
                              ? "text-foreground"
                              : "text-foreground/55 hover:text-foreground/80"
                          )}
                        >
                          {isActive && (
                            <motion.span
                              layoutId={`${layoutId}-active`}
                              className={cn(
                                "absolute inset-0 rounded-[12px] bg-foreground/10",
                                squircle
                              )}
                              transition={
                                reduceMotion ? { duration: 0 } : SIZE_SPRING
                              }
                            />
                          )}
                          <motion.span
                            className={cn(
                              "relative h-1.5 w-1.5 shrink-0 rounded-full",
                              isActive ? "bg-foreground" : "bg-foreground/30"
                            )}
                            initial={
                              reduceMotion
                                ? undefined
                                : { opacity: 0, y: 4, filter: "blur(3px)" }
                            }
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                              duration: 0.3,
                              ease: EASE_IN_OUT,
                              delay: reduceMotion ? 0 : 0.04 + i * 0.03,
                            }}
                          />
                          <motion.span
                            className="relative whitespace-nowrap"
                            initial={
                              reduceMotion
                                ? undefined
                                : { opacity: 0, y: 4, filter: "blur(3px)" }
                            }
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                              duration: 0.3,
                              ease: EASE_IN_OUT,
                              delay: reduceMotion ? 0 : 0.04 + i * 0.03,
                            }}
                          >
                            {s.label}
                          </motion.span>
                        </button>
                      </li>
                    )
                  })}
                </motion.ul>
              ) : (
                <motion.button
                  key="pill"
                  type="button"
                  onClick={() => {
                    triggerHaptic()
                    setOpen(true)
                  }}
                  aria-label="Show sections"
                  className="absolute inset-0 flex items-center gap-2.5 py-2 pl-3 pr-4 cursor-pointer max-w-full"
                  initial={{
                    opacity: 0,
                    filter: reduceMotion ? undefined : "blur(4px)",
                  }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    filter: reduceMotion ? undefined : "blur(4px)",
                  }}
                  transition={LAYER_FADE}
                >
                  <span className="shrink-0">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 -rotate-90" aria-hidden>
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        strokeWidth="2.5"
                        className="stroke-foreground/15"
                      />
                      <motion.circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="stroke-foreground"
                        style={{ pathLength: progress }}
                      />
                    </svg>
                  </span>

                  <span
                    className="relative h-5 shrink-0 flex items-center overflow-hidden"
                    style={{ width: labelWidth }}
                  >
                    <AnimatePresence initial={false}>
                      {label && (
                        <motion.span
                          key={labelVersion.current}
                          data-slot="scroll-progress-label"
                          className="absolute inset-0 flex items-center truncate text-xs sm:text-sm font-medium leading-none text-foreground w-full"
                          initial={
                            reduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, filter: "blur(1.5px)" }
                          }
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          exit={
                            reduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, filter: "blur(1.5px)" }
                          }
                          transition={LABEL_CROSSFADE}
                        >
                          {label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </>
  )
}

export { ScrollProgress }
export default ScrollProgress
