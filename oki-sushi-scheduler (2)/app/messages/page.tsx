import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, CalendarDays, Clock, MessageSquare, RefreshCw, Search, Send, Users } from "lucide-react"
import Link from "next/link"

export default function MessagesPage() {
  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: "Admin Kimura",
      role: "Owner",
      lastMessage: "Please check the new schedule for next week.",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      name: "Yuki Tanaka",
      role: "Chef",
      lastMessage: "I'll be there at 9:30 to prep for the lunch rush.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 3,
      name: "Mei Wong",
      role: "Server",
      lastMessage: "Thanks for covering my shift last weekend!",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 4,
      name: "Kitchen Staff",
      role: "Group",
      lastMessage: "New menu items will be available starting Monday.",
      time: "Apr 10",
      unread: false,
      members: 5,
    },
    {
      id: 5,
      name: "Front of House",
      role: "Group",
      lastMessage: "Remember to check the reservation system before your shift.",
      time: "Apr 8",
      unread: false,
      members: 8,
    },
  ]

  // Mock data for the active conversation
  const activeConversation = {
    id: 1,
    name: "Admin Kimura",
    role: "Owner",
    online: true,
    messages: [
      {
        id: 1,
        sender: "Admin Kimura",
        content: "Hi there! I've updated the schedule for next week.",
        time: "10:15 AM",
        isMe: false,
      },
      {
        id: 2,
        sender: "Admin Kimura",
        content: "Please check the new schedule for next week.",
        time: "10:30 AM",
        isMe: false,
      },
      {
        id: 3,
        sender: "Me",
        content: "Thanks for letting me know. I'll take a look at it right away.",
        time: "10:32 AM",
        isMe: true,
      },
      {
        id: 4,
        sender: "Admin Kimura",
        content: "Great! Let me know if you have any questions or concerns.",
        time: "10:35 AM",
        isMe: false,
      },
    ],
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
            className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-900"
          >
            <MessageSquare className="mr-3 h-5 w-5 text-gray-500" />
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

      {/* Main content - Messages */}
      <div className="flex-1 flex">
        {/* Conversations list */}
        <div className="w-80 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Search messages..." className="pl-8 h-9" />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-8rem)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  conversation.id === activeConversation.id ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                        {conversation.members ? (
                          <Users className="h-5 w-5" />
                        ) : (
                          conversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        )}
                      </div>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{conversation.name}</p>
                      <p className="text-xs text-gray-500">
                        {conversation.members ? `${conversation.members} members` : conversation.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{conversation.time}</p>
                    {conversation.unread && <div className="h-2 w-2 rounded-full bg-blue-500 ml-auto mt-1"></div>}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1 truncate">{conversation.lastMessage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active conversation */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
                  {activeConversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                {activeConversation.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{activeConversation.name}</p>
                <p className="text-xs text-gray-500">{activeConversation.role}</p>
              </div>
            </div>
            <div>
              <Button variant="ghost" size="sm">
                View Profile
              </Button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {activeConversation.messages.map((message) => (
                <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] ${message.isMe ? "order-2" : "order-1"}`}>
                    {!message.isMe && (
                      <div className="flex items-center mb-1">
                        <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 mr-2">
                          {message.sender
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <p className="text-xs text-gray-500">{message.sender}</p>
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        message.isMe
                          ? "bg-blue-500 text-white rounded-tr-none"
                          : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <Input type="text" placeholder="Type a message..." className="flex-1" />
              <Button className="ml-2" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
