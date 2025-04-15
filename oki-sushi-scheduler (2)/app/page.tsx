"use client"

import type React from "react"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
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
  Trash2,
  Users,
  Edit,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  // Month navigation state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAddStaffDialogOpen, setIsAddStaffDialogOpen] = useState(false)
  const [isRemoveStaffDialogOpen, setIsRemoveStaffDialogOpen] = useState(false)
  const [staffToRemove, setStaffToRemove] = useState<{ id: number; name: string } | null>(null)
  const [removalReason, setRemovalReason] = useState("no-show")
  const [otherReason, setOtherReason] = useState("")

  // Time selection states
  const [timeSelectionStep, setTimeSelectionStep] = useState<"hour" | "minute" | "ampm" | "complete">("hour")
  const [isStartTime, setIsStartTime] = useState(true)
  const [customMinutes, setCustomMinutes] = useState("")
  const [showCustomMinutes, setShowCustomMinutes] = useState(false)
  const customMinutesRef = useRef<HTMLInputElement>(null)

  // Update the Dialog content to include position management
  const [isAddPositionDialogOpen, setIsAddPositionDialogOpen] = useState(false)
  const [newPositionType, setNewPositionType] = useState("")
  const [positionLimit, setPositionLimit] = useState(0)

  // Add state for the Create Shift dialog
  const [isCreateShiftDialogOpen, setIsCreateShiftDialogOpen] = useState(false)
  const [createShiftForm, setCreateShiftForm] = useState({
    staffId: "",
    role: "",
    startDate: new Date(),
    endDate: new Date(),
    startTime: "09:00",
    endTime: "17:00",
    isRecurring: false,
    recurringType: "weekly",
    daysOfWeek: [] as string[],
    recurringEndDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  })
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [calendarView, setCalendarView] = useState(false)

  // Add state for scheduled dates
  const [scheduledDates, setScheduledDates] = useState<Date[]>([])

  // Add state for shifts by month/year
  const [shiftsByMonthYear, setShiftsByMonthYear] = useState({})

  // Load data from localStorage
  useEffect(() => {
    // Try to load scheduled dates from localStorage
    try {
      const scheduledDatesJSON = localStorage.getItem("scheduledDates")
      if (scheduledDatesJSON) {
        const dateStrings = JSON.parse(scheduledDatesJSON)
        const dates = dateStrings.map((dateStr) => new Date(dateStr))
        setScheduledDates(dates)
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
            8: [
              { id: 1, name: "Yuki Tanaka", role: "Chef", time: "10:00 AM - 4:00 PM" },
              { id: 2, name: "Mei Wong", role: "Server", time: "11:00 AM - 7:00 PM" },
            ],
            13: [
              { id: 1, name: "Yuki Tanaka", role: "Chef", time: "10:00 AM - 4:00 PM" },
              { id: 2, name: "Mei Wong", role: "Server", time: "11:00 AM - 7:00 PM" },
              { id: 3, name: "Kenji Sato", role: "Host", time: "4:00 PM - 10:00 PM" },
              { id: 4, name: "Hana Kim", role: "Server", time: "4:00 PM - 10:00 PM" },
            ],
            16: [
              { id: 5, name: "Takashi Yamamoto", role: "Chef", time: "10:00 AM - 4:00 PM" },
              { id: 4, name: "Hana Kim", role: "Server", time: "11:00 AM - 7:00 PM" },
            ],
            19: [
              { id: 3, name: "Kenji Sato", role: "Host", time: "10:00 AM - 4:00 PM" },
              { id: 2, name: "Mei Wong", role: "Server", time: "11:00 AM - 7:00 PM" },
            ],
            22: [
              { id: 1, name: "Yuki Tanaka", role: "Chef", time: "10:00 AM - 4:00 PM" },
              { id: 5, name: "Takashi Yamamoto", role: "Chef", time: "4:00 PM - 10:00 PM" },
            ],
            25: [{ id: 4, name: "Hana Kim", role: "Server", time: "10:00 AM - 4:00 PM" }],
            28: [
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
    // Calculate new month and year
    let newMonth = currentMonth - 1
    let newYear = currentYear

    if (newMonth < 0) {
      newMonth = 11
      newYear = currentYear - 1
    }

    // Check if we're trying to go back more than 3 months from current date
    const today = new Date()
    const currentDate = new Date(today.getFullYear(), today.getMonth())
    const targetDate = new Date(newYear, newMonth)
    const monthDiff =
      (currentDate.getFullYear() - targetDate.getFullYear()) * 12 + (currentDate.getMonth() - targetDate.getMonth())

    if (monthDiff > 3) {
      alert("Cannot view schedules older than 3 months")
      return
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

  // Function to go to current month
  const goToCurrentMonth = () => {
    const today = new Date()
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
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
    // Check if we're trying to go back more than 3 months from current date
    const today = new Date()
    const currentDate = new Date(today.getFullYear(), today.getMonth())
    const targetDate = new Date(currentYear, month)
    const monthDiff =
      (currentDate.getFullYear() - targetDate.getFullYear()) * 12 + (currentDate.getMonth() - targetDate.getMonth())

    if (monthDiff > 3) {
      alert("Cannot view schedules older than 3 months")
      return
    }

    setCurrentMonth(month)
  }

  // Handle year change from dropdown
  const handleYearChange = (year: number) => {
    // Check if we're trying to go back more than 3 months from current date
    const today = new Date()
    const currentDate = new Date(today.getFullYear(), today.getMonth())
    const targetDate = new Date(year, currentMonth)
    const monthDiff =
      (currentDate.getFullYear() - targetDate.getFullYear()) * 12 + (currentDate.getMonth() - targetDate.getMonth())

    if (monthDiff > 3) {
      alert("Cannot view schedules older than 3 months")
      return
    }

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

  // Add this new function to switch between start and end time
  const switchToEndTime = () => {
    // Auto-fill any missing start time values
    const updatedForm = { ...newStaffForm }
    if (!updatedForm.startHour) updatedForm.startHour = "9"
    if (!updatedForm.startMinute) updatedForm.startMinute = "00"
    if (!updatedForm.startAmPm) updatedForm.startAmPm = "AM"

    setNewStaffForm(updatedForm)
    setIsStartTime(false)
    setTimeSelectionStep("hour")
    setShowCustomMinutes(false)
  }

  // Add this new function to complete time selection with defaults
  const completeTimeSelection = () => {
    const updatedForm = { ...newStaffForm }

    // Fill in any missing values
    if (isStartTime) {
      if (!updatedForm.startHour) updatedForm.startHour = "9"
      if (!updatedForm.startMinute) updatedForm.startMinute = "00"
      if (!updatedForm.startAmPm) updatedForm.startAmPm = "AM"

      // Move to end time
      setIsStartTime(false)
      setTimeSelectionStep("hour")
    } else {
      if (!updatedForm.endHour) updatedForm.endHour = "5"
      if (!updatedForm.endMinute) updatedForm.endMinute = "00"
      if (!updatedForm.endAmPm) updatedForm.endAmPm = "PM"

      // Complete the selection
      setTimeSelectionStep("complete")
    }

    setNewStaffForm(updatedForm)
    setShowCustomMinutes(false)
  }

  // Mock data for all staff members
  const allStaff = [
    { id: 1, name: "Yuki Tanaka", role: "Chef" },
    { id: 2, name: "Mei Wong", role: "Server" },
    { id: 3, name: "Kenji Sato", role: "Host" },
    { id: 4, name: "Hana Kim", role: "Server" },
    { id: 5, name: "Takashi Yamamoto", role: "Chef" },
  ]

  // Helper function to get current month-year key
  const getCurrentMonthYearKey = () => {
    return `${currentMonth + 1}-${currentYear}`
  }

  // Form state for adding new staff
  const [newStaffForm, setNewStaffForm] = useState({
    staffId: "",
    startHour: "",
    startMinute: "00",
    startAmPm: "AM",
    endHour: "",
    endMinute: "00",
    endAmPm: "AM",
  })

  // Reset time selection when dialog closes
  useEffect(() => {
    if (!isAddStaffDialogOpen) {
      setTimeSelectionStep("hour")
      setIsStartTime(true)
      setShowCustomMinutes(false)
      setCustomMinutes("")
    }
  }, [isAddStaffDialogOpen])

  // Focus custom minutes input when shown
  useEffect(() => {
    if (showCustomMinutes && customMinutesRef.current) {
      customMinutesRef.current.focus()
    }
  }, [showCustomMinutes])

  const handleDateClick = (day: number) => {
    setSelectedDate(day)
    setIsDialogOpen(true)
  }

  const getWorkersForSelectedDate = () => {
    if (!selectedDate) return []

    const monthYearKey = getCurrentMonthYearKey()
    const shiftsForMonth = shiftsByMonthYear[monthYearKey] || {}

    return shiftsForMonth[selectedDate] || []
  }

  // Group workers by role
  const getWorkersByRole = () => {
    const workers = getWorkersForSelectedDate()
    const chefs = workers.filter((worker) => worker.role === "Chef")
    const servers = workers.filter((worker) => worker.role === "Server")
    const hosts = workers.filter((worker) => worker.role === "Host")

    return { chefs, servers, hosts }
  }

  const openRemoveStaffDialog = (staffId: number, staffName: string) => {
    setStaffToRemove({ id: staffId, name: staffName })
    setRemovalReason("no-show")
    setOtherReason("")
    setIsRemoveStaffDialogOpen(true)
  }

  const confirmRemoveStaff = () => {
    if (!selectedDate || !staffToRemove) return

    // Record the removal reason (in a real app, you might log this to a database)
    const finalReason = removalReason === "other" ? otherReason.trim() || "N/A" : removalReason
    console.log(
      `Removed ${staffToRemove.name} from schedule on ${getMonthName(currentMonth)} ${selectedDate}, ${currentYear}. Reason: ${finalReason}`,
    )

    // Remove the staff from the schedule
    const monthYearKey = getCurrentMonthYearKey()
    const updatedShiftsByMonthYear = { ...shiftsByMonthYear }

    if (!updatedShiftsByMonthYear[monthYearKey]) {
      updatedShiftsByMonthYear[monthYearKey] = {}
    }

    if (updatedShiftsByMonthYear[monthYearKey][selectedDate]) {
      updatedShiftsByMonthYear[monthYearKey][selectedDate] = updatedShiftsByMonthYear[monthYearKey][
        selectedDate
      ].filter((staff) => staff.id !== staffToRemove.id)

      // If no staff left for this date, remove the date entry
      if (updatedShiftsByMonthYear[monthYearKey][selectedDate].length === 0) {
        delete updatedShiftsByMonthYear[monthYearKey][selectedDate]
      }
    }

    setShiftsByMonthYear(updatedShiftsByMonthYear)

    // Save to localStorage
    localStorage.setItem("shiftsByMonthYear", JSON.stringify(updatedShiftsByMonthYear))

    setIsRemoveStaffDialogOpen(false)
    setStaffToRemove(null)
  }

  const openAddStaffDialog = () => {
    setIsAddStaffDialogOpen(true)
    setNewStaffForm({
      staffId: "",
      startHour: "",
      startMinute: "00",
      startAmPm: "AM",
      endHour: "",
      endMinute: "00",
      endAmPm: "AM",
    })
    setTimeSelectionStep("hour")
    setIsStartTime(true)
  }

  // Update the handleHourSelect function to auto-set AM/PM for end time
  const handleHourSelect = (hour: string) => {
    if (isStartTime) {
      setNewStaffForm({ ...newStaffForm, startHour: hour })
      setTimeSelectionStep("minute")
    } else {
      // For end time, auto-determine AM/PM based on start time
      const startHour = Number.parseInt(newStaffForm.startHour)
      const endHour = Number.parseInt(hour)
      let endAmPm = newStaffForm.startAmPm

      // If end hour is less than start hour, flip AM/PM (unless both are 12)
      if (endHour < startHour && !(startHour === 12 && endHour === 12)) {
        endAmPm = newStaffForm.startAmPm === "AM" ? "PM" : "AM"
      }

      setNewStaffForm({ ...newStaffForm, endHour: hour, endAmPm })
      setTimeSelectionStep("minute")
    }
  }

  const handleMinuteSelect = (minute: string) => {
    if (minute === "other") {
      setShowCustomMinutes(true)
      return
    }

    if (isStartTime) {
      setNewStaffForm({ ...newStaffForm, startMinute: minute })
    } else {
      setNewStaffForm({ ...newStaffForm, endMinute: minute })
    }
    setTimeSelectionStep("ampm")
  }

  const handleCustomMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, "")
    setCustomMinutes(value)
  }

  const handleCustomMinutesSubmit = () => {
    let minute = customMinutes
    // Ensure it's a valid minute (0-59)
    const minuteNum = Number.parseInt(minute)
    if (isNaN(minuteNum) || minuteNum < 0 || minuteNum > 59) {
      minute = "00"
    } else {
      // Pad with leading zero if needed
      minute = minuteNum.toString().padStart(2, "0")
    }

    if (isStartTime) {
      setNewStaffForm({ ...newStaffForm, startMinute: minute })
    } else {
      setNewStaffForm({ ...newStaffForm, endMinute: minute })
    }
    setShowCustomMinutes(false)
    setCustomMinutes("")
    setTimeSelectionStep("ampm")
  }

  // Update the handleAmPmSelect function
  const handleAmPmSelect = (ampm: "AM" | "PM") => {
    if (isStartTime) {
      setNewStaffForm({ ...newStaffForm, startAmPm: ampm })
      // Move to end time selection
      setIsStartTime(false)
      setTimeSelectionStep("hour")
    } else {
      setNewStaffForm({ ...newStaffForm, endAmPm: ampm })
      // Time selection is complete
      setTimeSelectionStep("complete")
    }
  }

  // Get staff members not already scheduled for the selected date
  const getAvailableStaff = () => {
    if (!selectedDate) return allStaff

    const monthYearKey = getCurrentMonthYearKey()
    const shiftsForMonth = shiftsByMonthYear[monthYearKey] || {}
    const scheduledStaff = shiftsForMonth[selectedDate] || []
    const scheduledStaffIds = scheduledStaff.map((staff) => staff.id)

    return allStaff.filter((staff) => !scheduledStaffIds.includes(staff.id))
  }

  // Update the renderTimeSelection function to include the new buttons
  const renderTimeSelection = () => {
    // Add navigation buttons at the top
    const navigationButtons = (
      <div className="flex justify-between mb-4">
        <div className="flex space-x-2">
          <Button
            variant={isStartTime ? "default" : "outline"}
            size="sm"
            onClick={() => {
              if (!isStartTime) {
                setIsStartTime(true)
                setTimeSelectionStep("hour")
              }
            }}
          >
            Start Time
          </Button>
          <Button variant={!isStartTime ? "default" : "outline"} size="sm" onClick={() => switchToEndTime()}>
            End Time
          </Button>
        </div>
        <Button variant="secondary" size="sm" onClick={completeTimeSelection}>
          Done
        </Button>
      </div>
    )

    if (timeSelectionStep === "hour") {
      return (
        <div>
          {navigationButtons}
          <h3 className="text-sm font-medium mb-2">Select {isStartTime ? "start" : "end"} hour:</h3>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
              <Button key={hour} variant="outline" className="h-10" onClick={() => handleHourSelect(hour.toString())}>
                {hour}
              </Button>
            ))}
          </div>
        </div>
      )
    }

    if (timeSelectionStep === "minute") {
      return (
        <div>
          {navigationButtons}
          <h3 className="text-sm font-medium mb-2">Select {isStartTime ? "start" : "end"} minute:</h3>
          {showCustomMinutes ? (
            <div className="flex items-center gap-2">
              <Input
                ref={customMinutesRef}
                type="text"
                value={customMinutes}
                onChange={handleCustomMinutesChange}
                className="w-20"
                maxLength={2}
                placeholder="00-59"
              />
              <Button onClick={handleCustomMinutesSubmit}>Set</Button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {["00", "15", "30", "45"].map((minute) => (
                <Button key={minute} variant="outline" className="h-10" onClick={() => handleMinuteSelect(minute)}>
                  :{minute}
                </Button>
              ))}
              <Button variant="outline" className="h-10 col-span-4" onClick={() => handleMinuteSelect("other")}>
                Other
              </Button>
            </div>
          )}
        </div>
      )
    }

    if (timeSelectionStep === "ampm") {
      return (
        <div>
          {navigationButtons}
          <h3 className="text-sm font-medium mb-2">Select {isStartTime ? "start" : "end"} AM/PM:</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="h-10" onClick={() => handleAmPmSelect("AM")}>
              AM
            </Button>
            <Button variant="outline" className="h-10" onClick={() => handleAmPmSelect("PM")}>
              PM
            </Button>
          </div>
        </div>
      )
    }

    // If we're in the "complete" state, show a summary
    if (timeSelectionStep === "complete") {
      return (
        <div>
          <h3 className="text-sm font-medium mb-4">Time selection complete:</h3>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium">Start Time:</p>
              <p className="text-lg">
                {formatSelectedTime(newStaffForm.startHour, newStaffForm.startMinute, newStaffForm.startAmPm)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">End Time:</p>
              <p className="text-lg">
                {formatSelectedTime(newStaffForm.endHour, newStaffForm.endMinute, newStaffForm.endAmPm)}
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => {
                setIsStartTime(true)
                setTimeSelectionStep("hour")
              }}
            >
              Edit Times
            </Button>
          </div>
        </div>
      )
    }
  }

  // Format the selected time for display
  const formatSelectedTime = (hour: string, minute: string, ampm: string) => {
    if (!hour) return ""
    return `${hour}:${minute} ${ampm}`
  }

  // Update the handleAddStaff function to work with the new flow
  const handleAddStaff = () => {
    if (!selectedDate || !newStaffForm.staffId) return

    // Make sure all time fields are filled
    const updatedForm = { ...newStaffForm }
    if (!updatedForm.startHour) updatedForm.startHour = "9"
    if (!updatedForm.startMinute) updatedForm.startMinute = "00"
    if (!updatedForm.startAmPm) updatedForm.startAmPm = "AM"
    if (!updatedForm.endHour) updatedForm.endHour = "5"
    if (!updatedForm.endMinute) updatedForm.endMinute = "00"
    if (!updatedForm.endAmPm) updatedForm.endAmPm = "PM"

    setNewStaffForm(updatedForm)

    const staffId = Number.parseInt(updatedForm.staffId)
    const selectedStaff = allStaff.find((staff) => staff.id === staffId)

    if (!selectedStaff) return

    // Format the time string
    const startTime = `${updatedForm.startHour}:${updatedForm.startMinute} ${updatedForm.startAmPm}`
    const endTime = `${updatedForm.endHour}:${updatedForm.endMinute} ${updatedForm.endAmPm}`
    const timeString = `${startTime} - ${endTime}`

    const newStaffEntry = {
      id: selectedStaff.id,
      name: selectedStaff.name,
      role: selectedStaff.role,
      time: timeString,
    }

    const monthYearKey = getCurrentMonthYearKey()
    const updatedShiftsByMonthYear = { ...shiftsByMonthYear }

    // If this month doesn't exist yet in our shifts object, create it
    if (!updatedShiftsByMonthYear[monthYearKey]) {
      updatedShiftsByMonthYear[monthYearKey] = {}
    }

    // If this date doesn't exist yet in our shifts object, create it
    if (!updatedShiftsByMonthYear[monthYearKey][selectedDate]) {
      updatedShiftsByMonthYear[monthYearKey][selectedDate] = []
    }

    // Check if staff is already scheduled for this day
    const isAlreadyScheduled = updatedShiftsByMonthYear[monthYearKey][selectedDate].some(
      (staff) => staff.id === staffId,
    )

    if (!isAlreadyScheduled) {
      updatedShiftsByMonthYear[monthYearKey][selectedDate] = [
        ...updatedShiftsByMonthYear[monthYearKey][selectedDate],
        newStaffEntry,
      ]
      setShiftsByMonthYear(updatedShiftsByMonthYear)

      // Save to localStorage
      localStorage.setItem("shiftsByMonthYear", JSON.stringify(updatedShiftsByMonthYear))
    }

    // Reset form and close dialog
    setNewStaffForm({
      staffId: "",
      startHour: "",
      startMinute: "00",
      startAmPm: "AM",
      endHour: "",
      endMinute: "00",
      endAmPm: "AM",
    })
    setIsAddStaffDialogOpen(false)
    setTimeSelectionStep("hour")
  }

  // Add this function to handle adding a new position
  const handleAddPosition = () => {
    // In a real app, you would save this to your database
    console.log(`Added new position type: ${newPositionType} with limit: ${positionLimit}`)
    setIsAddPositionDialogOpen(false)
    setNewPositionType("")
    setPositionLimit(0)
  }

  // Add this function to handle creating a shift
  const handleCreateShift = () => {
    // In a real app, you would save this to your database
    console.log("Creating shift with data:", createShiftForm)

    // Process the selected dates or recurring pattern
    let scheduleDates: Date[] = []

    if (calendarView && selectedDates.length > 0) {
      scheduleDates = selectedDates
    } else if (createShiftForm.isRecurring) {
      // Generate dates based on recurring pattern
      const startDate = new Date(createShiftForm.startDate)
      const endDate = new Date(createShiftForm.recurringEndDate)
      const currentDate = new Date(startDate)

      while (currentDate <= endDate) {
        if (createShiftForm.recurringType === "daily") {
          scheduleDates.push(new Date(currentDate))
          currentDate.setDate(currentDate.getDate() + 1)
        } else if (createShiftForm.recurringType === "weekly") {
          const dayOfWeek = currentDate.getDay()
          if (createShiftForm.daysOfWeek.includes(dayOfWeek.toString())) {
            scheduleDates.push(new Date(currentDate))
          }
          currentDate.setDate(currentDate.getDate() + 1)
        }
      }
    } else {
      // Single date
      scheduleDates = [new Date(createShiftForm.startDate)]
    }

    // For each date, create a shift entry
    const staffId = Number.parseInt(createShiftForm.staffId)
    const selectedStaff = allStaff.find((staff) => staff.id === staffId)

    if (!selectedStaff) return

    const updatedShiftsByMonthYear = { ...shiftsByMonthYear }

    scheduleDates.forEach((date) => {
      const monthYearKey = `${date.getMonth() + 1}-${date.getFullYear()}`
      const day = date.getDate()

      // If this month doesn't exist yet in our shifts object, create it
      if (!updatedShiftsByMonthYear[monthYearKey]) {
        updatedShiftsByMonthYear[monthYearKey] = {}
      }

      // If this date doesn't exist yet in our shifts object, create it
      if (!updatedShiftsByMonthYear[monthYearKey][day]) {
        updatedShiftsByMonthYear[monthYearKey][day] = []
      }

      // Format the time string
      const timeString = `${formatTime(createShiftForm.startTime)} - ${formatTime(createShiftForm.endTime)}`

      const newShiftEntry = {
        id: selectedStaff.id,
        name: selectedStaff.name,
        role: selectedStaff.role,
        time: timeString,
      }

      // Check if staff is already scheduled for this day
      const isAlreadyScheduled = updatedShiftsByMonthYear[monthYearKey][day].some((staff) => staff.id === staffId)

      if (!isAlreadyScheduled) {
        updatedShiftsByMonthYear[monthYearKey][day] = [...updatedShiftsByMonthYear[monthYearKey][day], newShiftEntry]
      }
    })

    setShiftsByMonthYear(updatedShiftsByMonthYear)

    // Save to localStorage
    localStorage.setItem("shiftsByMonthYear", JSON.stringify(updatedShiftsByMonthYear))

    // Also update scheduled dates
    const allDates = [...scheduledDates, ...scheduleDates]
    setScheduledDates(allDates)
    localStorage.setItem("scheduledDates", JSON.stringify(allDates.map((d) => d.toISOString())))

    setIsCreateShiftDialogOpen(false)
    resetCreateShiftForm()
  }

  // Helper function to format time from 24h to 12h format
  const formatTime = (time24h: string) => {
    const [hours, minutes] = time24h.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const hours12 = hours % 12 || 12
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  // Reset the create shift form
  const resetCreateShiftForm = () => {
    setCreateShiftForm({
      staffId: "",
      role: "",
      startDate: new Date(),
      endDate: new Date(),
      startTime: "09:00",
      endTime: "17:00",
      isRecurring: false,
      recurringType: "weekly",
      daysOfWeek: [],
      recurringEndDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    })
    setSelectedDates([])
    setCalendarView(false)
  }

  // Add this function to handle day selection in the recurring weekly pattern
  const handleDayOfWeekToggle = (day: string) => {
    const updatedDays = [...createShiftForm.daysOfWeek]
    const index = updatedDays.indexOf(day)

    if (index > -1) {
      updatedDays.splice(index, 1)
    } else {
      updatedDays.push(day)
    }

    setCreateShiftForm({
      ...createShiftForm,
      daysOfWeek: updatedDays,
    })
  }

  // Add this function to handle date selection in calendar view
  const handleDateSelect = (date: Date) => {
    const dateString = date.toDateString()
    const existingIndex = selectedDates.findIndex((d) => d.toDateString() === dateString)

    if (existingIndex > -1) {
      // Remove date if already selected
      const updatedDates = [...selectedDates]
      updatedDates.splice(existingIndex, 1)
      setSelectedDates(updatedDates)
    } else {
      // Add date if not already selected
      setSelectedDates([...selectedDates, date])
    }
  }

  // Add this function to check if a date is selected in calendar view
  const isDateSelected = (date: Date) => {
    return selectedDates.some((d) => d.toDateString() === date.toDateString())
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

  // Generate calendar days for the current month
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)
    const monthYearKey = getCurrentMonthYearKey()
    const shiftsForMonth = shiftsByMonthYear[monthYearKey] || {}

    // Get current date for highlighting today
    const today = new Date()
    const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear
    const currentDay = today.getDate()

    // Create array for calendar days
    const calendarDays = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-24 p-2 bg-gray-100"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === currentDay
      const hasShift = Object.keys(shiftsForMonth).map(Number).includes(day)
      const missingStaff = isMissingStaff(day)
      const date = new Date(currentYear, currentMonth, day)
      const isScheduled = scheduledDates.some(
        (scheduledDate) =>
          scheduledDate.getDate() === day &&
          scheduledDate.getMonth() === currentMonth &&
          scheduledDate.getFullYear() === currentYear,
      )

      calendarDays.push(
        <div
          key={day}
          className={`h-24 p-2 ${isToday ? "bg-blue-50" : missingStaff ? "bg-yellow-50" : "bg-white"} flex flex-col cursor-pointer hover:bg-gray-50`}
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
                {shiftsForMonth[day].length} {shiftsForMonth[day].length === 1 ? "worker" : "workers"}
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

    return calendarDays
  }

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

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
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900"
          >
            <CalendarDays className="mr-3 h-5 w-5 text-gray-500" />
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
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <FileText className="mr-3 h-5 w-5 text-gray-400" />
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
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Link href="/templates/create">
                <Button size="sm">
                  <Plus className="mr-1 h-4 w-4" /> Build Schedule
                </Button>
              </Link>
              <Button size="sm" onClick={() => setIsCreateShiftDialogOpen(true)}>
                <Plus className="mr-1 h-4 w-4" /> Create Shift
              </Button>
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
            <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden shadow">
              {/* Day headers */}
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                <div key={`header-${i}`} className="bg-gray-50 p-2 text-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {renderCalendarDays()}
            </div>
          </div>

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
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                    <h4 className="font-medium text-gray-700">
                      {getMonthName(selectedMonth)} {selectedYear} Schedule
                    </h4>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">New</span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-3">
                      Schedule for {getMonthName(selectedMonth)} {selectedYear}
                    </p>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Created: Today</span>
                      <Link href={`/templates/1`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h4 className="font-medium text-gray-700">March 2025 Schedule</h4>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-3">Schedule for March 2025</p>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Created: 2 weeks ago</span>
                      <Link href={`/templates/2`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b">
                    <h4 className="font-medium text-gray-700">February 2025 Schedule</h4>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-3">Schedule for February 2025</p>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Created: 1 month ago</span>
                      <Link href={`/templates/3`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                  {[
                    { id: 1, name: "Yuki Tanaka", role: "Chef", time: "10:00 AM - 4:00 PM", status: "Checked In" },
                    { id: 5, name: "Takashi Yamamoto", role: "Chef", time: "4:00 PM - 10:00 PM", status: "Scheduled" },
                  ].map((shift, i) => (
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
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            shift.status === "Checked In" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {shift.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Servers */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h4 className="font-medium text-gray-700">Servers</h4>
                </div>
                <ul className="divide-y divide-gray-200">
                  {[
                    { id: 2, name: "Mei Wong", role: "Server", time: "11:00 AM - 7:00 PM", status: "Scheduled" },
                    { id: 4, name: "Hana Kim", role: "Server", time: "4:00 PM - 10:00 PM", status: "Scheduled" },
                  ].map((shift, i) => (
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
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            shift.status === "Checked In" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {shift.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hosts */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h4 className="font-medium text-gray-700">Hosts</h4>
                </div>
                <ul className="divide-y divide-gray-200">
                  {[{ id: 3, name: "Kenji Sato", role: "Host", time: "4:00 PM - 10:00 PM", status: "Scheduled" }].map(
                    (shift, i) => (
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
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              shift.status === "Checked In"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {shift.status}
                          </span>
                        </div>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Dialog for showing workers on selected date */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>
              Staff Schedule - {getMonthName(currentMonth)} {selectedDate}, {currentYear}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {getWorkersForSelectedDate().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Chefs section */}
                {getWorkersByRole().chefs.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-medium text-gray-700">Chefs</h4>
                    </div>
                    <ul className="divide-y divide-gray-200">
                      {getWorkersByRole().chefs.map((worker) => (
                        <li key={worker.id} className="px-4 py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                                {worker.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{worker.name}</p>
                                <p className="text-xs text-gray-500">{worker.time}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openRemoveStaffDialog(worker.id, worker.name)}
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Servers section */}
                {getWorkersByRole().servers.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-medium text-gray-700">Servers</h4>
                    </div>
                    <ul className="divide-y divide-gray-200">
                      {getWorkersByRole().servers.map((worker) => (
                        <li key={worker.id} className="px-4 py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                                {worker.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{worker.name}</p>
                                <p className="text-xs text-gray-500">{worker.time}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openRemoveStaffDialog(worker.id, worker.name)}
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Hosts section */}
                {getWorkersByRole().hosts.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <h4 className="font-medium text-gray-700">Hosts</h4>
                    </div>
                    <ul className="divide-y divide-gray-200">
                      {getWorkersByRole().hosts.map((worker) => (
                        <li key={worker.id} className="px-4 py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                                {worker.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{worker.name}</p>
                                <p className="text-xs text-gray-500">{worker.time}</p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openRemoveStaffDialog(worker.id, worker.name)}
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">No staff scheduled for this day</div>
            )}

            <div className="mt-6 flex justify-end">
              <Button onClick={openAddStaffDialog} className="flex items-center">
                <Plus className="mr-1 h-4 w-4" /> Add Staff
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add a new dialog for adding positions */}
      <Dialog open={isAddPositionDialogOpen} onOpenChange={setIsAddPositionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Position</DialogTitle>
            <DialogDescription>
              Create a new position type and set the maximum number of staff needed.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position-type" className="text-right">
                Position
              </Label>
              <Input
                id="position-type"
                value={newPositionType}
                onChange={(e) => setNewPositionType(e.target.value)}
                placeholder="e.g., Bartender"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position-limit" className="text-right">
                Staff Limit
              </Label>
              <Input
                id="position-limit"
                type="number"
                min="1"
                value={positionLimit || ""}
                onChange={(e) => setPositionLimit(Number.parseInt(e.target.value) || 0)}
                placeholder="Maximum staff needed"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPositionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPosition} disabled={!newPositionType || positionLimit < 1}>
              Add Position
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for adding staff to the selected date */}
      <Dialog open={isAddStaffDialogOpen} onOpenChange={setIsAddStaffDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Add Staff to {getMonthName(currentMonth)} {selectedDate}, {currentYear}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="staff" className="text-right">
                Staff
              </Label>
              <Select
                value={newStaffForm.staffId}
                onValueChange={(value) => setNewStaffForm({ ...newStaffForm, staffId: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableStaff().map((staff) => (
                    <SelectItem key={staff.id} value={staff.id.toString()}>
                      {staff.name} ({staff.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Time</Label>
              <div className="col-span-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-medium">Start:</span>{" "}
                    <span className="text-sm">
                      {formatSelectedTime(newStaffForm.startHour, newStaffForm.startMinute, newStaffForm.startAmPm)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">End:</span>{" "}
                    <span className="text-sm">
                      {formatSelectedTime(newStaffForm.endHour, newStaffForm.endMinute, newStaffForm.endAmPm)}
                    </span>
                  </div>
                </div>

                {renderTimeSelection()}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddStaffDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddStaff} disabled={!newStaffForm.staffId || timeSelectionStep !== "complete"}>
              Add Staff
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for removing staff with reason */}
      <Dialog open={isRemoveStaffDialogOpen} onOpenChange={setIsRemoveStaffDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remove Staff</DialogTitle>
            <DialogDescription>
              Why are you removing {staffToRemove?.name} from the schedule on {getMonthName(currentMonth)}{" "}
              {selectedDate}, {currentYear}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <RadioGroup value={removalReason} onValueChange={setRemovalReason} className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no-show" id="no-show" />
                <Label htmlFor="no-show">No Show</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="call-out" id="call-out" />
                <Label htmlFor="call-out">Call Out</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="shift-swap" id="shift-swap" />
                <Label htmlFor="shift-swap">Shift Swap</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vacation" id="vacation" />
                <Label htmlFor="vacation">Vacation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>

            {removalReason === "other" && (
              <div className="mt-4">
                <Label htmlFor="other-reason">Please specify:</Label>
                <Textarea
                  id="other-reason"
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  placeholder="Enter reason"
                  className="mt-1"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRemoveStaffDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmRemoveStaff}>Confirm Removal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add the Create Shift Dialog after the other dialogs */}
      <Dialog open={isCreateShiftDialogOpen} onOpenChange={setIsCreateShiftDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Shift</DialogTitle>
            <DialogDescription>
              Schedule a new shift for staff members. You can create a single shift or set up a recurring schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="staff" className="text-right">
                Staff Member
              </Label>
              <Select
                value={createShiftForm.staffId}
                onValueChange={(value) => setCreateShiftForm({ ...createShiftForm, staffId: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select staff member" />
                </SelectTrigger>
                <SelectContent>
                  {allStaff.map((staff) => (
                    <SelectItem key={staff.id} value={staff.id.toString()}>
                      {staff.name} ({staff.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={calendarView ? "outline" : "default"}
                  type="button"
                  onClick={() => setCalendarView(false)}
                  className="flex-1"
                >
                  Single/Recurring
                </Button>
                <Button
                  variant={calendarView ? "default" : "outline"}
                  type="button"
                  onClick={() => setCalendarView(true)}
                  className="flex-1"
                >
                  Calendar View
                </Button>
              </div>
            </div>

            {!calendarView ? (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-date" className="text-right">
                    Date
                  </Label>
                  <div className="col-span-3">
                    <Input
                      id="start-date"
                      type="date"
                      value={createShiftForm.startDate.toISOString().split("T")[0]}
                      onChange={(e) =>
                        setCreateShiftForm({
                          ...createShiftForm,
                          startDate: new Date(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="start-time" className="text-right">
                    Start Time
                  </Label>
                  <div className="col-span-3">
                    <Input
                      id="start-time"
                      type="time"
                      value={createShiftForm.startTime}
                      onChange={(e) => setCreateShiftForm({ ...createShiftForm, startTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="end-time" className="text-right">
                    End Time
                  </Label>
                  <div className="col-span-3">
                    <Input
                      id="end-time"
                      type="time"
                      value={createShiftForm.endTime}
                      onChange={(e) => setCreateShiftForm({ ...createShiftForm, endTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right">
                    <Label htmlFor="recurring">Recurring</Label>
                  </div>
                  <div className="col-span-3 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="recurring"
                      checked={createShiftForm.isRecurring}
                      onChange={(e) => setCreateShiftForm({ ...createShiftForm, isRecurring: e.target.checked })}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="recurring" className="text-sm font-normal">
                      Make this a recurring shift
                    </Label>
                  </div>
                </div>

                {createShiftForm.isRecurring && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="recurring-type" className="text-right">
                        Repeat
                      </Label>
                      <Select
                        value={createShiftForm.recurringType}
                        onValueChange={(value) => setCreateShiftForm({ ...createShiftForm, recurringType: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select recurring pattern" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {createShiftForm.recurringType === "weekly" && (
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right pt-2">Days</Label>
                        <div className="col-span-3 flex flex-wrap gap-2">
                          {["0", "1", "2", "3", "4", "5", "6"].map((day) => (
                            <Button
                              key={day}
                              type="button"
                              variant={createShiftForm.daysOfWeek.includes(day) ? "default" : "outline"}
                              className="w-10 h-10 p-0"
                              onClick={() => handleDayOfWeekToggle(day)}
                            >
                              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][Number.parseInt(day)]}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="end-date" className="text-right">
                        End Date
                      </Label>
                      <div className="col-span-3">
                        <Input
                          id="end-date"
                          type="date"
                          value={createShiftForm.recurringEndDate.toISOString().split("T")[0]}
                          onChange={(e) =>
                            setCreateShiftForm({
                              ...createShiftForm,
                              recurringEndDate: new Date(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cal-start-time" className="text-right">
                    Start Time
                  </Label>
                  <div className="col-span-3">
                    <Input
                      id="cal-start-time"
                      type="time"
                      value={createShiftForm.startTime}
                      onChange={(e) => setCreateShiftForm({ ...createShiftForm, startTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cal-end-time" className="text-right">
                    End Time
                  </Label>
                  <div className="col-span-3">
                    <Input
                      id="cal-end-time"
                      type="time"
                      value={createShiftForm.endTime}
                      onChange={(e) => setCreateShiftForm({ ...createShiftForm, endTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium mb-2">Select dates for this shift:</div>
                  <div className="grid grid-cols-7 gap-1">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                        {day}
                      </div>
                    ))}

                    {Array.from({ length: 35 }, (_, i) => {
                      const date = new Date(
                        currentYear,
                        currentMonth,
                        i - getFirstDayOfMonth(currentYear, currentMonth) + 1,
                      )
                      const isCurrentMonth = date.getMonth() === currentMonth
                      const isSelected = isDateSelected(date)

                      return (
                        <div
                          key={i}
                          onClick={() => isCurrentMonth && handleDateSelect(date)}
                          className={`
                      h-8 flex items-center justify-center rounded-md text-sm
                      ${isCurrentMonth ? "cursor-pointer hover:bg-gray-100" : "text-gray-300 bg-gray-50"}
                      ${isSelected ? "bg-blue-100 text-blue-800" : ""}
                    `}
                        >
                          {date.getDate()}
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Selected: {selectedDates.length} date{selectedDates.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateShiftDialogOpen(false)
                resetCreateShiftForm()
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateShift}
              disabled={
                !createShiftForm.staffId ||
                (calendarView && selectedDates.length === 0) ||
                (!calendarView &&
                  createShiftForm.isRecurring &&
                  createShiftForm.recurringType === "weekly" &&
                  createShiftForm.daysOfWeek.length === 0)
              }
            >
              Create Shift
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
