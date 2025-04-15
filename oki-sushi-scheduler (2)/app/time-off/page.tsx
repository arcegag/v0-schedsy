"use client"

import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Calendar, CalendarDays, Clock, MessageSquare, RefreshCw, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function TimeOffPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock data for time off requests
  const timeOffRequests = [
    {
      id: 1,
      type: "Vacation",
      startDate: "April 20, 2025",
      endDate: "April 25, 2025",
      status: "Pending",
      requestedOn: "April 10, 2025",
    },
    {
      id: 2,
      type: "Sick Leave",
      startDate: "March 15, 2025",
      endDate: "March 16, 2025",
      status: "Approved",
      requestedOn: "March 14, 2025",
    },
    {
      id: 3,
      type: "Personal Day",
      startDate: "February 5, 2025",
      endDate: "February 5, 2025",
      status: "Approved",
      requestedOn: "January 28, 2025",
    },
  ]

  // Mock data for upcoming time off
  const upcomingTimeOff = [
    {
      id: 1,
      employee: "Yuki Tanaka",
      role: "Chef",
      type: "Vacation",
      startDate: "April 18, 2025",
      endDate: "April 22, 2025",
    },
    {
      id: 2,
      employee: "Mei Wong",
      role: "Server",
      type: "Personal Day",
      startDate: "April 25, 2025",
      endDate: "April 25, 2025",
    },
  ]

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
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900"
          >
            <Calendar className="mr-3 h-5 w-5 text-gray-500" />
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
            <h1 className="text-lg font-semibold text-gray-900">Time Off Requests</h1>
            <div className="flex items-center space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Request Time Off</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Request Time Off</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to request time off. Your request will be reviewed by management.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vacation">Vacation</SelectItem>
                          <SelectItem value="sick">Sick Leave</SelectItem>
                          <SelectItem value="personal">Personal Day</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="start-date" className="text-right">
                        Start Date
                      </Label>
                      <Input id="start-date" type="date" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="end-date" className="text-right">
                        End Date
                      </Label>
                      <Input id="end-date" type="date" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="reason" className="text-right">
                        Reason
                      </Label>
                      <Textarea id="reason" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Submit Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="your-requests" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="your-requests">Your Requests</TabsTrigger>
                  <TabsTrigger value="team-calendar">Team Calendar</TabsTrigger>
                </TabsList>

                <TabsContent value="your-requests" className="space-y-4">
                  {timeOffRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{request.type}</h3>
                            <p className="text-sm text-gray-500">
                              {request.startDate === request.endDate
                                ? request.startDate
                                : `${request.startDate} - ${request.endDate}`}
                            </p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                request.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : request.status === "Approved"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {request.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">Requested on {request.requestedOn}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="team-calendar" className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Upcoming Time Off</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTimeOff.map((timeOff) => (
                      <div
                        key={timeOff.id}
                        className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                          {timeOff.employee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{timeOff.employee}</p>
                          <p className="text-xs text-gray-500">{timeOff.role}</p>
                          <div className="mt-1 flex items-center">
                            <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-sm mr-2">
                              {timeOff.type}
                            </span>
                            <span className="text-xs text-gray-500">
                              {timeOff.startDate === timeOff.endDate
                                ? timeOff.startDate
                                : `${timeOff.startDate} - ${timeOff.endDate}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
