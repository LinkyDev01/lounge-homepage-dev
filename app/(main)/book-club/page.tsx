import type { Metadata } from "next"
import Image from "next/image"
import styles from "./page.module.css"
import { StickyApplyButton } from "./_components/sticky-apply-button/sticky-apply-button"
import { ContentTabs } from "./_components/ContentTabs/ContentTabs"
import { ClosingSection } from "./_components/ClosingSection/ClosingSection"

export default function StudyForeignPage() {
  return (
    <>
      <main className={styles.container} data-track-section="독서모임_홈">
        <div className={styles.hero}>
          <Image
            src="/linky-lounge/gallary/h.jpg"
            alt="링키라운지 공간"
            className={styles.heroImage}
            width={600}
            height={400}
            priority
          />
          <div className={styles.heroOverlay}>
            <p className={styles.heroSub}>링키라운지 × 독서모임</p>
            <h1 className={styles.heroTitle}>
              LazyDay<br />BookClub
            </h1>
            <p className={styles.heroBadge}>1기 모집 중</p>
          </div>
        </div>
        <ContentTabs />
        <ClosingSection />
      </main>

      <StickyApplyButton />
    </>
  )
}
