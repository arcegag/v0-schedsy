import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CalendarDays, Check, Clock, MessageSquare, RefreshCw, Users, X } from "lucide-react"
import Link from "next/link"

export default function ShiftTradePage() {
  // Mock data for shift trade requests
  const tradeRequests = [
    {
      id: 1,
      requester: "Mei Wong",
      requesterRole: "Server",
      date: "April 15, 2025",
      time: "11:00 AM - 7:00 PM",
      reason: "Family event",
      status: "Pending",
      possibleTrades: ["Hana Kim", "Kenji Sato"],
    },
    {
      id: 2,
      requester: "Yuki Tanaka",
      requesterRole: "Chef",
      date: "April 18, 2025",
      time: "10:00 AM - 4:00 PM",
      reason: "Doctor appointment",
      status: "Approved",
      approvedWith: "Takashi Yamamoto",
    },
    {
      id: 3,
      requester: "Kenji Sato",
      requesterRole: "Host",
      date: "April 20, 2025",
      time: "4:00 PM - 10:00 PM",
      reason: "Personal",
      status: "Declined",
      declinedReason: "No available staff",
    },
  ]

  // Mock data for your shifts that can be traded
  const yourShifts = [
    {
      id: 1,
      date: "April 14, 2025",
      day: "Monday",
      time: "11:00 AM - 7:00 PM",
      role: "Server",
    },
    {
      id: 2,
      date: "April 16, 2025",
      day: "Wednesday",
      time: "10:00 AM - 4:00 PM",
      role: "Server",
    },
    {
      id: 3,
      date: "April 19, 2025",
      day: "Saturday",
      time: "4:00 PM - 10:00 PM",
      role: "Server",
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
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900"
          >
            <RefreshCw className="mr-3 h-5 w-5 text-gray-500" />
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
            <h1 className="text-lg font-semibold text-gray-900">Shift Trade</h1>
            <div className="flex items-center space-x-4">
              <Button>Request Shift Trade</Button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Tabs defaultValue="requests" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="requests">Trade Requests</TabsTrigger>
              <TabsTrigger value="your-shifts">Your Shifts</TabsTrigger>
              <TabsTrigger value="available">Available Shifts</TabsTrigger>
            </TabsList>

            <TabsContent value="requests" className="space-y-4">
              <div className="grid gap-4">
                {tradeRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">Shift Trade Request</CardTitle>
                        <div
                          className={`px-2 py-1 text-xs rounded-full ${
                            request.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : request.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                            {request.requester
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium">{request.requester}</p>
                            <p className="text-xs text-gray-500">{request.requesterRole}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gray-500">Date:</div>
                          <div>{request.date}</div>
                          <div className="text-gray-500">Time:</div>
                          <div>{request.time}</div>
                          <div className="text-gray-500">Reason:</div>
                          <div>{request.reason}</div>

                          {request.status === "Pending" && (
                            <>
                              <div className="text-gray-500">Possible Trades:</div>
                              <div>
                                {request.possibleTrades.map((person, i) => (
                                  <span key={i} className="block">
                                    {person}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}

                          {request.status === "Approved" && (
                            <>
                              <div className="text-gray-500">Approved With:</div>
                              <div>{request.approvedWith}</div>
                            </>
                          )}

                          {request.status === "Declined" && (
                            <>
                              <div className="text-gray-500">Reason:</div>
                              <div>{request.declinedReason}</div>
                            </>
                          )}
                        </div>

                        {request.status === "Pending" && (
                          <div className="flex justify-end space-x-2 mt-2">
                            <Button variant="outline" size="sm" className="flex items-center">
                              <X className="mr-1 h-4 w-4" /> Decline
                            </Button>
                            <Button size="sm" className="flex items-center">
                              <Check className="mr-1 h-4 w-4" /> Approve
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="your-shifts" className="space-y-4">
              <div className="grid gap-4">
                {yourShifts.map((shift) => (
                  <Card key={shift.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{shift.date}</h3>
                          <p className="text-sm text-gray-500">{shift.day}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{shift.time}</p>
                          <p className="text-sm text-gray-500">{shift.role}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          Request Trade
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="available" className="space-y-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">No shifts available for trade at this time.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
