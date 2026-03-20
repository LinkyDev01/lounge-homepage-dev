import type { Metadata } from "next"
import {
  SpaceIntroSection,
  ProgramsSection,
  MeetupCalendarSection,
  GallerySection,
} from "@/components/lounge"

export default function LoungePage() {
  return (
    <main className="min-h-screen">
      <SpaceIntroSection />
      <ProgramsSection />
      <MeetupCalendarSection />
      <GallerySection />
    </main>
  )
}
