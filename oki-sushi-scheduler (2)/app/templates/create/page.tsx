"use client"

import type React from "react"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Calendar, CalendarDays, Clock, FileText, MessageSquare, RefreshCw, Save, Trash2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CreateTemplatePage() {
  // Template form state
  const [templateForm, setTemplateForm] = useState({
    name: "",
    description: "",
  })

  // Update the position filter to affect both the schedule and staff list
  const [positionFilter, setPositionFilter] = useState<string | null>(null)

  // Time selection dialog state
  const [isTimeDialogOpen, setIsTimeDialogOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState({
    startTime: "11:00",
    endTime: "21:00", // 9 PM
  })
  const [pendingStaffId, setPendingStaffId] = useState<number | null>(null)

  // Add these new state variables at the top of the component
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [calendarSelectedDates, setCalendarSelectedDates] = useState<Date[]>([])

  // Add these new state variables and functions at the top of the component
  const [timeSelectionStep, setTimeSelectionStep] = useState<"hour" | "minute" | "ampm" | "complete">("hour")
  const [isStartTime, setIsStartTime] = useState(true)
  const [customMinutes, setCustomMinutes] = useState("")
  const [showCustomMinutes, setShowCustomMinutes] = useState(false)
  const customMinutesRef = useRef<HTMLInputElement>(null)
  const [timeSelectionState, setTimeSelectionState] = useState({
    startHour: "",
    startMinute: "00",
    startAmPm: "AM",
    endHour: "",
    endMinute: "00",
    endAmPm: "PM",
  })

  // Add these state variables near the top with the other state declarations
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  // Add state for tracking which shift is being edited
  const [editingShiftId, setEditingShiftId] = useState<number | null>(null)

  // Add code to handle the date parameter in the URL
  useEffect(() => {
    // Check if there's a date parameter in the URL
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const dateParam = urlParams.get("date")

      if (dateParam) {
        try {
          const [year, month, day] = dateParam.split("-").map(Number)
          const date = new Date(year, month, day)

          // Set the selected date in the calendar
          setCalendarSelectedDates([date])

          // Set the month and year to match the date
          setSelectedMonth(date.getMonth())
          setSelectedYear(date.getFullYear())

          // Move to step 2 automatically
          setCurrentStep(2)
        } catch (error) {
          console.error("Error parsing date parameter:", error)
        }
      }
    }
  }, [])

  // Add this function to get month names
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

  // Add this function to get year options (current year and 5 years into the future)
  const getYearOptions = () => {
    const currentYear = new Date().getFullYear()
    const years = []

    // Current year
    years.push(currentYear)

    // Future 5 years
    for (let i = 1; i <= 5; i++) {
      years.push(currentYear + i)
    }

    return years
  }

  // Mock data for all staff members with default shifts
  const allStaff = [
    {
      id: 1,
      name: "Yuki Tanaka",
      role: "Chef",
      defaultShift: {
        startTime: "10:00",
        endTime: "16:00",
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      },
    },
    {
      id: 2,
      name: "Mei Wong",
      role: "Server",
      defaultShift: {
        startTime: "11:00",
        endTime: "19:00",
        days: ["monday", "tuesday", "wednesday", "friday", "saturday"],
      },
    },
    {
      id: 3,
      name: "Kenji Sato",
      role: "Host",
      defaultShift: {
        startTime: "16:00",
        endTime: "22:00",
        days: ["wednesday", "thursday", "friday", "saturday", "sunday"],
      },
    },
    {
      id: 4,
      name: "Hana Kim",
      role: "Server",
      defaultShift: {
        startTime: "11:00",
        endTime: "19:00",
        days: ["thursday", "friday", "saturday", "sunday", "monday"],
      },
    },
    {
      id: 5,
      name: "Takashi Yamamoto",
      role: "Chef",
      defaultShift: {
        startTime: "15:00",
        endTime: "23:00",
        days: ["tuesday", "wednesday", "thursday", "friday", "saturday"],
      },
    },
    // Additional Chefs
    {
      id: 6,
      name: "Hiroshi Nakamura",
      role: "Chef",
      defaultShift: {
        startTime: "08:00",
        endTime: "16:00",
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      },
    },
    {
      id: 7,
      name: "Akira Tanaka",
      role: "Chef",
      defaultShift: {
        startTime: "11:00",
        endTime: "19:00",
        days: ["wednesday", "thursday", "friday", "saturday", "sunday"],
      },
    },
    {
      id: 8,
      name: "Sakura Ito",
      role: "Chef",
      defaultShift: {
        startTime: "14:00",
        endTime: "22:00",
        days: ["tuesday", "wednesday", "thursday", "friday", "saturday"],
      },
    },
    {
      id: 9,
      name: "Ryo Suzuki",
      role: "Chef",
      defaultShift: {
        startTime: "06:00",
        endTime: "14:00",
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      },
    },
    // Additional Servers
    {
      id: 10,
      name: "Yuna Park",
      role: "Server",
      defaultShift: {
        startTime: "10:00",
        endTime: "18:00",
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      },
    },
    {
      id: 11,
      name: "Jin Lee",
      role: "Server",
      defaultShift: {
        startTime: "16:00",
        endTime: "00:00",
        days: ["thursday", "friday", "saturday", "sunday", "monday"],
      },
    },
    {
      id: 12,
      name: "Mika Chen",
      role: "Server",
      defaultShift: {
        startTime: "11:00",
        endTime: "19:00",
        days: ["tuesday", "wednesday", "thursday", "friday", "saturday"],
      },
    },
    {
      id: 13,
      name: "Taro Yamada",
      role: "Server",
      defaultShift: {
        startTime: "12:00",
        endTime: "20:00",
        days: ["wednesday", "thursday", "friday", "saturday", "sunday"],
      },
    },
    // Additional Hosts
    {
      id: 14,
      name: "Naomi Kato",
      role: "Host",
      defaultShift: {
        startTime: "09:00",
        endTime: "17:00",
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      },
    },
    {
      id: 15,
      name: "Haruki Watanabe",
      role: "Host",
      defaultShift: {
        startTime: "15:00",
        endTime: "23:00",
        days: ["tuesday", "wednesday", "thursday", "friday", "saturday"],
      },
    },
    {
      id: 16,
      name: "Erika Taniguchi",
      role: "Host",
      defaultShift: {
        startTime: "10:00",
        endTime: "18:00",
        days: ["wednesday", "thursday", "friday", "saturday", "sunday"],
      },
    },
    {
      id: 17,
      name: "Daiki Saito",
      role: "Host",
      defaultShift: {
        startTime: "17:00",
        endTime: "01:00",
        days: ["thursday", "friday", "saturday", "sunday", "monday"],
      },
    },
  ]

  // State for template shifts
  const [shifts, setShifts] = useState<{
    [day: string]: {
      id: number
      staffId: number
      name: string
      role: string
      startTime: string
      endTime: string
    }[]
  }>({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  })

  // State for the current day being edited
  const [currentDay, setCurrentDay] = useState("tuesday")

  // Business hours for each day
  const businessHours = {
    monday: { isOpen: false, hours: "Closed" },
    tuesday: { isOpen: true, hours: "11 AM–9 PM", start: "11:00", end: "21:00" },
    wednesday: { isOpen: true, hours: "11 AM–9 PM", start: "11:00", end: "21:00" },
    thursday: { isOpen: true, hours: "11 AM–9 PM", start: "11:00", end: "21:00" },
    friday: { isOpen: true, hours: "11 AM–9 PM", start: "11:00", end: "21:00" },
    saturday: { isOpen: true, hours: "11 AM–9 PM", start: "11:00", end: "21:00" },
    sunday: { isOpen: true, hours: "11 AM–9 PM", start: "11:00", end: "21:00" },
  }

  // Generate time slots for the schedule
  const generateTimeSlots = () => {
    const slots = []
    const dayInfo = businessHours[currentDay]

    if (!dayInfo.isOpen) {
      return []
    }

    const startHour = Number.parseInt(dayInfo.start.split(":")[0])
    const endHour = Number.parseInt(dayInfo.end.split(":")[0])

    for (let hour = startHour; hour <= endHour; hour++) {
      slots.push(`${hour}:00`)
    }

    return slots
  }

  // Function to open time selection dialog
  const openTimeDialog = (staffId?: number) => {
    console.log("Opening time dialog for staff ID:", staffId || "none selected")
    setPendingStaffId(staffId || null)
    const dayInfo = businessHours[currentDay]
    setSelectedTime({
      startTime: dayInfo.isOpen ? dayInfo.start : "11:00",
      endTime: dayInfo.isOpen ? dayInfo.end : "21:00",
    })

    // Initialize timeSelectionState with default values
    setTimeSelectionState({
      startHour: "9",
      startMinute: "00",
      startAmPm: "AM",
      endHour: "12",
      endMinute: "00",
      endAmPm: "PM", // Always set 12 to PM by default
    })

    setTimeSelectionStep("hour")
    setIsStartTime(true)
    setIsTimeDialogOpen(true)
  }

  // Add these time selection functions
  const switchToEndTime = () => {
    // Auto-fill any missing start time values
    const updatedState = { ...timeSelectionState }
    if (!updatedState.startHour) updatedState.startHour = "9"
    if (!updatedState.startMinute) updatedState.startMinute = "00"
    if (!updatedState.startAmPm) updatedState.startAmPm = "AM"

    setTimeSelectionState(updatedState)
    setIsStartTime(false)
    setTimeSelectionStep("hour")
    setShowCustomMinutes(false)
  }

  const completeTimeSelection = () => {
    const updatedState = { ...timeSelectionState }

    // Fill in any missing values
    if (isStartTime) {
      if (!updatedState.startHour) updatedState.startHour = "9"
      if (!updatedState.startMinute) updatedState.startMinute = "00"
      if (!updatedState.startAmPm) updatedState.startAmPm = "AM"

      // Move to end time
      setIsStartTime(false)
      setTimeSelectionStep("hour")
    } else {
      if (!updatedState.endHour) updatedState.endHour = "5"
      if (!updatedState.endMinute) updatedState.endMinute = "00"
      if (!updatedState.endAmPm) updatedState.endAmPm = "PM"

      // Complete the selection
      setTimeSelectionStep("complete")
    }

    setTimeSelectionState(updatedState)
    setShowCustomMinutes(false)
  }

  // Update the handleHourSelect function to default 12 to PM
  const handleHourSelect = (hour: string) => {
    if (isStartTime) {
      // If hour is 12, default to PM
      const amPm = hour === "12" ? "PM" : timeSelectionState.startAmPm
      setTimeSelectionState({ ...timeSelectionState, startHour: hour, startAmPm: amPm })
      setTimeSelectionStep("minute")
    } else {
      // For end time, auto-determine AM/PM based on start time
      const startHour = Number.parseInt(timeSelectionState.startHour)
      const endHour = Number.parseInt(hour)
      let endAmPm = timeSelectionState.startAmPm

      // If hour is 12, default to PM
      if (hour === "12") {
        endAmPm = "PM"
      }
      // If end hour is less than start hour, flip AM/PM (unless both are 12)
      else if (endHour < startHour && !(startHour === 12 && endHour === 12)) {
        endAmPm = timeSelectionState.startAmPm === "AM" ? "PM" : "AM"
      }

      setTimeSelectionState({ ...timeSelectionState, endHour: hour, endAmPm })
      setTimeSelectionStep("minute")
    }
  }

  const handleMinuteSelect = (minute: string) => {
    if (minute === "other") {
      setShowCustomMinutes(true)
      return
    }

    if (isStartTime) {
      setTimeSelectionState({ ...timeSelectionState, startMinute: minute })
    } else {
      setTimeSelectionState({ ...timeSelectionState, endMinute: minute })
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
      setTimeSelectionState({ ...timeSelectionState, startMinute: minute })
    } else {
      setTimeSelectionState({ ...timeSelectionState, endMinute: minute })
    }
    setShowCustomMinutes(false)
    setCustomMinutes("")
    setTimeSelectionStep("ampm")
  }

  const handleAmPmSelect = (ampm: "AM" | "PM") => {
    if (isStartTime) {
      setTimeSelectionState({ ...timeSelectionState, startAmPm: ampm })
      // Move to end time selection
      setIsStartTime(false)
      setTimeSelectionStep("hour")
    } else {
      setTimeSelectionState({ ...timeSelectionState, endAmPm: ampm })
      // Time selection is complete
      setTimeSelectionStep("complete")
    }
  }

  // Format the selected time for display
  const formatSelectedTime = (hour: string, minute: string, ampm: string) => {
    if (!hour) return ""
    return `${hour}:${minute} ${ampm}`
  }

  // Add a new function to edit an existing shift
  const editShift = (day: string, shiftId: number) => {
    const shift = shifts[day].find((s) => s.id === shiftId)
    if (!shift) return

    // Set the pending staff ID
    setPendingStaffId(shift.staffId)

    // Parse the times to set in the time selection state
    const startTime = formatTime(shift.startTime)
    const endTime = formatTime(shift.endTime)

    // Parse start time
    const [startHour, startMinute, startAmPm] = startTime.split(/[:\s]/)

    // Parse end time
    const [endHour, endMinute, endAmPm] = endTime.split(/[:\s]/)

    // Set the time selection state
    setTimeSelectionState({
      startHour: startHour,
      startMinute: startMinute,
      startAmPm: startAmPm,
      endHour: endHour,
      endMinute: endMinute,
      endAmPm: endAmPm,
    })

    // Set the time selection step to complete
    setTimeSelectionStep("complete")

    // Open the dialog
    setIsTimeDialogOpen(true)

    // Store the shift ID to be edited
    setEditingShiftId(shiftId)
  }

  // Update the addStaffWithCustomTime function to handle edits
  const addStaffWithCustomTime = () => {
    console.log("Adding/editing staff with custom time, pendingStaffId:", pendingStaffId)

    if (!pendingStaffId) {
      console.error("No staff selected")
      alert("Please select a staff member")
      return
    }

    const staff = allStaff.find((s) => s.id === pendingStaffId)
    if (!staff) {
      console.error("Staff not found")
      return
    }

    console.log("Found staff:", staff)

    // Convert time from 12-hour format to 24-hour format
    const convertTo24Hour = (hour: string, minute: string, ampm: string): string => {
      let hourNum = Number.parseInt(hour, 10)

      // Convert hour to 24-hour format
      if (ampm === "PM" && hourNum < 12) {
        hourNum += 12
      } else if (ampm === "AM" && hourNum === 12) {
        hourNum = 0
      }

      return `${hourNum.toString().padStart(2, "0")}:${minute}`
    }

    // Get start and end times in 24-hour format
    const startTime = convertTo24Hour(
      timeSelectionState.startHour || "9",
      timeSelectionState.startMinute || "00",
      timeSelectionState.startAmPm || "AM",
    )

    const endTime = convertTo24Hour(
      timeSelectionState.endHour || "12",
      timeSelectionState.endMinute || "00",
      timeSelectionState.endAmPm || "PM",
    )

    console.log("Adding/editing shift with times:", { startTime, endTime })

    // Create a new shift entry
    const newShiftEntry = {
      id: editingShiftId || Date.now(),
      staffId: pendingStaffId,
      name: staff.name,
      role: staff.role,
      startTime,
      endTime,
    }

    // Update the shifts state
    const updatedShifts = { ...shifts }

    if (editingShiftId) {
      // If editing, replace the existing shift
      updatedShifts[currentDay] = updatedShifts[currentDay].map((shift) =>
        shift.id === editingShiftId ? newShiftEntry : shift,
      )
    } else {
      // Check if staff is already scheduled for this day
      const isAlreadyScheduled = shifts[currentDay].some((shift) => shift.staffId === pendingStaffId)

      if (isAlreadyScheduled) {
        console.log("Staff already scheduled for this day")
        alert("This staff member is already scheduled for this day.")
        setIsTimeDialogOpen(false)
        setPendingStaffId(null)
        setEditingShiftId(null)
        return
      }

      // If adding new, append to the array
      updatedShifts[currentDay] = [...updatedShifts[currentDay], newShiftEntry]
    }

    setShifts(updatedShifts)
    console.log("Updated shifts:", updatedShifts)

    // Close the dialog and reset state
    setIsTimeDialogOpen(false)
    setPendingStaffId(null)
    setEditingShiftId(null)
  }

  // Function to add a staff member with default shift
  const addStaffWithDefaultTime = (staffId: number) => {
    const staff = allStaff.find((s) => s.id === staffId)
    if (!staff || !staff.defaultShift) return

    const updatedShifts = { ...shifts }
    const newShiftEntry = {
      id: Date.now() + Math.random(), // Ensure unique ID
      staffId,
      name: staff.name,
      role: staff.role,
      startTime: staff.defaultShift.startTime,
      endTime: staff.defaultShift.endTime,
    }

    // Check if staff is already scheduled for this day
    const isAlreadyScheduled = updatedShifts[currentDay].some((shift) => shift.staffId === staffId)

    if (!isAlreadyScheduled) {
      updatedShifts[currentDay] = [...updatedShifts[currentDay], newShiftEntry]
      setShifts(updatedShifts)
    }
  }

  // Function to remove a shift from the template
  const removeShift = (day: string, shiftId: number) => {
    const updatedShifts = { ...shifts }
    updatedShifts[day] = updatedShifts[day].filter((shift) => shift.id !== shiftId)
    setShifts(updatedShifts)
  }

  // Function to copy all shifts from one day to another
  const copyDay = (fromDay: string, toDay: string) => {
    const updatedShifts = { ...shifts }

    // Create new shift objects with new IDs to avoid conflicts
    const copiedShifts = shifts[fromDay].map((shift) => ({
      ...shift,
      id: Date.now() + Math.random(), // Ensure unique IDs
    }))

    updatedShifts[toDay] = copiedShifts
    setShifts(updatedShifts)
  }

  // Update the saveTemplate function to include month and year
  const saveTemplate = () => {
    // Get the template name and description
    const templateName = templateForm.name || `${getMonthName(selectedMonth)} ${selectedYear} Schedule`
    const templateDescription =
      templateForm.description || `Schedule for ${getMonthName(selectedMonth)} ${selectedYear}`

    // Create a template object with all the necessary data
    const template = {
      id: Date.now(), // Generate a unique ID
      name: templateName,
      description: templateDescription,
      month: selectedMonth,
      year: selectedYear,
      shifts,
      selectedDates: calendarSelectedDates.map((date) => date.toISOString()),
      createdAt: new Date().toISOString(),
    }

    // In a real app, you would save this to your database
    console.log("Saving template:", template)

    // Save to localStorage
    try {
      // Get existing templates or initialize empty array
      const existingTemplatesJSON = localStorage.getItem("scheduledTemplates") || "[]"
      const existingTemplates = JSON.parse(existingTemplatesJSON)

      // Add new template
      existingTemplates.push(template)

      // Save back to localStorage
      localStorage.setItem("scheduledTemplates", JSON.stringify(existingTemplates))

      // Also save the selected dates separately for easy access
      const existingDatesJSON = localStorage.getItem("scheduledDates") || "[]"
      const existingDates = JSON.parse(existingDatesJSON)

      // Add new dates
      const newDates = calendarSelectedDates.map((date) => date.toISOString())
      const updatedDates = [...existingDates, ...newDates]

      // Save back to localStorage
      localStorage.setItem("scheduledDates", JSON.stringify(updatedDates))

      // Show success message
      alert("Schedule saved successfully!")

      // Redirect to the templates page
      window.location.href = "/templates"
    } catch (error) {
      console.error("Error saving template:", error)
      alert("There was an error saving your schedule. Please try again.")
    }
  }

  // Format time for display
  const formatTime = (time24h: string) => {
    if (!time24h) return ""
    const [hours, minutes] = time24h.split(":").map(Number)
    const period = hours >= 12 ? "PM" : "AM"
    const hours12 = hours % 12 || 12
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  // Get staff filtered by role and position filter
  const getStaffByRole = (role: string) => {
    if (positionFilter && role !== positionFilter) {
      return []
    }
    return allStaff.filter((staff) => staff.role === role)
  }

  // Get shifts for the current day
  const getCurrentShifts = () => {
    return shifts[currentDay]
  }

  // Get filtered shifts based on position filter
  const getFilteredShifts = () => {
    if (!positionFilter) {
      return getCurrentShifts()
    }
    return getCurrentShifts().filter((shift) => shift.role === positionFilter)
  }

  // Check if a staff member is already scheduled for the current day
  const isStaffScheduled = (staffId: number) => {
    return shifts[currentDay].some((shift) => shift.staffId === staffId)
  }

  // Check if a shift overlaps with a specific time slot
  const isShiftInTimeSlot = (shift, timeSlot) => {
    const slotHour = Number.parseInt(timeSlot.split(":")[0])
    const startHour = Number.parseInt(shift.startTime.split(":")[0])
    const endHour = Number.parseInt(shift.endTime.split(":")[0])

    // Check if this time slot falls within the shift's hours
    return slotHour >= startHour && slotHour < endHour
  }

  // Get shifts for a specific time slot
  const getShiftsForTimeSlot = (timeSlot) => {
    return getFilteredShifts().filter((shift) => isShiftInTimeSlot(shift, timeSlot))
  }

  // Add this new function to toggle calendar date selection
  const toggleCalendarDate = (date: Date) => {
    const dateString = date.toDateString()
    const existingIndex = calendarSelectedDates.findIndex((d) => d.toDateString() === dateString)

    if (existingIndex > -1) {
      // Remove date if already selected
      const updatedDates = [...calendarSelectedDates]
      updatedDates.splice(existingIndex, 1)
      setCalendarSelectedDates(updatedDates)
    } else {
      // Add date if not already selected
      setCalendarSelectedDates([...calendarSelectedDates, new Date(date)])
    }
  }

  // Add useEffect for custom minutes input focus
  useEffect(() => {
    if (showCustomMinutes && customMinutesRef.current) {
      customMinutesRef.current.focus()
    }
  }, [showCustomMinutes])

  // Add useEffect to reset time selection when dialog closes
  useEffect(() => {
    if (!isTimeDialogOpen) {
      setTimeSelectionStep("hour")
      setIsStartTime(true)
      setShowCustomMinutes(false)
      setCustomMinutes("")
      setTimeSelectionState({
        startHour: "",
        startMinute: "00",
        startAmPm: "AM",
        endHour: "",
        endMinute: "00",
        endAmPm: "PM",
      })
    }
  }, [isTimeDialogOpen])

  // Update the dialog title based on whether we're editing or adding
  const getDialogTitle = () => {
    if (editingShiftId) {
      return "Edit Shift Time"
    }
    return "Set Custom Shift Time"
  }

  // Update the dialog button text based on whether we're editing or adding
  const getDialogButtonText = () => {
    if (editingShiftId) {
      return "Save Changes"
    }
    return "Add Staff"
  }

  // Group shifts by staff member for consolidated display
  const getConsolidatedShifts = () => {
    const filteredShifts = getFilteredShifts()
    return filteredShifts.map((shift) => ({
      ...shift,
      timeDisplay: `${formatTime(shift.startTime)} - ${formatTime(shift.endTime)}`,
      startHour: Number.parseInt(shift.startTime.split(":")[0]),
      endHour: Number.parseInt(shift.endTime.split(":")[0]),
      initials: shift.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
    }))
  }

  // Get shifts grouped by role
  const getShiftsByRole = () => {
    const roles = ["Chef", "Server", "Host"]
    const shiftsByRole = {}

    roles.forEach((role) => {
      if (!positionFilter || positionFilter === role) {
        shiftsByRole[role] = getCurrentShifts().filter((shift) => shift.role === role)
      }
    })

    return shiftsByRole
  }

  // Add this function to generate calendar days for the selected month/year
  const generateCalendarDays = () => {
    const days = []
    const firstDay = new Date(selectedYear, selectedMonth, 1)
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0)

    // Add empty cells for days before the first day of the month
    const firstDayOfWeek = firstDay.getDay()
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ date: null, isSelected: false })
    }

    // Add cells for each day of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(selectedYear, selectedMonth, i)
      const isSelected = calendarSelectedDates.some((d) => d.toDateString() === date.toDateString())
      days.push({ date, isSelected })
    }

    // Add days from the next month to complete the week
    const lastDayOfWeek = lastDay.getDay()
    if (lastDayOfWeek < 6) {
      const daysToAdd = 6 - lastDayOfWeek
      for (let i = 1; i <= daysToAdd; i++) {
        const date = new Date(selectedYear, selectedMonth + 1, i)
        const isSelected = calendarSelectedDates.some((d) => d.toDateString() === date.toDateString())
        days.push({ date, isSelected })
      }
    }

    return days
  }

  // Update the layout to show a more prominent vertical schedule
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - keep the same */}
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

      <div className="flex-1">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-lg font-semibold text-gray-900">Build Schedule</h1>
            <div className="flex items-center space-x-4">
              <Link href="/templates">
                <Button variant="outline">Cancel</Button>
              </Link>
              {currentStep === 1 ? (
                <Button onClick={() => setCurrentStep(2)}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={saveTemplate}>
                  <Save className="mr-2 h-4 w-4" /> Save Schedule
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left column - Template details and staff selection - only show in step 1 */}
            {currentStep === 1 && (
              <div className="lg:col-span-1">
                {/* Staff selection */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-medium">Staff Selection</h3>
                      <Button variant="outline" size="sm" onClick={() => openTimeDialog()}>
                        <Clock className="mr-1 h-4 w-4" /> Set Custom Time
                      </Button>
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                      <TabsList className="mb-4 w-full flex">
                        <TabsTrigger value="all" className="flex-1">
                          All
                        </TabsTrigger>
                        <TabsTrigger value="chef" className="flex-1">
                          Chefs
                        </TabsTrigger>
                        <TabsTrigger value="server" className="flex-1">
                          Servers
                        </TabsTrigger>
                        <TabsTrigger value="host" className="flex-1">
                          Hosts
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="all" className="space-y-4">
                        {/* Chefs */}
                        <div>
                          <h4 className="text-xs font-medium uppercase text-gray-500 mb-2">Chefs</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {allStaff
                              .filter((staff) => staff.role === "Chef")
                              .map((staff) => (
                                <div key={staff.id} className="flex items-center justify-between">
                                  <Button
                                    variant={isStaffScheduled(staff.id) ? "secondary" : "outline"}
                                    size="sm"
                                    className="justify-start flex-1"
                                    onClick={() => addStaffWithDefaultTime(staff.id)}
                                    disabled={isStaffScheduled(staff.id)}
                                  >
                                    <div className="flex items-center">
                                      <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                                        {staff.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </div>
                                      <span>{staff.name}</span>
                                    </div>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-1"
                                    onClick={() => openTimeDialog(staff.id)}
                                    disabled={isStaffScheduled(staff.id)}
                                  >
                                    <Clock className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                          </div>
                        </div>

                        {/* Servers */}
                        <div>
                          <h4 className="text-xs font-medium uppercase text-gray-500 mb-2">Servers</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {allStaff
                              .filter((staff) => staff.role === "Server")
                              .map((staff) => (
                                <div key={staff.id} className="flex items-center justify-between">
                                  <Button
                                    variant={isStaffScheduled(staff.id) ? "secondary" : "outline"}
                                    size="sm"
                                    className="justify-start flex-1"
                                    onClick={() => addStaffWithDefaultTime(staff.id)}
                                    disabled={isStaffScheduled(staff.id)}
                                  >
                                    <div className="flex items-center">
                                      <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                                        {staff.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </div>
                                      <span>{staff.name}</span>
                                    </div>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-1"
                                    onClick={() => openTimeDialog(staff.id)}
                                    disabled={isStaffScheduled(staff.id)}
                                  >
                                    <Clock className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="chef" className="space-y-4">
                        <div className="grid grid-cols-1 gap-2">
                          {allStaff
                            .filter((staff) => staff.role === "Chef")
                            .map((staff) => (
                              <div key={staff.id} className="flex items-center justify-between">
                                <Button
                                  variant={isStaffScheduled(staff.id) ? "secondary" : "outline"}
                                  size="sm"
                                  className="justify-start flex-1"
                                  onClick={() => addStaffWithDefaultTime(staff.id)}
                                  disabled={isStaffScheduled(staff.id)}
                                >
                                  <div className="flex items-center">
                                    <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                                      {staff.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </div>
                                    <span>{staff.name}</span>
                                  </div>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-1"
                                  onClick={() => openTimeDialog(staff.id)}
                                  disabled={isStaffScheduled(staff.id)}
                                >
                                  <Clock className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="server" className="space-y-4">
                        <div className="grid grid-cols-1 gap-2">
                          {allStaff
                            .filter((staff) => staff.role === "Server")
                            .map((staff) => (
                              <div key={staff.id} className="flex items-center justify-between">
                                <Button
                                  variant={isStaffScheduled(staff.id) ? "secondary" : "outline"}
                                  size="sm"
                                  className="justify-start flex-1"
                                  onClick={() => addStaffWithDefaultTime(staff.id)}
                                  disabled={isStaffScheduled(staff.id)}
                                >
                                  <div className="flex items-center">
                                    <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                                      {staff.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </div>
                                    <span>{staff.name}</span>
                                  </div>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-1"
                                  onClick={() => openTimeDialog(staff.id)}
                                  disabled={isStaffScheduled(staff.id)}
                                >
                                  <Clock className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="host" className="space-y-4">
                        <div className="grid grid-cols-1 gap-2">
                          {allStaff
                            .filter((staff) => staff.role === "Host")
                            .map((staff) => (
                              <div key={staff.id} className="flex items-center justify-between">
                                <Button
                                  variant={isStaffScheduled(staff.id) ? "secondary" : "outline"}
                                  size="sm"
                                  className="justify-start flex-1"
                                  onClick={() => addStaffWithDefaultTime(staff.id)}
                                  disabled={isStaffScheduled(staff.id)}
                                >
                                  <div className="flex items-center">
                                    <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                                      {staff.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </div>
                                    <span>{staff.name}</span>
                                  </div>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-1"
                                  onClick={() => openTimeDialog(staff.id)}
                                  disabled={isStaffScheduled(staff.id)}
                                >
                                  <Clock className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Right column - Weekly schedule - adjust span based on step */}
            <div className={currentStep === 1 ? "lg:col-span-3" : "lg:col-span-4"}>
              <Card>
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-lg font-medium">Schedule Builder</h3>
                        <p className="text-sm text-gray-500">
                          Step {currentStep} of 2: {currentStep === 1 ? "Set Schedule Times" : "Select Days"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={positionFilter === null ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPositionFilter(null)}
                        >
                          All
                        </Button>
                        <Button
                          variant={positionFilter === "Chef" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPositionFilter("Chef")}
                        >
                          Chefs
                        </Button>
                        <Button
                          variant={positionFilter === "Server" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPositionFilter("Server")}
                        >
                          Servers
                        </Button>
                        <Button
                          variant={positionFilter === "Host" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPositionFilter("Host")}
                        >
                          Hosts
                        </Button>
                      </div>
                    </div>

                    {currentStep === 1 ? (
                      <>
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium">
                              {getMonthName(selectedMonth)} {selectedYear} • Hours: 11 AM - 9 PM
                            </h3>
                            <div className="flex items-center space-x-2">
                              <select
                                className="border rounded-md px-2 py-1 text-sm"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                              >
                                {Array.from({ length: 12 }, (_, i) => (
                                  <option key={i} value={i}>
                                    {getMonthName(i)}
                                  </option>
                                ))}
                              </select>
                              <select
                                className="border rounded-md px-2 py-1 text-sm"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                              >
                                {getYearOptions().map((year) => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="p-4">
                          {businessHours[currentDay].isOpen ? (
                            <div className="border rounded-lg overflow-hidden">
                              {/* Time-based schedule - vertical display */}
                              <div className="grid grid-cols-[100px_1fr] border-b">
                                <div className="bg-gray-50 p-3 font-medium text-gray-700 border-r">Time</div>
                                <div className="bg-gray-50 p-3 font-medium text-gray-700">Staff</div>
                              </div>

                              {/* Consolidated staff view */}
                              <div className="grid grid-cols-[100px_1fr] bg-white border-b">
                                <div className="p-4 border-r font-medium text-gray-600">Staff</div>
                                <div className="p-4">
                                  <div className="flex flex-wrap gap-2">
                                    {getConsolidatedShifts().map((shift) => (
                                      <div
                                        key={shift.id}
                                        className={`flex items-center justify-between p-2 rounded-lg ${
                                          shift.role === "Chef"
                                            ? "bg-red-100 text-red-800"
                                            : shift.role === "Server"
                                              ? "bg-blue-100 text-blue-800"
                                              : "bg-green-100 text-green-800"
                                        }`}
                                      >
                                        <div
                                          className="flex items-center cursor-pointer hover:opacity-80"
                                          onClick={() => editShift(currentDay, shift.id)}
                                        >
                                          <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                                            {shift.name
                                              .split(" ")
                                              .map((n) => n[0])
                                              .join("")}
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium underline">{shift.name}</p>
                                            <p className="text-xs">{shift.timeDisplay}</p>
                                          </div>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            removeShift(currentDay, shift.id)
                                          }}
                                          className="h-6 w-6 ml-2"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Time slots with side-by-side staff blocks */}
                              {generateTimeSlots().map((timeSlot, index) => {
                                const timeHour = Number.parseInt(timeSlot.split(":")[0])
                                const formattedTime = formatTime(timeSlot)

                                // Get shifts for this time slot
                                const shiftsInSlot = getShiftsForTimeSlot(timeSlot)

                                // Group shifts by role for side-by-side display
                                const chefShifts = shiftsInSlot.filter((s) => s.role === "Chef")
                                const serverShifts = shiftsInSlot.filter((s) => s.role === "Server")
                                const hostShifts = shiftsInSlot.filter((s) => s.role === "Host")

                                return (
                                  <div
                                    key={timeSlot}
                                    className={`grid grid-cols-[100px_1fr] ${
                                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } border-b last:border-b-0`}
                                  >
                                    <div className="p-4 border-r font-medium text-gray-600">{formattedTime}</div>
                                    <div className="p-4">
                                      <div className="flex flex-wrap gap-2">
                                        {/* Display chef shifts */}
                                        {chefShifts.map((shift) => (
                                          <div
                                            key={`${shift.id}-${timeSlot}`}
                                            className="bg-red-100 text-red-800 px-3 py-2 rounded-md flex items-center"
                                          >
                                            <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                                              {shift.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                            </div>
                                            <span>{shift.name}</span>
                                          </div>
                                        ))}

                                        {/* Display server shifts */}
                                        {serverShifts.map((shift) => (
                                          <div
                                            key={`${shift.id}-${timeSlot}`}
                                            className="bg-blue-100 text-blue-800 px-3 py-2 rounded-md flex items-center"
                                          >
                                            <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                                              {shift.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                            </div>
                                            <span>{shift.name}</span>
                                          </div>
                                        ))}

                                        {/* Display host shifts */}
                                        {hostShifts.map((shift) => (
                                          <div
                                            key={`${shift.id}-${timeSlot}`}
                                            className="bg-green-100 text-green-800 px-3 py-2 rounded-md flex items-center"
                                          >
                                            <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                                              {shift.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                            </div>
                                            <span>{shift.name}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          ) : (
                            <div className="border rounded-lg p-8 text-center text-gray-500">
                              <p className="text-lg font-medium">Closed</p>
                              <p className="mt-2">No staff scheduling needed.</p>
                            </div>
                          )}
                        </div>
                        <div className="mt-6 flex justify-end">
                          <Button onClick={() => setCurrentStep(2)}>
                            Next <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-6">
                          <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-medium text-lg">
                                {getMonthName(selectedMonth)} {selectedYear} - Select Days
                              </h4>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newMonth = selectedMonth === 0 ? 11 : selectedMonth - 1
                                    const newYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear
                                    setSelectedMonth(newMonth)
                                    setSelectedYear(newYear)
                                  }}
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newMonth = selectedMonth === 11 ? 0 : selectedMonth + 1
                                    const newYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear
                                    setSelectedMonth(newMonth)
                                    setSelectedYear(newYear)
                                  }}
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                                  {day}
                                </div>
                              ))}

                              {generateCalendarDays().map((day, i) => {
                                // Check if this date is from the next month
                                const isNextMonth = day.date && day.date.getMonth() !== selectedMonth

                                return (
                                  <div
                                    key={i}
                                    onClick={() => (day.date ? toggleCalendarDate(day.date) : null)}
                                    className={`
                                      h-10 flex items-center justify-center rounded-md text-sm
                                      ${
                                        !day.date
                                          ? "text-gray-300"
                                          : day.isSelected
                                            ? "bg-blue-100 text-blue-800 font-medium"
                                            : isNextMonth
                                              ? "text-gray-400 hover:bg-gray-100 cursor-pointer"
                                              : "hover:bg-gray-100 cursor-pointer"
                                      }
                                    `}
                                  >
                                    {day.date ? day.date.getDate() : ""}
                                  </div>
                                )
                              })}
                            </div>

                            <div className="mt-4 flex justify-between">
                              <div className="text-sm text-gray-500">{calendarSelectedDates.length} days selected</div>
                              <Button variant="outline" size="sm" onClick={() => setCalendarSelectedDates([])}>
                                Clear Selection
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-between">
                          <Button variant="outline" onClick={() => setCurrentStep(1)}>
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back
                          </Button>
                          <Button onClick={saveTemplate}>Save Schedule</Button>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <Dialog open={isTimeDialogOpen} onOpenChange={setIsTimeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
            <DialogDescription>
              {editingShiftId ? "Edit the shift times." : "Select the staff member and shift times."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {/* Add staff selection dropdown if no staff is pre-selected and not editing */}
            {pendingStaffId === null && !editingShiftId && (
              <div className="mb-4">
                <Label htmlFor="staff-select" className="block text-sm font-medium mb-2">
                  Select Staff Member
                </Label>
                <select
                  id="staff-select"
                  className="w-full p-2 border rounded-md"
                  onChange={(e) => setPendingStaffId(Number(e.target.value))}
                  value={pendingStaffId || ""}
                >
                  <option value="">-- Select Staff --</option>
                  <optgroup label="Chefs">
                    {allStaff
                      .filter((s) => s.role === "Chef" && !isStaffScheduled(s.id))
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Servers">
                    {allStaff
                      .filter((s) => s.role === "Server" && !isStaffScheduled(s.id))
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Hosts">
                    {allStaff
                      .filter((s) => s.role === "Host" && !isStaffScheduled(s.id))
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                  </optgroup>
                </select>
              </div>
            )}

            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-sm font-medium">Start:</span>{" "}
                <span className="text-sm">
                  {formatSelectedTime(
                    timeSelectionState.startHour,
                    timeSelectionState.startMinute,
                    timeSelectionState.startAmPm,
                  )}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium">End:</span>{" "}
                <span className="text-sm">
                  {formatSelectedTime(
                    timeSelectionState.endHour,
                    timeSelectionState.endMinute,
                    timeSelectionState.endAmPm,
                  )}
                </span>
              </div>
            </div>

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

            {timeSelectionStep === "hour" && (
              <div>
                <h3 className="text-sm font-medium mb-2">Select {isStartTime ? "start" : "end"} hour:</h3>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                    <Button
                      key={hour}
                      variant="outline"
                      className="h-10"
                      onClick={() => handleHourSelect(hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {timeSelectionStep === "minute" && (
              <div>
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
                      <Button
                        key={minute}
                        variant="outline"
                        className="h-10"
                        onClick={() => handleMinuteSelect(minute)}
                      >
                        :{minute}
                      </Button>
                    ))}
                    <Button variant="outline" className="h-10 col-span-4" onClick={() => handleMinuteSelect("other")}>
                      Other
                    </Button>
                  </div>
                )}
              </div>
            )}

            {timeSelectionStep === "ampm" && (
              <div>
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
            )}

            {timeSelectionStep === "complete" && (
              <div>
                <h3 className="text-sm font-medium mb-4">Time selection complete:</h3>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">Start Time:</p>
                    <p className="text-lg">
                      {formatSelectedTime(
                        timeSelectionState.startHour,
                        timeSelectionState.startMinute,
                        timeSelectionState.startAmPm,
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">End Time:</p>
                    <p className="text-lg">
                      {formatSelectedTime(
                        timeSelectionState.endHour,
                        timeSelectionState.endMinute,
                        timeSelectionState.endAmPm,
                      )}
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
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsTimeDialogOpen(false)
                setEditingShiftId(null)
              }}
            >
              Cancel
            </Button>
            <Button type="button" onClick={() => addStaffWithCustomTime()} disabled={pendingStaffId === null}>
              {getDialogButtonText()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
