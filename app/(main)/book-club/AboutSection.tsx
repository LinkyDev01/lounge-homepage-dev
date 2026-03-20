import styles from "./AboutSection.module.css"

export function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.block}>
        <h2 className={styles.blockTitle}>어떤 모임인가요</h2>
        <div className={styles.blockContent}>
          <p className={styles.lead}>책이 그 문을 열어줘요.</p>
          <p className={styles.paragraph}>같은 질문, 다른 이야기. 서로가 보이기 시작해요.</p>
          <p className={styles.lead}>아무나와는 안 돼요.</p>
          <p className={styles.paragraph}>사전 인터뷰로 결이 맞는 사람들이 모여요.</p>
          <p className={styles.lead}>한 번으로 끝나지 않아요.</p>
          <p className={styles.paragraph}>8주, 같은 사람들과. 대화가 쌓이며 깊어져요.</p>
        </div>
      </div>

      <div className={styles.block}>
        <h2 className={styles.blockTitle}>어떻게 운영되나요</h2>
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
