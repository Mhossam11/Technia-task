"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
import {
  Users,
  UserCheck,
  Shield,
  Database,
  Activity,
  TrendingUp,


} from "lucide-react"

export default function Dashboard() {
  // window.location.reload()
  return (
    <div className="space-y-8 p-5">
      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-950/20 dark:to-yellow-950/20 border-amber-200/50 dark:border-amber-700/30 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-800 dark:text-amber-200">Total Users</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-br from-amber-400/20 to-yellow-500/20">
                  <Users className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">1,234</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 font-medium">+12%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200/50 dark:border-blue-700/30 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">Active Sessions</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-400/20 to-cyan-500/20">
                  <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">89</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 font-medium">+5%</span> from yesterday
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200/50 dark:border-green-700/30 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">System Health</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-400/20 to-emerald-500/20">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-700 dark:text-green-300">98.5%</div>
                <p className="text-xs text-muted-foreground">Uptime this month</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50/50 to-violet-50/50 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200/50 dark:border-purple-700/30 hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">Revenue</CardTitle>
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-400/20 to-violet-500/20">
                  <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">$45,231</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 font-medium">+20%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Management Sections */}
          <div className="grid gap-6 md:grid-cols-2">
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

            {/* Database Management */}
            <Card className="bg-gradient-to-br from-green-50/30 to-emerald-50/30 dark:from-green-950/10 dark:to-emerald-950/10 border-green-200/30 dark:border-green-700/20 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-400/20 to-emerald-500/20">
                    <Database className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  Database Management
                </CardTitle>
                <CardDescription className="text-green-700/70 dark:text-green-300/70">Database operations and maintenance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Backup</span>
                  <Badge variant="outline">2 hours ago</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database Size</span>
                  <Badge variant="outline">2.4 GB</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Connections</span>
                  <Badge variant="outline">23</Badge>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200" size="sm">
                    Backup Now
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200" size="sm">
                    Optimize
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>

        </div>

  )
}
