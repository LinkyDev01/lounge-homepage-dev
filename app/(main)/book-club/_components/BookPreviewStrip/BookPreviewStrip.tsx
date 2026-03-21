"use client"

import Image from "next/image"
import { currentSeasonConfig } from "../../book-config"
import styles from "./BookPreviewStrip.module.css"

interface Props {
  onSeeAll: () => void
}

export function BookPreviewStrip({ onSeeAll }: Props) {
  const { books } = currentSeasonConfig

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>이번 시즌 책</span>
        <button className={styles.seeAll} onClick={onSeeAll}>
          자세히 보기 →
        </button>
      </div>
      <div className={styles.strip}>
        {books.map((book) => (
          <button key={book.week} className={styles.item} onClick={onSeeAll}>
            <Image
              src={book.imagePath}
              alt={book.title}
              width={90}
              height={135}
              className={styles.cover}
            />
            <p className={styles.title}>{book.title}</p>
            <p className={styles.author}>{book.author}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
