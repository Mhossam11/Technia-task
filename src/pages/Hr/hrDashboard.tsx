import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCookie } from "@/lib/cookies";
import { Users, UserCheck, UserX, DollarSign } from "lucide-react";

export default function HrDashboard() {
  const role = getCookie("role")
  console.log(role)
  // Static Employee Stats
  const employeeStats = [
    { title: "Total Employees", value: 120, description: "Active workforce", icon: <Users className="h-5 w-5 text-yellow-600" /> },
    { title: "Active", value: 95, description: "Currently working", icon: <UserCheck className="h-5 w-5 text-yellow-600" /> },
    { title: "On Leave", value: 15, description: "Approved leaves", icon: <UserX className="h-5 w-5 text-yellow-600" /> },
    { title: "New Hires", value: 10, description: "Joined this month", icon: <Users className="h-5 w-5 text-yellow-600" /> },
  ];



  return (
    <div className="p-6 space-y-8 bg-white min-h-screen">
      {/* Employee Stats */}
      <section>
        <h2 className="text-xl font-bold text-yellow-700 mb-4">Employee Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {employeeStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl shadow-sm hover:shadow-md transition">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-yellow-700">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      
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
                {
                  (role === "HR Manager" || role === "Admin" )&& (
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200">
                        Manage Users
                      </Button>
                  )
                }
              </CardContent>
            </Card>

            {/* Salaries Management */}
            <Card className="bg-gradient-to-br from-yellow-50/30 to-amber-50/30 dark:from-yellow-950/10 dark:to-amber-950/10 border-yellow-200/30 dark:border-yellow-700/20 hover:shadow-lg transition-all duration-300">
  <CardHeader>
    <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
      <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400/20 to-amber-500/20">
        <DollarSign className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
      </div>
      Salaries Management
    </CardTitle>
    <CardDescription className="text-yellow-700/70 dark:text-yellow-300/70">
      Payroll tracking and salary distribution
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="flex items-center justify-between">
      <span className="text-sm">Total Payroll</span>
      <Badge variant="outline">$120,000</Badge>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-sm">Pending Payments</span>
      <Badge variant="outline">12</Badge>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-sm">Average Salary</span>
      <Badge variant="outline">$4,500</Badge>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-sm">Processed</span>
      <Badge variant="outline">85%</Badge>
    </div>
    {
      (role === "HR Manager" || role === "Admin") && (
        <div className="flex gap-2">
          <Button className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200" size="sm">
            Run Payroll
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200" size="sm">
            View Reports
          </Button>
        </div>
      )
    }
  </CardContent>
            </Card>
          </div>
    </div>
  );
}
