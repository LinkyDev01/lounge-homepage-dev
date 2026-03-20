"use client"

import { useState } from "react"
import {
  ArrowRight,
  Users,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
} from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader, CTAButton } from "@/components/common"
import { trackCustom } from "@/lib/meta-pixel"
import { trackEvent } from "@/lib/gtag"
import { CATEGORY_STYLES } from "@/constants/lounge"
import { useGoogleCalendarMeetups } from "@/hooks/use-google-calendar-meetups"
import type { Meetup } from "@/types"

export function MeetupCalendarSection() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const { meetups: currentMonthMeetups, isLoading } = useGoogleCalendarMeetups(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  )

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  const getMeetupsForDay = (day: number) => {
    return currentMonthMeetups.filter((m) => m.day === day)
  }

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth)
  const monthName = currentMonth.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
  })

  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    setCurrentMonth(prev)
    setSelectedDay(null)
    const monthStr = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, "0")}`
    trackCustom("캘린더_월이동", { 방향: "이전", 월: monthStr })
    trackEvent("calendar_month_nav", { direction: "prev", month: monthStr })
  }

  const nextMonth = () => {
    const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    setCurrentMonth(next)
    setSelectedDay(null)
    const monthStr = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`
    trackCustom("캘린더_월이동", { 방향: "다음", 월: monthStr })
    trackEvent("calendar_month_nav", { direction: "next", month: monthStr })
  }

  const handleDayClick = (day: number) => {
    const dayMeetups = getMeetupsForDay(day)
    if (dayMeetups.length > 0) {
      setSelectedDay(day)
      setIsPopupOpen(true)
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      trackCustom("캘린더_날짜클릭", { 날짜: day, 밋업수: dayMeetups.length })
      trackEvent("calendar_date_click", { date: dateStr, meetup_count: dayMeetups.length })
    }
  }

  return (
    <section className="py-12 bg-[#dedad6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Gathering Schedule"
            title=""
            description=""
            labelColor="sage"
          />
        </AnimatedSection>

        {isPopupOpen && selectedDay && (
          <DayMeetupsPopup
            currentMonth={currentMonth}
            selectedDay={selectedDay}
            meetups={getMeetupsForDay(selectedDay)}
            onClose={() => { setIsPopupOpen(false); setSelectedDay(null) }}
          />
        )}

        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl border border-border p-6">
              {/* 월 네비게이션 */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-sage" />
                  {monthName}
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* 요일 헤더 */}
              <div className="grid grid-cols-7 border-l border-t border-border">
                {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm text-muted-foreground py-2 font-medium border-r border-b border-border"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* 날짜 */}
              {isLoading ? (
                <div className="py-16 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-sage animate-spin" />
                  <p className="text-sm text-muted-foreground">모임 정보를 불러오는 중...</p>
                </div>
              ) : (
                <div className="grid grid-cols-7 border-l border-border">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="min-h-[56px] sm:min-h-[90px] border-r border-b border-border" />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const dayMeetups = getMeetupsForDay(day)
                    const hasMeetup = dayMeetups.length > 0
                    return (
                      <div
                        key={day}
                        onClick={() => handleDayClick(day)}
                        className={`min-h-[56px] sm:min-h-[90px] flex flex-col p-1 sm:p-1.5 border-r border-b border-border transition-colors ${hasMeetup ? "cursor-pointer hover:bg-secondary/40" : ""
                          }`}
                      >
                        <span className={`text-base sm:text-lg self-end mb-0.5 sm:mb-1 ${hasMeetup ? "font-semibold" : "text-muted-foreground"}`}>
                          {day}
                        </span>

                        {/* 모바일: 점 */}
                        {hasMeetup && (
                          <div className="flex sm:hidden flex-wrap gap-0.5 justify-center mt-0.5">
                            {dayMeetups.map((meetup) => (
                              <span
                                key={meetup.id}
                                className={`w-2 h-2 rounded-full ${CATEGORY_STYLES[meetup.category].dot}`}
                              />
                            ))}
                          </div>
                        )}

                        {/* sm 이상: 타이틀 바 */}
                        <div className="hidden sm:flex flex-col gap-0.5">
                          {dayMeetups.map((meetup) => (
                            <span
                              key={meetup.id}
                              className={`text-xs truncate px-1.5 py-0.5 rounded ${CATEGORY_STYLES[meetup.category].bg} ${CATEGORY_STYLES[meetup.category].text}`}
                            >
                              {meetup.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* 범례 */}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">카테고리</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(CATEGORY_STYLES).map(([key, value]) => (
                    <span
                      key={key}
                      className={`px-3 py-1 rounded-full text-xs ${value.bg} ${value.text}`}
                    >
                      {value.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

interface DayMeetupsPopupProps {
  currentMonth: Date
  selectedDay: number
  meetups: Meetup[]
  onClose: () => void
}

function DayMeetupsPopup({ currentMonth, selectedDay, meetups, onClose }: DayMeetupsPopupProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#f2ecdd] rounded-2xl border border-border shadow-2xl w-full max-w-lg max-h-[82vh] flex flex-col animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <p className="text-lg font-semibold">
            {currentMonth.getMonth() + 1}월 {selectedDay}일 모임{" "}
            <span className="text-sage">({meetups.length}개)</span>
          </p>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 모임 목록 */}
        <div className="overflow-y-auto p-5 space-y-4">
          {meetups.map((meetup) => (
            <MeetupListItem key={meetup.id} meetup={meetup} currentMonth={currentMonth} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface MeetupListItemProps {
  meetup: Meetup
  currentMonth: Date
}

function MeetupListItem({ meetup, currentMonth }: MeetupListItemProps) {
  const handleRegisterClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    trackCustom("밋업_신청클릭", { 밋업명: meetup.title, 카테고리: meetup.category })
    trackEvent("meetup_apply_click", { meetup_title: meetup.title, category: meetup.category })
  }

  return (
    <div
      className="bg-[#f2ecdd] rounded-2xl border-[1.4px] border-[#595959] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col lg:flex-row"
    >
      {/* 포스터 이미지 */}
      <div className="h-96 lg:h-auto lg:w-40 lg:flex-shrink-0 relative overflow-hidden">
        <img
          src={meetup.image || "/placeholder.svg"}
          alt={meetup.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 모임 정보 */}
      <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
        <div>
          <h4 className="font-semibold text-base mb-2 truncate">
            {meetup.title}
          </h4>
          <p className="text-muted-foreground text-sm mb-3 leading-relaxed line-clamp-2">
            {meetup.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {currentMonth.getMonth() + 1}월 {meetup.day}일
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {meetup.time}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {meetup.maleCapacity !== undefined && meetup.femaleCapacity !== undefined ? (
                <>
                  잔여
                  <span className="text-blue-500">♂ {meetup.maleCapacity - (meetup.maleCurrent ?? 0)}석</span>
                  <span className="text-pink-500">♀ {meetup.femaleCapacity - (meetup.femaleCurrent ?? 0)}석</span>
                  (총 {meetup.maleCapacity + meetup.femaleCapacity}명)
                </>
              ) : (
                `잔여 ${meetup.capacity - meetup.current}석 (총 ${meetup.capacity}명)`
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-base font-bold text-rose">{meetup.price}</span>
          {meetup.registrationUrl ? (
            <CTAButton
              size="sm"
              ctaVariant="mint"
              className="text-xs"
              asChild
              onClick={handleRegisterClick}
            >
              <a href={meetup.registrationUrl} target="_blank" rel="noopener noreferrer">
                신청하기
                <ArrowRight className="ml-1 w-3 h-3" />
              </a>
            </CTAButton>
          ) : (
            <CTAButton
              size="sm"
              ctaVariant="mint"
              className="text-xs"
              onClick={handleRegisterClick}
            >
              신청하기
              <ArrowRight className="ml-1 w-3 h-3" />
            </CTAButton>
          )}
        </div>
      </div>
    </div>
  )
}
