"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronRight, Clock, Edit, Plus, Search } from "lucide-react"
import { useState } from "react"

export default function EmployeesPage() {
  // State for expanded employee rows
  const [expandedEmployees, setExpandedEmployees] = useState<number[]>([])
  // State for new role dialog
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false)
  const [newRoleName, setNewRoleName] = useState("")
  // State for default shift dialog
  const [isDefaultShiftDialogOpen, setIsDefaultShiftDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [defaultShift, setDefaultShift] = useState({
    startTime: "09:00",
    endTime: "17:00",
    days: [] as string[],
  })

  // Update the handleAddEmployee function to properly save new employees
  const [newEmployeeForm, setNewEmployeeForm] = useState({
    name: "",
    role: "chef",
    email: "",
    phone: "",
  })

  // Add this function to handle form input changes
  const handleFormChange = (field: string, value: string) => {
    setNewEmployeeForm({
      ...newEmployeeForm,
      [field]: value,
    })
  }

  // Add this function to handle adding a new employee
  const handleAddEmployee = () => {
    if (!newEmployeeForm.name.trim() || !newEmployeeForm.role) return

    const newEmployee = {
      id: employees.length + 1,
      name: newEmployeeForm.name,
      role: roles.find((r) => r.toLowerCase() === newEmployeeForm.role.toLowerCase()) || newEmployeeForm.role,
      email: newEmployeeForm.email,
      phone: newEmployeeForm.phone,
      startDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      availability: "Mon-Fri: 9AM-5PM",
      status: "Active",
      defaultShift: {
        startTime: "09:00",
        endTime: "17:00",
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      },
    }

    setEmployees([...employees, newEmployee])
    setNewEmployeeForm({
      name: "",
      role: "chef",
      email: "",
      phone: "",
    })
  }

  // Update the employees array with additional test employees
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Yuki Tanaka",
      role: "Chef",
      email: "yuki.tanaka@okisushi.com",
      phone: "(555) 123-4567",
      startDate: "Jan 15, 2023",
      availability: "Mon-Fri: 9AM-5PM",
      status: "Active",
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
      email: "mei.wong@okisushi.com",
      phone: "(555) 234-5678",
      startDate: "Mar 3, 2023",
      availability: "Mon-Sat: 10AM-8PM",
      status: "Active",
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
      email: "kenji.sato@okisushi.com",
      phone: "(555) 345-6789",
      startDate: "Jun 12, 2023",
      availability: "Wed-Sun: 4PM-10PM",
      status: "Active",
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
      email: "hana.kim@okisushi.com",
      phone: "(555) 456-7890",
      startDate: "Aug 5, 2023",
      availability: "Thu-Mon: 11AM-7PM",
      status: "Active",
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
      email: "takashi.yamamoto@okisushi.com",
      phone: "(555) 567-8901",
      startDate: "Oct 20, 2023",
      availability: "Tue-Sat: 3PM-11PM",
      status: "Active",
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
      email: "hiroshi.nakamura@okisushi.com",
      phone: "(555) 111-2222",
      startDate: "Feb 10, 2023",
      availability: "Mon-Fri: 8AM-4PM",
      status: "Active",
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
      email: "akira.tanaka@okisushi.com",
      phone: "(555) 222-3333",
      startDate: "Mar 15, 2023",
      availability: "Wed-Sun: 11AM-7PM",
      status: "Active",
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
      email: "sakura.ito@okisushi.com",
      phone: "(555) 333-4444",
      startDate: "Apr 5, 2023",
      availability: "Tue-Sat: 2PM-10PM",
      status: "Active",
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
      email: "ryo.suzuki@okisushi.com",
      phone: "(555) 444-5555",
      startDate: "May 20, 2023",
      availability: "Mon-Fri: 6AM-2PM",
      status: "Active",
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
      email: "yuna.park@okisushi.com",
      phone: "(555) 555-6666",
      startDate: "Jan 25, 2023",
      availability: "Mon-Fri: 10AM-6PM",
      status: "Active",
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
      email: "jin.lee@okisushi.com",
      phone: "(555) 666-7777",
      startDate: "Feb 15, 2023",
      availability: "Thu-Mon: 4PM-12AM",
      status: "Active",
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
      email: "mika.chen@okisushi.com",
      phone: "(555) 777-8888",
      startDate: "Mar 10, 2023",
      availability: "Tue-Sat: 11AM-7PM",
      status: "Active",
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
      email: "taro.yamada@okisushi.com",
      phone: "(555) 888-9999",
      startDate: "Apr 1, 2023",
      availability: "Wed-Sun: 12PM-8PM",
      status: "Active",
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
      email: "naomi.kato@okisushi.com",
      phone: "(555) 999-0000",
      startDate: "Feb 5, 2023",
      availability: "Mon-Fri: 9AM-5PM",
      status: "Active",
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
      email: "haruki.watanabe@okisushi.com",
      phone: "(555) 123-0001",
      startDate: "Mar 20, 2023",
      availability: "Tue-Sat: 3PM-11PM",
      status: "Active",
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
      email: "erika.taniguchi@okisushi.com",
      phone: "(555) 234-0002",
      startDate: "Apr 15, 2023",
      availability: "Wed-Sun: 10AM-6PM",
      status: "Active",
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
      email: "daiki.saito@okisushi.com",
      phone: "(555) 345-0003",
      startDate: "May 1, 2023",
      availability: "Thu-Mon: 5PM-1AM",
      status: "Active",
      defaultShift: {
        startTime: "17:00",
        endTime: "01:00",
        days: ["thursday", "friday", "saturday", "sunday", "monday"],
      },
    },
  ])

  // Mock roles data
  const [roles, setRoles] = useState(["Chef", "Server", "Host", "Manager"])

  // Toggle employee expansion
  const toggleEmployeeExpansion = (employeeId: number) => {
    if (expandedEmployees.includes(employeeId)) {
      setExpandedEmployees(expandedEmployees.filter((id) => id !== employeeId))
    } else {
      setExpandedEmployees([...expandedEmployees, employeeId])
    }
  }

  // Check if employee is expanded
  const isEmployeeExpanded = (employeeId: number) => {
    return expandedEmployees.includes(employeeId)
  }

  // Handle adding a new role
  const handleAddRole = () => {
    if (newRoleName.trim()) {
      setRoles([...roles, newRoleName.trim()])
      setNewRoleName("")
      setIsAddRoleDialogOpen(false)
    }
  }

  // Open default shift dialog
  const openDefaultShiftDialog = (employee: any) => {
    setSelectedEmployee(employee)
    setDefaultShift(
      employee.defaultShift || {
        startTime: "09:00",
        endTime: "17:00",
        days: [],
      },
    )
    setIsDefaultShiftDialogOpen(true)
  }

  // Save default shift
  const saveDefaultShift = () => {
    if (!selectedEmployee) return

    const updatedEmployees = employees.map((emp) => {
      if (emp.id === selectedEmployee.id) {
        return {
          ...emp,
          defaultShift: defaultShift,
        }
      }
      return emp
    })

    setEmployees(updatedEmployees)
    setIsDefaultShiftDialogOpen(false)
  }

  // Toggle day selection for default shift
  const toggleDay = (day: string) => {
    if (defaultShift.days.includes(day)) {
      setDefaultShift({
        ...defaultShift,
        days: defaultShift.days.filter((d) => d !== day),
      })
    } else {
      setDefaultShift({
        ...defaultShift,
        days: [...defaultShift.days, day],
      })
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

  // Format days for display
  const formatDays = (days: string[]) => {
    if (!days || days.length === 0) return "None"

    const dayMap: { [key: string]: string } = {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun",
    }

    return days.map((day) => dayMap[day] || day).join(", ")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - same as in page.tsx but with Employees link active */}
      <div className="hidden w-64 bg-white border-r border-gray-200 p-6 flex-col md:flex">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900">OKI SUSHI</h1>
          <p className="text-sm text-gray-500 mt-1">Staff Scheduling</p>
        </div>
        <nav className="space-y-1 flex-1">
          <a
            href="/"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <svg
              className="mr-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Dashboard
          </a>
          <a
            href="/schedule"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <svg
              className="mr-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Schedule
          </a>
          <a
            href="/templates"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <svg
              className="mr-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Build Schedule
          </a>
          <a
            href="/employees"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900"
          >
            <svg
              className="mr-3 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Employees
          </a>
          <a
            href="/shift-trade"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <svg
              className="mr-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 8l-5-5v3.5C11.5 7 8 8 3 13c4-2 8-3 13-3v3.5l5-5.5z"></path>
            </svg>
            Shift Trade
          </a>
          <a
            href="/messages"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <svg
              className="mr-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Messages
          </a>
          <a
            href="/time-off"
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <svg
              className="mr-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Time Off
          </a>
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
            <h1 className="text-lg font-semibold text-gray-900">Employees</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input type="search" placeholder="Search employees..." className="w-64 pl-8 h-9" />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Employee
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new employee. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        className="col-span-3"
                        value={newEmployeeForm.name}
                        onChange={(e) => handleFormChange("name", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <div className="col-span-3 flex items-center gap-2">
                        <Select value={newEmployeeForm.role} onValueChange={(value) => handleFormChange("role", value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role} value={role.toLowerCase()}>
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() => setIsAddRoleDialogOpen(true)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        className="col-span-3"
                        type="email"
                        value={newEmployeeForm.email}
                        onChange={(e) => handleFormChange("email", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        className="col-span-3"
                        type="tel"
                        value={newEmployeeForm.phone}
                        onChange={(e) => handleFormChange("phone", e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddEmployee}>
                      Save Employee
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Employees</TabsTrigger>
              <TabsTrigger value="chef">Chefs</TabsTrigger>
              <TabsTrigger value="server">Servers</TabsTrigger>
              <TabsTrigger value="host">Hosts</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {employees
                      .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
                      .map((employee) => (
                        <div key={employee.id} className="hover:bg-gray-50">
                          <div className="p-4 cursor-pointer" onClick={() => toggleEmployeeExpansion(employee.id)}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {isEmployeeExpanded(employee.id) ? (
                                  <ChevronDown className="h-4 w-4 text-gray-400 mr-2" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                                )}
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                                  {employee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                                  <p className="text-xs text-gray-500">{employee.role}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                  {employee.status}
                                </span>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Expanded content */}
                          {isEmployeeExpanded(employee.id) && (
                            <div className="px-4 pb-3 pl-10">
                              <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
                                <div>
                                  <span className="font-medium">Email:</span> {employee.email}
                                </div>
                                <div>
                                  <span className="font-medium">Phone:</span> {employee.phone}
                                </div>
                                <div>
                                  <span className="font-medium">Start Date:</span> {employee.startDate}
                                </div>
                                <div className="col-span-3">
                                  <span className="font-medium">Availability:</span> {employee.availability}
                                </div>

                                {/* Default Shift Information */}
                                <div className="col-span-3 mt-2 border-t border-gray-200 pt-2">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">Default Shift:</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-blue-600 flex items-center"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        openDefaultShiftDialog(employee)
                                      }}
                                    >
                                      <Clock className="h-3.5 w-3.5 mr-1" />
                                      {employee.defaultShift ? "Edit Shift" : "Set Default Shift"}
                                    </Button>
                                  </div>

                                  {employee.defaultShift ? (
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                      <div>
                                        <span className="font-medium">Time:</span>{" "}
                                        {formatTime(employee.defaultShift.startTime)} -{" "}
                                        {formatTime(employee.defaultShift.endTime)}
                                      </div>
                                      <div>
                                        <span className="font-medium">Days:</span>{" "}
                                        {formatDays(employee.defaultShift.days)}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-gray-400 italic mt-1">No default shift set</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="chef" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {employees
                      .filter((e) => e.role === "Chef")
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((employee) => (
                        <div key={employee.id} className="hover:bg-gray-50">
                          <div className="p-4 cursor-pointer" onClick={() => toggleEmployeeExpansion(employee.id)}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {isEmployeeExpanded(employee.id) ? (
                                  <ChevronDown className="h-4 w-4 text-gray-400 mr-2" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                                )}
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                                  {employee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                                  <p className="text-xs text-gray-500">{employee.role}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                  {employee.status}
                                </span>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Expanded content */}
                          {isEmployeeExpanded(employee.id) && (
                            <div className="px-4 pb-3 pl-10">
                              <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
                                <div>
                                  <span className="font-medium">Email:</span> {employee.email}
                                </div>
                                <div>
                                  <span className="font-medium">Phone:</span> {employee.phone}
                                </div>
                                <div>
                                  <span className="font-medium">Start Date:</span> {employee.startDate}
                                </div>
                                <div className="col-span-3">
                                  <span className="font-medium">Availability:</span> {employee.availability}
                                </div>

                                {/* Default Shift Information */}
                                <div className="col-span-3 mt-2 border-t border-gray-200 pt-2">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">Default Shift:</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-blue-600 flex items-center"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        openDefaultShiftDialog(employee)
                                      }}
                                    >
                                      <Clock className="h-3.5 w-3.5 mr-1" />
                                      {employee.defaultShift ? "Edit Shift" : "Set Default Shift"}
                                    </Button>
                                  </div>

                                  {employee.defaultShift ? (
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                      <div>
                                        <span className="font-medium">Time:</span>{" "}
                                        {formatTime(employee.defaultShift.startTime)} -{" "}
                                        {formatTime(employee.defaultShift.endTime)}
                                      </div>
                                      <div>
                                        <span className="font-medium">Days:</span>{" "}
                                        {formatDays(employee.defaultShift.days)}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-gray-400 italic mt-1">No default shift set</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="server" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {employees
                      .filter((e) => e.role === "Server")
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((employee) => (
                        <div key={employee.id} className="hover:bg-gray-50">
                          <div className="p-4 cursor-pointer" onClick={() => toggleEmployeeExpansion(employee.id)}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {isEmployeeExpanded(employee.id) ? (
                                  <ChevronDown className="h-4 w-4 text-gray-400 mr-2" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                                )}
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                                  {employee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                                  <p className="text-xs text-gray-500">{employee.role}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                  {employee.status}
                                </span>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Expanded content */}
                          {isEmployeeExpanded(employee.id) && (
                            <div className="px-4 pb-3 pl-10">
                              <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
                                <div>
                                  <span className="font-medium">Email:</span> {employee.email}
                                </div>
                                <div>
                                  <span className="font-medium">Phone:</span> {employee.phone}
                                </div>
                                <div>
                                  <span className="font-medium">Start Date:</span> {employee.startDate}
                                </div>
                                <div className="col-span-3">
                                  <span className="font-medium">Availability:</span> {employee.availability}
                                </div>

                                {/* Default Shift Information */}
                                <div className="col-span-3 mt-2 border-t border-gray-200 pt-2">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">Default Shift:</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-blue-600 flex items-center"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        openDefaultShiftDialog(employee)
                                      }}
                                    >
                                      <Clock className="h-3.5 w-3.5 mr-1" />
                                      {employee.defaultShift ? "Edit Shift" : "Set Default Shift"}
                                    </Button>
                                  </div>

                                  {employee.defaultShift ? (
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                      <div>
                                        <span className="font-medium">Time:</span>{" "}
                                        {formatTime(employee.defaultShift.startTime)} -{" "}
                                        {formatTime(employee.defaultShift.endTime)}
                                      </div>
                                      <div>
                                        <span className="font-medium">Days:</span>{" "}
                                        {formatDays(employee.defaultShift.days)}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-gray-400 italic mt-1">No default shift set</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="host" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-200">
                    {employees
                      .filter((e) => e.role === "Host")
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((employee) => (
                        <div key={employee.id} className="hover:bg-gray-50">
                          <div className="p-4 cursor-pointer" onClick={() => toggleEmployeeExpansion(employee.id)}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {isEmployeeExpanded(employee.id) ? (
                                  <ChevronDown className="h-4 w-4 text-gray-400 mr-2" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                                )}
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                                  {employee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                                  <p className="text-xs text-gray-500">{employee.role}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                  {employee.status}
                                </span>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Expanded content */}
                          {isEmployeeExpanded(employee.id) && (
                            <div className="px-4 pb-3 pl-10">
                              <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
                                <div>
                                  <span className="font-medium">Email:</span> {employee.email}
                                </div>
                                <div>
                                  <span className="font-medium">Phone:</span> {employee.phone}
                                </div>
                                <div>
                                  <span className="font-medium">Start Date:</span> {employee.startDate}
                                </div>
                                <div className="col-span-3">
                                  <span className="font-medium">Availability:</span> {employee.availability}
                                </div>

                                {/* Default Shift Information */}
                                <div className="col-span-3 mt-2 border-t border-gray-200 pt-2">
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium">Default Shift:</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 text-blue-600 flex items-center"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        openDefaultShiftDialog(employee)
                                      }}
                                    >
                                      <Clock className="h-3.5 w-3.5 mr-1" />
                                      {employee.defaultShift ? "Edit Shift" : "Set Default Shift"}
                                    </Button>
                                  </div>

                                  {employee.defaultShift ? (
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                      <div>
                                        <span className="font-medium">Time:</span>{" "}
                                        {formatTime(employee.defaultShift.startTime)} -{" "}
                                        {formatTime(employee.defaultShift.endTime)}
                                      </div>
                                      <div>
                                        <span className="font-medium">Days:</span>{" "}
                                        {formatDays(employee.defaultShift.days)}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-gray-400 italic mt-1">No default shift set</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Dialog for adding a new role */}
      <Dialog open={isAddRoleDialogOpen} onOpenChange={setIsAddRoleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
            <DialogDescription>Create a new role for employees. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role-name" className="text-right">
                Role Name
              </Label>
              <Input
                id="role-name"
                className="col-span-3"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
                placeholder="e.g., Bartender"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRole} disabled={!newRoleName.trim()}>
              Add Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for setting default shift */}
      <Dialog open={isDefaultShiftDialogOpen} onOpenChange={setIsDefaultShiftDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Default Shift for {selectedEmployee?.name}</DialogTitle>
            <DialogDescription>
              Set the default shift times and days for this employee. This will be used when creating templates.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={defaultShift.startTime}
                  onChange={(e) => setDefaultShift({ ...defaultShift, startTime: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={defaultShift.endTime}
                  onChange={(e) => setDefaultShift({ ...defaultShift, endTime: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Default Working Days</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "monday", label: "Mon" },
                  { id: "tuesday", label: "Tue" },
                  { id: "wednesday", label: "Wed" },
                  { id: "thursday", label: "Thu" },
                  { id: "friday", label: "Fri" },
                  { id: "saturday", label: "Sat" },
                  { id: "sunday", label: "Sun" },
                ].map((day) => (
                  <Button
                    key={day.id}
                    type="button"
                    variant={defaultShift.days.includes(day.id) ? "default" : "outline"}
                    className="w-12 h-10 p-0"
                    onClick={() => toggleDay(day.id)}
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDefaultShiftDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveDefaultShift}>Save Default Shift</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
