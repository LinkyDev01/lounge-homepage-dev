"use client"

import { useRef, useState } from "react"
import { AboutSection } from "../AboutSection/AboutSection"
import { HowToSection } from "../HowToSection/HowToSection"
import { RulesSection } from "../RulesSection/RulesSection"
import { BookSection } from "../BookSection/BookSection"
import { StorySection } from "../StorySection/StorySection"
import { FaqSection } from "../FaqSection/FaqSection"
import { ScheduleSection } from "../ScheduleSection/ScheduleSection"
import { BookPreviewStrip } from "../BookPreviewStrip/BookPreviewStrip"
import styles from "./ContentTabs.module.css"

const TABS = [
  { id: "about", label: "모임소개" },
  { id: "howto", label: "진행방식" },
  { id: "books", label: "책소개" },
  { id: "faq", label: "FAQ" },
  { id: "letter", label: "큐레이터노트" },
]

function SectionContent({ id, onSwitchTo }: { id: string; onSwitchTo: (id: string) => void }) {
  switch (id) {
    case "about":
      return (
        <>
          <AboutSection />
          <BookPreviewStrip onSeeAll={() => onSwitchTo("books")} />
          <ScheduleSection />
        </>
      )
    case "howto":
      return (
        <>
          <HowToSection />
          <RulesSection />
        </>
      )
    case "books":
      return <BookSection />
    case "letter":
      return <StorySection />
    case "faq":
      return <FaqSection />
    default:
      return null
  }
}

export function ContentTabs() {
  const [activeTab, setActiveTab] = useState("about")
  const containerRef = useRef<HTMLDivElement>(null)

  function switchTab(id: string) {
    setActiveTab(id)
    containerRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.stickyHeader}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>LazyDay BookClub</span>
        </div>
        <div className={styles.tabList} role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
              onClick={() => switchTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div role="tabpanel">
        <SectionContent id={activeTab} onSwitchTo={switchTab} />
      </div>
    </div>
  )
}
