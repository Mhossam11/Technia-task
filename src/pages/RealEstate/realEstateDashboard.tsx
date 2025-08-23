import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {CheckCircle, Percent,UserCheck, Building, Home, DollarSign, UserPlus } from "lucide-react";

export default function RealEstateDashboard() {
// Real Estate Stats 
const realEstateStats = [
  {
    title: "Total Properties",
    value: 85,
    description: "Managed units",
    icon: <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    colors: {
      bg: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      border: "border-blue-200/50 dark:border-blue-700/30",
      text: "text-blue-700 dark:text-blue-300",
    },
  },
  {
    title: "Available",
    value: 30,
    description: "For rent or sale",
    icon: <Home className="h-5 w-5 text-green-600 dark:text-green-400" />,
    colors: {
      bg: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
      border: "border-green-200/50 dark:border-green-700/30",
      text: "text-green-700 dark:text-green-300",
    },
  },
  {
    title: "Occupied",
    value: 50,
    description: "Currently rented",
    icon: <UserCheck className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
    colors: {
      bg: "bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20",
      border: "border-purple-200/50 dark:border-purple-700/30",
      text: "text-purple-700 dark:text-purple-300",
    },
  },
  {
    title: "Revenue",
    value: "$120k",
    description: "This quarter",
    icon: <DollarSign className="h-5 w-5 text-pink-600 dark:text-pink-400" />,
    colors: {
      bg: "bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20",
      border: "border-pink-200/50 dark:border-pink-700/30",
      text: "text-pink-700 dark:text-pink-300",
    },
  },
];

  
// Leads Stats 
const leadStats = [
  {
    title: "Total Leads",
    icon: <UserPlus className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
    value: 120,
    description: "Active pipeline",
    colors: {
      bg: "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20",
      border: "border-amber-200/50 dark:border-amber-700/30",
      text: "text-amber-700 dark:text-amber-300",
    },
  },
  {
    title: "Pipeline Value",
    icon: <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
    value: "$1.2M",
    description: "Total opportunity",
    colors: {
      bg: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
      border: "border-emerald-200/50 dark:border-emerald-700/30",
      text: "text-emerald-700 dark:text-emerald-300",
    },
  },
  {
    title: "Closed Deals",
    icon: <CheckCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
    value: 15,
    description: "This month",
    colors: {
      bg: "bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-indigo-950/20 dark:to-sky-950/20",
      border: "border-indigo-200/50 dark:border-indigo-700/30",
      text: "text-indigo-700 dark:text-indigo-300",
    },
  },
  {
    title: "Conversion Rate",
    icon: <Percent className="h-4 w-4 text-red-600 dark:text-red-400" />,
    value: "25%",
    description: "Success rate",
    colors: {
      bg: "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20",
      border: "border-red-200/50 dark:border-red-700/30",
      text: "text-red-700 dark:text-red-300",
    },
  },
];

  return (
<div className="col-span-12">
  {/* Real Estate Stats */}
  <section>
    <h2 className="text-xl font-bold text-yellow-700 mb-6">Real Estate Stats</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {realEstateStats.map((stat, index) => (
        <Card
          key={index}
          className={`${stat.colors.bg} ${stat.colors.border} rounded-2xl shadow-sm hover:shadow-md transition`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className={`text-sm font-medium ${stat.colors.text}`}>
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stat.colors.text}`}>{stat.value}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    {/* Leads Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
      {/* Recent Leads */}
      <Card className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle className="text-yellow-700">Recent Leads</CardTitle>
          <CardDescription className="text-gray-600">Latest prospects in your pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            {[
              { id: 1, name: "John Doe", propertyType: "Apartment", budget: 150000, status: "new" },
              { id: 2, name: "Jane Smith", propertyType: "Villa", budget: 350000, status: "in progress" },
              { id: 3, name: "Michael Brown", propertyType: "Office", budget: 220000, status: "closed" },
            ].map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-yellow-50 transition"
              >
                <div>
                  <p className="font-semibold text-yellow-700">{lead.name}</p>
                  <p className="text-sm text-gray-500">{lead.propertyType}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-yellow-600">${lead.budget.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 capitalize">{lead.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

{/* Lead Stats */}
<div className="grid grid-cols-2 md:grid-cols-2 gap-4">
  {leadStats.map((stat, index) => (
    <Card
      key={index}
      className={`${stat.colors.bg} ${stat.colors.border} rounded-2xl shadow-sm hover:shadow-md transition`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {stat.title}
        </CardTitle>
        {stat.icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${stat.colors.text}`}>{stat.value}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
      </CardContent>
    </Card>
  ))}
</div>

    </div>
  </section>
</div>

  );
}
