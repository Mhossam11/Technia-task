import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {  Search, DollarSign, TrendingUp, Calendar, Edit, Trash } from "lucide-react";
import { mockSalaries, Salary } from "@/data/mockData";
import AddSalaries from "./addSalaries";
import { getCookie } from "@/lib/cookies";
import EditSalaryModal from "./editSalaryModal";
import { Button } from "@/components/ui/button";

const stats = [
    {
      title: "Total Payroll",
      icon: <DollarSign className="h-4 w-4 text-yellow-600" />,
    //   value: `$${totalPayroll.toLocaleString()}`,
      description: "This period",
    },
    {
      title: "Pending Payments",
      icon: <Calendar className="h-4 w-4 text-yellow-600" />,
    //   value: pendingPayments,
      description: "Require processing",
    },
    {
      title: "Avg Salary",
      icon: <TrendingUp className="h-4 w-4 text-yellow-600" />,
    //   value: `$${Math.round(totalPayroll / salaries.length).toLocaleString()}`,
      description: "Per employee",
    },
    {
      title: "Processed",
      icon: <DollarSign className="h-4 w-4 text-yellow-600" />,
    //   value: salaries.filter((s) => s.status === "paid").length,
      description: "Successfully paid",
    },
  ];
const Salaries = () => {

  const [salaries, setSalaries] = useState<Salary[]>(mockSalaries);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSalary, setEditingSalary] = useState<Salary | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);  const role= getCookie("role");

  const handleDelete=(id:string)=>{
    setSalaries((prev) => prev.filter((salary) => salary.id !== id))
  }
  const handleSaveSalary = (updatedSalary: Salary) => {
    setSalaries((prev) =>
      prev.map((s) => (s.id === updatedSalary.id ? updatedSalary : s))
    );
  };
  const filteredSalaries = salaries.filter(
    (salary) =>
      salary.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salary.payPeriod.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      paid: { variant: "default" as const, className: "bg-green-100 text-green-800", label: "Paid" },
      pending: { variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800", label: "Pending" },
      processing: { variant: "secondary" as const, className: "bg-blue-100 text-blue-800", label: "Processing" },
    };

    const config = variants[status as keyof typeof variants];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };
  const handleEditClick = (salary: any) => {
    setEditingSalary(salary);
    setIsEditOpen(true);
  };


  return (
<div className="space-y-6 animate-fade-in">
  {/* Header */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
        Salaries
      </h1>
      <p className="text-neutral-600">Manage employee compensation and payroll</p>
    </div>
    {
      (role === "HR Manager" || role === "Admin") && (
        <AddSalaries onAdd={(salary) => console.log("Added salary:", salary)}/>
      )
    }
  </div>

  {/* Stats */}
 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl shadow-sm hover:shadow-md transition"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-neutral-700">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <p className="text-xs text-neutral-500">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  {/* Search */}
  <Card className="bg-white border border-yellow-100 shadow-sm">
    <CardHeader>
      <CardTitle className="text-lg text-yellow-700">Search & Filter</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-600 w-4 h-4" />
        <Input
          placeholder="Search by employee name or pay period..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-yellow-300 focus:ring-yellow-500"
        />
      </div>
    </CardContent>
  </Card>

  {/* Salaries Table */}
  <Card className="bg-white border border-yellow-100 shadow-sm">
    <CardHeader>
      <CardTitle className="text-yellow-700">Salary Records</CardTitle>
      <CardDescription className="text-neutral-600">
        {filteredSalaries.length} salary record{filteredSalaries.length !== 1 ? "s" : ""} found
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader className="bg-yellow-50">
          <TableRow>
            <TableHead className="text-yellow-700">Employee</TableHead>
            <TableHead className="text-yellow-700">Pay Period</TableHead>
            <TableHead className="text-yellow-700">Base Salary</TableHead>
            <TableHead className="text-yellow-700">Bonus</TableHead>
            <TableHead className="text-yellow-700">Deductions</TableHead>
            <TableHead className="text-yellow-700">Total</TableHead>
            <TableHead className="text-yellow-700">Status</TableHead>
            <TableHead className="text-yellow-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSalaries.map((salary) => (
            <TableRow
              key={salary.id}
              className="hover:bg-yellow-50 transition cursor-pointer"
            >
              <TableCell className="font-medium">{salary.employeeName}</TableCell>
              <TableCell>{salary.payPeriod}</TableCell>
              <TableCell>${salary.baseSalary.toLocaleString()}</TableCell>
              <TableCell>
                <span className="text-green-600">+${salary.bonus.toLocaleString()}</span>
              </TableCell>
              <TableCell>
                <span className="text-red-600">-${salary.deductions.toLocaleString()}</span>
              </TableCell>
              <TableCell className="font-semibold text-yellow-700">
                ${salary.totalSalary.toLocaleString()}
              </TableCell>
              <TableCell>{getStatusBadge(salary.status)}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEditClick(salary)}
                  className="text-amber-500"
                >
                  <Edit/>
                </Button>
                <Button
                  onClick={() => handleDelete(salary.id)}
                  className="text-red-500"
                >
                  <Trash/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <EditSalaryModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        salary={editingSalary}
        onSave={handleSaveSalary}
      />
    </CardContent>
  </Card>
</div>

  );
};

export default Salaries;
