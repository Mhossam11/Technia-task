"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
import {
  Users,
  UserCheck,
  Shield,
  TrendingUp,
  Target,
  Home,
} from "lucide-react"
import { Wrench, CalendarClock, DollarSign } from "lucide-react";

const hrStats = [
  {
    title: "Total Employees",
    value: "1,234",
    change: "+12% from last month",
    changeColor: "text-green-600",
    colors: {
      bg: "bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-950/20 dark:to-yellow-950/20",
      border: "border-amber-200/50 dark:border-amber-700/30",
      text: "text-amber-800 dark:text-amber-200",
      value: "text-amber-700 dark:text-amber-300",
      iconBg: "bg-gradient-to-br from-amber-400/20 to-yellow-500/20",
      icon: "text-amber-600 dark:text-amber-400",
    },
    icon: Users,
  },
  {
    title: "Total Salaries",
    value: "$240,000",
    change: "+15% from last quarter",
    changeColor: "text-green-600",
    colors: {
      bg: "bg-gradient-to-br from-cyan-50/50 to-teal-50/50 dark:from-cyan-950/20 dark:to-teal-950/20",
      border: "border-cyan-200/50 dark:border-teal-700/30",
      text: "text-cyan-800 dark:text-cyan-200",
      value: "text-cyan-700 dark:text-cyan-300",
      iconBg: "bg-gradient-to-br from-cyan-400/20 to-teal-500/20",
      icon: "text-cyan-600 dark:text-cyan-400",
    },
    icon: DollarSign,
  },  
  {
    title: "Growth Rate",
    value: "98.5%",
    change: "Uptime this month",
    changeColor: "text-muted-foreground",
    colors: {
      bg: "bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20",
      border: "border-green-200/50 dark:border-green-700/30",
      text: "text-green-800 dark:text-green-200",
      value: "text-green-700 dark:text-green-300",
      iconBg: "bg-gradient-to-br from-green-400/20 to-emerald-500/20",
      icon: "text-green-600 dark:text-green-400",
    },
    icon: Shield,
  },
  {
    title: "Monthly Revenue",
    value: "$60,500",
    change: "+20% from last month",
    changeColor: "text-green-600",
    colors: {
      bg: "bg-gradient-to-br from-purple-50/50 to-violet-50/50 dark:from-purple-950/20 dark:to-violet-950/20",
      border: "border-purple-200/50 dark:border-purple-700/30",
      text: "text-purple-800 dark:text-purple-200",
      value: "text-purple-700 dark:text-purple-300",
      iconBg: "bg-gradient-to-br from-purple-400/20 to-violet-500/20",
      icon: "text-purple-600 dark:text-purple-400",
    },
    icon: TrendingUp,
  },
];

const stats2 = [
  {
    title: "Maintenance Requests",
    value: "152",
    change: "+8% from last week",
    changeColor: "text-green-600",
    colors: {
      bg: "bg-gradient-to-br from-red-50/50 to-rose-50/50 dark:from-red-950/20 dark:to-rose-950/20",
      border: "border-red-200/50 dark:border-red-700/30",
      text: "text-red-800 dark:text-red-200",
      value: "text-red-700 dark:text-red-300",
      iconBg: "bg-gradient-to-br from-red-400/20 to-rose-500/20",
      icon: "text-red-600 dark:text-red-400",
    },
    icon: Wrench,
  },
  {
    title: "Pending Leave Requests",
    value: "23",
    change: "-3% from last month",
    changeColor: "text-red-600",
    colors: {
      bg: "bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20",
      border: "border-orange-200/50 dark:border-orange-700/30",
      text: "text-orange-800 dark:text-orange-200",
      value: "text-orange-700 dark:text-orange-300",
      iconBg: "bg-gradient-to-br from-orange-400/20 to-amber-500/20",
      icon: "text-orange-600 dark:text-orange-400",
    },
    icon: CalendarClock,
  },
  {
    title: "Total Proprties",
    value: "89",
    change: "+5% from yesterday",
    changeColor: "text-green-600",
    colors: {
      bg: "bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20",
      border: "border-blue-200/50 dark:border-blue-700/30",
      text: "text-blue-800 dark:text-blue-200",
      value: "text-blue-700 dark:text-blue-300",
      iconBg: "bg-gradient-to-br from-blue-400/20 to-cyan-500/20",
      icon: "text-blue-600 dark:text-blue-400",
    },
    icon: Home,
  },
  {
    title: "Total Leads",
    value: "340",
    change: "+10% from last month",
    changeColor: "text-green-600",
    colors: {
      bg: "bg-gradient-to-br from-purple-50/50 to-violet-50/50 dark:from-purple-950/20 dark:to-violet-950/20",
      border: "border-purple-200/50 dark:border-purple-700/30",
      text: "text-purple-800 dark:text-purple-200",
      value: "text-purple-700 dark:text-purple-300",
      iconBg: "bg-gradient-to-br from-purple-400/20 to-violet-500/20",
      icon: "text-purple-600 dark:text-purple-400",
    },
    icon: Target,
  },

];

export default function Dashboard() {
  // window.location.reload()
  return (
    <div className="space-y-8 col-span-12 ">
      {/* Overview Stats */}
      <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
        {hrStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card
              key={i}
              className={`${stat.colors.bg} ${stat.colors.border} hover:shadow-lg transition-all duration-300`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${stat.colors.text}`}>
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.colors.iconBg}`}>
                  <Icon className={`h-4 w-4 ${stat.colors.icon}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.colors.value}`}>
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className={`${stat.changeColor} font-medium`}>
                    {stat.change.includes("%") ? stat.change.split(" ")[0] : ""}
                  </span>{" "}
                  {stat.change.includes("%") ? stat.change.split(" ").slice(1).join(" ") : stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {/* Management Sections */}
      <div className="grid gap-6 md:grid-cols-2 ">
        {/* User Management */}
        <Card className="bg-gradient-to-br from-amber-50/30 to-yellow-50/30 dark:from-amber-950/10 dark:to-yellow-950/10 border-amber-200/30 dark:border-amber-700/20 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <div className="p-2 rounded-lg bg-gradient-to-br from-amber-400/20 to-yellow-500/20">
                <UserCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              User Management
            </CardTitle>
            <CardDescription className="text-amber-700/70 dark:text-amber-300/70">Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Admin Users</span>
              <Badge variant="secondary">3</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">HR Users</span>
              <Badge variant="secondary">12</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Real Estate Users</span>
              <Badge variant="secondary">45</Badge>
            </div>
            <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200">
              Manage Users
            </Button>
          </CardContent>
        </Card>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-2">
              {stats2.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={i}
                    className={`${stat.colors.bg} ${stat.colors.border} hover:shadow-lg transition-all duration-300`}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                      <CardTitle className={`text-sm font-medium ${stat.colors.text}`}>
                        {stat.title}
                      </CardTitle>
                      <div className={`p-2 rounded-lg ${stat.colors.iconBg}`}>
                        <Icon className={`h-4 w-4 ${stat.colors.icon}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-2xl font-bold ${stat.colors.value}`}>
                        {stat.value}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <span className={`${stat.changeColor} font-medium`}>
                          {stat.change.includes("%") ? stat.change.split(" ")[0] : ""}
                        </span>{" "}
                        {stat.change.includes("%") ? stat.change.split(" ").slice(1).join(" ") : stat.change}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
        </div>
      </div>

    </div>

  )
}
