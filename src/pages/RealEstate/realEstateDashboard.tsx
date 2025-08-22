import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, Building, Home, DollarSign } from "lucide-react";

export default function RealEstateDashboard() {

  // Static Real Estate Stats
  const realEstateStats = [
    { title: "Total Properties", value: 85, description: "Managed units", icon: <Building className="h-5 w-5 text-yellow-600" /> },
    { title: "Available", value: 30, description: "For rent or sale", icon: <Home className="h-5 w-5 text-yellow-600" /> },
    { title: "Occupied", value: 50, description: "Currently rented", icon: <UserCheck className="h-5 w-5 text-yellow-600" /> },
    { title: "Revenue", value: "$120k", description: "This quarter", icon: <DollarSign className="h-5 w-5 text-yellow-600" /> },
  ];

  return (
<div className="col-span-12 p-6 space-y-10 bg-white min-h-screen">
  {/* Real Estate Stats */}
  <section>
    <h2 className="text-xl font-bold text-yellow-700 mb-6">Real Estate Stats</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {realEstateStats.map((stat, index) => (
        <Card
          key={index}
          className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl shadow-sm hover:shadow-md transition"
        >
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

    {/* Leads Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
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

      {/* Lead Status Overview */}
      <Card className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl shadow-sm hover:shadow-md transition">
        <CardHeader>
          <CardTitle className="text-yellow-700">Lead Status Overview</CardTitle>
          <CardDescription className="text-gray-600">Distribution of leads by status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { status: "new", count: 5 },
              { status: "in progress", count: 8 },
              { status: "closed", count: 3 },
            ].map(({ status, count }) => {
              const totalLeads = 16; // sum of all counts
              return (
                <div key={status} className="flex items-center justify-between">
                  <p className="font-medium text-gray-700 capitalize">{status}</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-yellow-100 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${(count / totalLeads) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-yellow-700">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</div>

  );
}
