"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Calendar,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  MessageSquare,
  Plus,
  RefreshCw,
  Settings,
  Users,
  Edit,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function TemplatesPage() {
  // Month navigation state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
  const [applyTemplateId, setApplyTemplateId] = useState<number | null>(null)

  // Add state for scheduled dates
  const [scheduledDates, setScheduledDates] = useState<Date[]>([])

  // Add state for shifts by month/year
  const [shiftsByMonthYear, setShiftsByMonthYear] = useState({})

  // Add this useEffect to check for newly created schedules when the component mounts
  useEffect(() => {
    // Try to load scheduled dates from localStorage
    try {
      const scheduledDatesJSON = localStorage.getItem("scheduledDates")
      if (scheduledDatesJSON) {
        const dateStrings = JSON.parse(scheduledDatesJSON)
        const dates = dateStrings.map((dateStr) => new Date(dateStr))
        setScheduledDates(dates)
      } else {
        // If no dates in localStorage, use some default dates for demo
        const today = new Date()
        const scheduledDays = [
          new Date(currentYear, currentMonth, 15),
          new Date(currentYear, currentMonth, 16),
          new Date(currentYear, currentMonth, 17),
          new Date(currentYear, currentMonth, 28),
          new Date(currentYear, currentMonth, 29),
          new Date(currentYear, currentMonth, 30),
        ]
        setScheduledDates(scheduledDays)

        // Save default dates to localStorage
        localStorage.setItem("scheduledDates", JSON.stringify(scheduledDays.map((d) => d.toISOString())))
      }

      // Load shifts data from localStorage
      const shiftsJSON = localStorage.getItem("shiftsByMonthYear")
      if (shiftsJSON) {
        setShiftsByMonthYear(JSON.parse(shiftsJSON))
      } else {
        // If no shifts in localStorage, use default data
        const defaultShifts = {
          // Current month (April 2025)
          "4-2025": {
            2: [
              { id: 1, name: "Yuki Tanaka", role: "Chef", time: "10:00 AM - 4:00 PM" },
              { id: 2, name: "Mei Wong", role: "Server", time: "11:00 AM - 7:00 PM" },
            ],
            5: [
              { id: 3, name: "Kenji Sato", role: "Host", time: "4:00 PM - 10:00 PM" },
              { id: 4, name: "Hana Kim", role: "Server", time: "4:00 PM - 10:00 PM" },
              { id: 5, name: "Takashi Yamamoto", role: "Chef", time: "3:00 PM - 9:00 PM" },
            ],
            15: [
              { id: 1, name: "Yuki Tanaka", role: "Chef", time: "10:00 AM - 4:00 PM" },
              { id: 2, name: "Mei Wong", role: "Server", time: "11:00 AM - 7:00 PM" },
            ],
            16: [
              { id: 5, name: "Takashi Yamamoto", role: "Chef", time: "10:00 AM - 4:00 PM" },
              { id: 4, name: "Hana Kim", role: "Server", time: "11:00 AM - 7:00 PM" },
            ],
            17: [
              { id: 3, name: "Kenji Sato", role: "Host", time: "10:00 AM - 4:00 PM" },
              { id: 2, name: "Mei Wong", role: "Server", time: "11:00 AM - 7:00 PM" },
            ],
            28: [
              { id: 1, name: "Yuki Tanaka", role: "Chef", time: "10:00 AM - 4:00 PM" },
              { id: 5, name: "Takashi Yamamoto", role: "Chef", time: "4:00 PM - 10:00 PM" },
            ],
            29: [{ id: 4, name: "Hana Kim", role: "Server", time: "10:00 AM - 4:00 PM" }],
            30: [
              { id: 2, name: "Mei Wong", role: "Server", time: "10:00 AM - 4:00 PM" },
              { id: 1, name: "Yuki Tanaka", role: "Chef", time: "10:00 AM - 4:00 PM" },
            ],
          },
          // Next month (May 2025)
          "5-2025": {
            3: [
              { id: 1, name: "Yuki Tanaka", role: "Chef", time: "10:00 AM - 4:00 PM" },
              { id: 2, name: "Mei Wong", role: "Server", time: "11:00 AM - 7:00 PM" },
            ],
            10: [
              { id: 3, name: "Kenji Sato", role: "Host", time: "4:00 PM - 10:00 PM" },
              { id: 5, name: "Takashi Yamamoto", role: "Chef", time: "3:00 PM - 9:00 PM" },
            ],
            15: [
              { id: 4, name: "Hana Kim", role: "Server", time: "10:00 AM - 4:00 PM" },
              { id: 1, name: "Yuki Tanaka", role: "Chef", time: "10:00 AM - 4:00 PM" },
            ],
          },
          // Previous month (March 2025)
          "3-2025": {
            20: [
              { id: 1, name: "Yuki Tanaka", role: "Chef", time: "10:00 AM - 4:00 PM" },
              { id: 3, name: "Kenji Sato", role: "Host", time: "4:00 PM - 10:00 PM" },
            ],
            25: [
              { id: 2, name: "Mei Wong", role: "Server", time: "11:00 AM - 7:00 PM" },
              { id: 5, name: "Takashi Yamamoto", role: "Chef", time: "3:00 PM - 9:00 PM" },
            ],
          },
        }
        setShiftsByMonthYear(defaultShifts)

        // Save default shifts to localStorage
        localStorage.setItem("shiftsByMonthYear", JSON.stringify(defaultShifts))
      }
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }, [])

  // Function to navigate to previous month
  const goToPreviousMonth = () => {
    let newMonth = currentMonth - 1
    let newYear = currentYear

    if (newMonth < 0) {
      newMonth = 11
      newYear = currentYear - 1
    }

    setCurrentMonth(newMonth)
    setCurrentYear(newYear)
  }

  // Function to navigate to next month
  const goToNextMonth = () => {
    let newMonth = currentMonth + 1
    let newYear = currentYear

    if (newMonth > 11) {
      newMonth = 0
      newYear = currentYear + 1
    }

    setCurrentMonth(newMonth)
    setCurrentYear(newYear)
  }

  // Get month name
  const getMonthName = (month: number) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return monthNames[month]
  }

  // Get year options for dropdown (3 years back, 5 years forward)
  const getYearOptions = () => {
    const currentRealYear = new Date().getFullYear()
    const years = []

    // Add past 3 years
    for (let i = 3; i > 0; i--) {
      years.push(currentRealYear - i)
    }

    // Add current year
    years.push(currentRealYear)

    // Add future 5 years
    for (let i = 1; i <= 5; i++) {
      years.push(currentRealYear + i)
    }

    return years
  }

  // Handle month change from dropdown
  const handleMonthChange = (month: number) => {
    setCurrentMonth(month)
  }

  // Handle year change from dropdown
  const handleYearChange = (year: number) => {
    setCurrentYear(year)
  }

  // Get number of days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Get number of days in previous month
  const getDaysInPreviousMonth = (year: number, month: number) => {
    // If month is January (0), we need to get days for December of previous year
    if (month === 0) {
      return getDaysInMonth(year - 1, 11)
    }
    return getDaysInMonth(year, month - 1)
  }

  // Function to toggle day selection
  const toggleDaySelection = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day))
    } else {
      setSelectedDays([...selectedDays, day])
    }
  }

  // Function to handle applying template to selected days
  const handleApplyTemplate = () => {
    if (!applyTemplateId || selectedDays.length === 0) return

    // In a real app, you would apply the template to the selected days
    console.log(`Applying template ${applyTemplateId} to days:`, selectedDays)

    // Close dialog and reset state
    setIsApplyDialogOpen(false)
    setApplyTemplateId(null)
    setSelectedDays([])

    // Show success message
    alert("Schedule successfully built for selected days!")
  }

  // Helper function to get current month-year key
  const getCurrentMonthYearKey = () => {
    return `${currentMonth + 1}-${currentYear}`
  }

  // Function to check if a day is missing required staff
  const isMissingStaff = (day: number) => {
    const monthYearKey = getCurrentMonthYearKey()
    const shiftsForMonth = shiftsByMonthYear[monthYearKey] || {}
    const staffForDay = shiftsForMonth[day] || []

    // Check if we have at least one of each required role
    const hasChef = staffForDay.some((staff) => staff.role === "Chef")
    const hasServer = staffForDay.some((staff) => staff.role === "Server")
    const hasHost = staffForDay.some((staff) => staff.role === "Host")

    // Return true if any required role is missing
    return staffForDay.length > 0 && (!hasChef || !hasServer || !hasHost)
  }

  // Update the renderCalendarDays function to show scheduled dates
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)
    const daysInPrevMonth = getDaysInPreviousMonth(currentYear, currentMonth)
    const monthYearKey = getCurrentMonthYearKey()
    const shiftsForMonth = shiftsByMonthYear[monthYearKey] || {}

    // Get current date for highlighting today
    const today = new Date()
    const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear
    const currentDay = today.getDate()

    // Create array for calendar days
    const calendarDays = []

    // Add days from previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevMonthDay = daysInPrevMonth - firstDayOfMonth + i + 1
      calendarDays.push(
        <div key={`prev-${i}`} className="h-24 p-2 bg-gray-100 text-gray-400 flex flex-col">
          <span className="text-sm font-medium">{prevMonthDay}</span>
        </div>,
      )
    }

    // Add cells for each day of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === currentDay
      const date = new Date(currentYear, currentMonth, day)
      const isScheduled = scheduledDates.some(
        (scheduledDate) =>
          scheduledDate.getDate() === day &&
          scheduledDate.getMonth() === currentMonth &&
          scheduledDate.getFullYear() === currentYear,
      )
      const hasShift = Object.keys(shiftsForMonth).map(Number).includes(day)
      const missingStaff = isMissingStaff(day)

      calendarDays.push(
        <div
          key={day}
          className={`h-24 p-2 ${isToday ? "bg-blue-50" : missingStaff ? "bg-yellow-50" : "bg-white"} flex flex-col cursor-pointer hover:bg-gray-50 border border-gray-200`}
          onClick={() => handleDateClick(day)}
        >
          <span
            className={`text-sm font-medium ${isToday ? "text-blue-600" : missingStaff ? "text-yellow-700" : "text-gray-700"}`}
          >
            {day}
          </span>
          {hasShift && (
            <div className="mt-auto">
              <div
                className={`${missingStaff ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"} text-xs px-2 py-1 rounded`}
              >
                {shiftsForMonth[day]?.length || 0} {shiftsForMonth[day]?.length === 1 ? "worker" : "workers"}
                {missingStaff && " (incomplete)"}
              </div>
            </div>
          )}
          {isScheduled && !hasShift && (
            <div className="mt-auto">
              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Scheduled</div>
            </div>
          )}
        </div>,
      )
    }

    // Add days from next month to complete the grid
    const totalDaysShown = calendarDays.length
    const remainingCells = 42 - totalDaysShown // 6 rows of 7 days

    for (let i = 1; i <= remainingCells; i++) {
      calendarDays.push(
        <div key={`next-${i}`} className="h-24 p-2 bg-gray-100 text-gray-400 flex flex-col">
          <span className="text-sm font-medium">{i}</span>
        </div>,
      )
    }

    return calendarDays
  }

  // Add a function to handle date clicks
  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    const isScheduled = scheduledDates.some(
      (scheduledDate) =>
        scheduledDate.getDate() === day &&
        scheduledDate.getMonth() === currentMonth &&
        scheduledDate.getFullYear() === currentYear,
    )

    if (isScheduled) {
      // In a real app, you would navigate to the schedule details
      alert(`View schedule for ${getMonthName(currentMonth)} ${day}, ${currentYear}`)
    } else {
      // Navigate to create schedule page with the selected date
      const dateParam = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      window.location.href = `/templates/create?date=${dateParam}`
    }
  }

  // Get today's schedule
  const getTodaySchedule = () => {
    const today = new Date()
    const monthYearKey = `${today.getMonth() + 1}-${today.getFullYear()}`
    const day = today.getDate()

    const shiftsForToday = shiftsByMonthYear[monthYearKey]?.[day] || []

    // Group workers by role
    const chefs = shiftsForToday.filter((worker) => worker.role === "Chef")
    const servers = shiftsForToday.filter((worker) => worker.role === "Server")
    const hosts = shiftsForToday.filter((worker) => worker.role === "Host")

    return { chefs, servers, hosts }
  }

  // Get recent schedules
  const getRecentSchedules = () => {
    return [
      {
        id: 1,
        name: `${getMonthName(currentMonth)} ${currentYear} Schedule`,
        description: `Schedule for ${getMonthName(currentMonth)} ${currentYear}`,
        createdDate: "Today",
        isNew: true,
      },
      {
        id: 2,
        name: "March 2025 Schedule",
        description: "Schedule for March 2025",
        createdDate: "2 weeks ago",
        isNew: false,
      },
      {
        id: 3,
        name: "February 2025 Schedule",
        description: "Schedule for February 2025",
        createdDate: "1 month ago",
        isNew: false,
      },
    ]
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden w-64 bg-white border-r border-gray-200 p-6 flex-col md:flex">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900">OKI SUSHI</h1>
          <p className="text-sm text-gray-500 mt-1">Staff Scheduling</p>
        </div>
        <nav className="space-y-1 flex-1">
          <Link
            href="/"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <CalendarDays className="mr-3 h-5 w-5 text-gray-400" />
            Dashboard
          </Link>
          <Link
            href="/schedule"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Clock className="mr-3 h-5 w-5 text-gray-400" />
            Schedule
          </Link>
          <Link
            href="/templates"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900"
          >
            <FileText className="mr-3 h-5 w-5 text-gray-500" />
            Build Schedule
          </Link>
          <Link
            href="/employees"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Users className="mr-3 h-5 w-5 text-gray-400" />
            Employees
          </Link>
          <Link
            href="/shift-trade"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <RefreshCw className="mr-3 h-5 w-5 text-gray-400" />
            Shift Trade
          </Link>
          <Link
            href="/messages"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <MessageSquare className="mr-3 h-5 w-5 text-gray-400" />
            Messages
          </Link>
          <Link
            href="/time-off"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Calendar className="mr-3 h-5 w-5 text-gray-400" />
            Time Off
          </Link>
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
              AK
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Admin Kimura</p>
              <p className="text-xs text-gray-500">Owner</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-gray-900">Build Schedule</h1>
            <div className="flex items-center space-x-4">
              <Link href="/templates/manage">
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" /> Manage Templates
                </Button>
              </Link>
              <Link href="/templates/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Build Schedule
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-semibold text-gray-900 mr-2">
                  <div className="flex items-center">
                    <Select
                      value={currentMonth.toString()}
                      onValueChange={(value) => handleMonthChange(Number.parseInt(value))}
                    >
                      <SelectTrigger className="w-[130px] h-9">
                        <SelectValue placeholder={getMonthName(currentMonth)} />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {getMonthName(i)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={currentYear.toString()}
                      onValueChange={(value) => handleYearChange(Number.parseInt(value))}
                      className="ml-2"
                    >
                      <SelectTrigger className="w-[100px] h-9">
                        <SelectValue placeholder={currentYear.toString()} />
                      </SelectTrigger>
                      <SelectContent>
                        {getYearOptions().map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToPreviousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="grid grid-cols-7 gap-px border-b border-gray-200">
                {/* Day headers */}
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                  <div key={`header-${i}`} className="bg-gray-50 p-2 text-center text-xs font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-px">
                {/* Calendar days */}
                {renderCalendarDays()}
              </div>
            </div>
          </div>

          {/* Recent Schedules Section (similar to Dashboard) */}
          <div className="mb-6 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-base font-semibold text-gray-900">Recent Schedules</h3>
              <Link href="/templates">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getRecentSchedules().map((schedule) => (
                  <div key={schedule.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                      <h4 className="font-medium text-gray-700">{schedule.name}</h4>
                      {schedule.isNew && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">New</span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-3">{schedule.description}</p>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Created: {schedule.createdDate}</span>
                        <Link href={`/templates/${schedule.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Today's Schedule Section (similar to Dashboard) */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">Today's Schedule</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              {/* Chefs */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h4 className="font-medium text-gray-700">Chefs</h4>
                </div>
                <ul className="divide-y divide-gray-200">
                  {getTodaySchedule().chefs.length > 0 ? (
                    getTodaySchedule().chefs.map((shift, i) => (
                      <li key={i} className="px-4 py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                              {shift.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{shift.name}</p>
                              <p className="text-xs text-gray-500">{shift.time}</p>
                            </div>
                          </div>
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Scheduled</span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-3 text-sm text-gray-500">No chefs scheduled for today</li>
                  )}
                </ul>
              </div>

              {/* Servers */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h4 className="font-medium text-gray-700">Servers</h4>
                </div>
                <ul className="divide-y divide-gray-200">
                  {getTodaySchedule().servers.length > 0 ? (
                    getTodaySchedule().servers.map((shift, i) => (
                      <li key={i} className="px-4 py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                              {shift.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{shift.name}</p>
                              <p className="text-xs text-gray-500">{shift.time}</p>
                            </div>
                          </div>
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Scheduled</span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-3 text-sm text-gray-500">No servers scheduled for today</li>
                  )}
                </ul>
              </div>

              {/* Hosts */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h4 className="font-medium text-gray-700">Hosts</h4>
                </div>
                <ul className="divide-y divide-gray-200">
                  {getTodaySchedule().hosts.length > 0 ? (
                    getTodaySchedule().hosts.map((shift, i) => (
                      <li key={i} className="px-4 py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                              {shift.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{shift.name}</p>
                              <p className="text-xs text-gray-500">{shift.time}</p>
                            </div>
                          </div>
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Scheduled</span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-3 text-sm text-gray-500">No hosts scheduled for today</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Apply Template Dialog */}
      <Dialog
        open={isApplyDialogOpen}
        onOpenChange={(open) => {
          setIsApplyDialogOpen(open)
          if (!open) {
            setApplyTemplateId(null)
            setSelectedDays([])
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Apply Schedule Template</DialogTitle>
            <DialogDescription>
              Select the days you want to apply this template to. You can select multiple days.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <Label className="mb-2 block">Select Days</Label>
              <div className="flex flex-wrap gap-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <Button
                    key={day}
                    type="button"
                    variant={selectedDays.includes(day) ? "default" : "outline"}
                    className="w-full sm:w-auto"
                    onClick={() => toggleDaySelection(day)}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSelectedDays(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
                }
              >
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedDays([])}>
                Clear
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyTemplate} disabled={selectedDays.length === 0}>
              Build Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
