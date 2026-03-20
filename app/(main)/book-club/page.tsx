import type { Metadata } from "next"
import Image from "next/image"
import styles from "./page.module.css"
import { StickyApplyButton } from "./sticky-apply-button"
import { TopNavBar } from "./TopNavBar"
import { AboutSection } from "./AboutSection"
import { HowToSection } from "./HowToSection"
import { ScheduleSection } from "./ScheduleSection"
import { RulesSection } from "./RulesSection"
import { BookSection } from "./BookSection"
import { FaqSection } from "./FaqSection"
import { StorySection } from "./StorySection"
import { ClosingSection } from "./ClosingSection"

export default function StudyForeignPage() {
  return (
    <>
      <main className={styles.container} data-track-section="독서모임_홈">
        <Image
          src="/linky-lounge/book-club/book-club-hero.png"
          alt="bookclub hero image"
          className={styles.mainImage}
          width={600}
          height={3000}
          priority
        />
        <TopNavBar />
        <AboutSection />
        <StorySection />
        <HowToSection />
        <RulesSection />
        <ScheduleSection />
        <BookSection />
        <FaqSection />
        <ClosingSection />
      </main>

      <StickyApplyButton />
    </>
  )
}
