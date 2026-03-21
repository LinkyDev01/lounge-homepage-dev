import styles from "./StorySection.module.css"

export function StorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.paragraph}>
          책 얘기로 시작하다보면, 어느 순간 내 얘기가 나와요.
        </p>
        <p className={styles.paragraph}>
          주변에서 독서 얘기를 많이 듣는데, 열심히 읽어야 하고 완독해야 하고 성장해야 한다는 분위기가 많더라고요.
          저도 그렇게 해봤어요. 근데 그게 꼭 좋은 독서 경험을 만들진 않았어요.
        </p>
        <p className={styles.paragraph}>
          100회 이상 독서모임을 하면서 알게 된 건, 책이 좋아야 대화가 열리는 게 아니라는 거예요.
          이 책 앞에서 나의 이야기가 자연스럽게 나올 수 있는가. 그게 기준이었어요.
        </p>
        <p className={styles.paragraph}>
          4권에는 흐름이 있어요. 자기가 어떻게 살아왔는지 돌아보고, 등장인물을 통해 새로운 시선으로 자신을 바라보고,
          세상을 어떤 관점으로 살아왔는지, 앞으로 어떤 태도를 취할 건지.
          어린 왕자에서 시지프 신화까지 그 맥락으로 이어져요.
        </p>
        <p className={styles.paragraph}>
          무겁게 가지 않아요. 정답 같은 말을 준비하지 않아도 돼요.
          그냥 책에서 걸린 것 하나 들고 오면 충분해요.
        </p>
      </div>
    </section>
  )
}
