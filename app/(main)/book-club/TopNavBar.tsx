"use client"

import { useEffect, useState } from "react"
import styles from "./TopNavBar.module.css"

const NAV_ITEMS = [
  { label: "소개", href: "#about" },
  { label: "진행방식", href: "#howto" },
  { label: "책", href: "#books" },
  { label: "일정", href: "#schedule" },
  { label: "FAQ", href: "#faq" },
]

export function TopNavBar() {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const ids = NAV_ITEMS.map((item) => item.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`${styles.item} ${activeId === item.href.slice(1) ? styles.active : ""}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
