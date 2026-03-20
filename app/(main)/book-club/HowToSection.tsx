import styles from "./HowToSection.module.css"

const steps = [
  {
    label: "오프닝",
    duration: "15분",
    description: "책에서 머물렀던 문장 하나를 꺼내놓아요.",
  },
  {
    label: "1부 — 모임장 발제",
    duration: "60분",
    description: "모임장 주제로 대화를 열어요.",
  },
  {
    label: "2부 — 멤버 발제",
    duration: "60분",
    description: "각자의 문장·궁금증으로 이어져요.",
  },
  {
    label: "마무리",
    duration: "15분",
    description: "오늘의 한 문장을 나누며 마무리해요.",
  },
]

export function HowToSection() {
  return (
    <section id="howto" className={styles.section}>
      <h2 className={styles.sectionTitle}>LazyDay의 타임라인</h2>
      <p className={styles.intro}>한 번의 모임은 <span className={styles.accent}>3시간</span>동안 진행돼요.</p>

      <div className={styles.steps}>
        {steps.map((step) => (
          <div key={step.label} className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepLabel}>{step.label}</span>
              {step.duration && (
                <span className={styles.stepDuration}>{step.duration}</span>
              )}
            </div>
            <p className={styles.stepDesc}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
