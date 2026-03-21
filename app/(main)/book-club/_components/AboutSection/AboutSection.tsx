"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import styles from "./AboutSection.module.css"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const features = [
  {
    animationSrc: "/lottie/book-reading.json",
    scale: 1.6,
    lead: "책 한 권 들고 앉아요.",
    paragraph: "같은 책, 각자의 밑줄. 테이블 위에서 꺼내 놓아요.",
  },
  {
    animationSrc: "/lottie/interview.json",
    scale: 1,
    lead: "아무나 오진 않아요.",
    paragraph: "전화 15분, 목소리로 먼저 만나고 결이 맞으면 합류해요.",
  },
  {
    animationSrc: "/lottie/group.json",
    scale: 1,
    lead: "8주, 4권, 같은 얼굴들.",
    paragraph: "격주로 링키라운지에서. 대화가 쌓여요.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.block}>
        <h2 className={styles.blockTitle}>어떤 모임인가요 <span className={styles.accent}>??</span></h2>
        <div className={styles.featureList}>
          {features.map((item) => (
            <FeatureItem key={item.lead} {...item} />
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <h2 className={styles.blockTitle}>어떻게 운영되나요 <span className={styles.accent}>??</span></h2>
        <div className={styles.operationGrid}>
          <div className={styles.operationItem}>
            <span className={styles.operationLabel}>8주 · 4권</span>
            <p className={styles.operationDesc}>격주로, 링키라운지에서</p>
          </div>
          <div className={styles.operationItem}>
            <span className={styles.operationLabel}>2부 구조</span>
            <p className={styles.operationDesc}>모임장 발제 → 멤버 발제</p>
          </div>
          <div className={styles.operationItem}>
            <span className={styles.operationLabel}>사전 인터뷰</span>
            <p className={styles.operationDesc}>15분 전화 대화</p>
          </div>
          <div className={styles.operationItem}>
            <span className={styles.operationLabel}>게더링</span>
            <p className={styles.operationDesc}>멤버 외에도 함께</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureItem({
  animationSrc,
  scale = 1,
  lead,
  paragraph,
}: {
  animationSrc: string
  scale?: number
  lead: string
  paragraph: string
}) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    fetch(animationSrc)
      .then((r) => r.json())
      .then(setAnimationData)
  }, [animationSrc])

  return (
    <div className={styles.featureItem}>
      <div className={styles.animationWrapper}>
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop
            style={{ transform: `scale(${scale})` }}
            className={styles.animation}
          />
        ) : (
          <div className={styles.animationPlaceholder} />
        )}
      </div>
      <p className={styles.lead}>{lead}</p>
      <p className={styles.paragraph}>{paragraph}</p>
    </div>
  )
}
