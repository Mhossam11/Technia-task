import { useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";

import {  Search, Edit, Trash2, Mail, Phone, Users, UserCheck, UserMinus, UserPlus } from "lucide-react";
import { mockEmployees, Employee } from "@/data/mockData";
import AddEmployees from "./addEmployee";
import { getCookie } from "@/lib/cookies";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddEmployeeModal from "./addEmployeeModal";

const Employees = () => {
  
  const role = getCookie("role")
  // Employee stats array
const employeeStats = [
  {
    title: "Total Employees",
    icon: <Users className="h-4 w-4 text-yellow-500" />,
    value: 120,
    description: "All departments",
  },
  {
    title: "Active",
    icon: <UserCheck className="h-4 w-4 text-yellow-500" />,
    value: 95,
    description: "Currently employed",
  },
  {
    title: "On Leave",
    icon: <UserMinus className="h-4 w-4 text-yellow-500" />,
    value: 15,
    description: "Temporary leave",
  },
  {
    title: "New Hires",
    icon: <UserPlus className="h-4 w-4 text-yellow-500" />,
    value: 10,
    description: "This month",
  },
];


  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // form state
  const [formData, setFormData] = useState<Omit<Employee, "id" | "status">>({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: 0,
    address: "",
  });

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      salary: employee.salary,
      address: employee.address,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };



  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        Active
      </Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
  {/* Header */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
        Employees
      </h1>
      <p className="text-gray-600">Manage your organization's workforce</p>
    </div>
    {
      (role === "HR Manager" || role === "Admin") && (
        <AddEmployees/>
      )
    }
  </div>
{/* Employee Stats */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  {employeeStats.map((stat, index) => (
    <Card
      key={index}
      className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl shadow-sm hover:shadow-md transition"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-yellow-700">
          {stat.title}
        </CardTitle>
        {stat.icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-yellow-600">{stat.value}</div>
        <p className="text-xs text-gray-500">{stat.description}</p>
      </CardContent>
    </Card>
  ))}
</div>

  
  {/* Search and Filters */}
  <Card className="bg-white border border-yellow-200 shadow-sm rounded-2xl">
    <CardHeader>
      <CardTitle className="text-lg font-semibold text-yellow-600">
        Search & Filter
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 w-4 h-4" />
          <Input
            placeholder="Search by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border border-yellow-300 focus:ring-2 focus:ring-yellow-500 rounded-xl"
          />
        </div>
      </div>
    </CardContent>
  </Card>

  {/* Employees Table */}
  <Card className="bg-white border border-yellow-200 rounded-2xl shadow-sm">
    <CardHeader>
      <CardTitle className="text-yellow-700">Employee Directory</CardTitle>
      <CardDescription className="text-gray-600">
        {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? "s" : ""} found
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow className="bg-yellow-50">
            <TableHead className="text-yellow-700">Employee</TableHead>
            <TableHead className="text-yellow-700">Department</TableHead>
            <TableHead className="text-yellow-700">Salary</TableHead>
            <TableHead className="text-yellow-700">Status</TableHead>
            {
              (role === "HR Manager" || role === "Admin")&& (
                <TableHead className="text-right text-yellow-700">Actions</TableHead>
              )
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.map((employee) => (
            <TableRow
              key={employee.id}
              className="hover:bg-yellow-50 transition cursor-pointer"
            >
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{employee.name}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-3 h-3 text-yellow-500" />
                    {employee.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-3 h-3 text-yellow-500" />
                    {employee.phone}
                  </div>
                </div>
              </TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell className="text-yellow-700 font-semibold">
                ${employee.salary.toLocaleString()}
              </TableCell>
              <TableCell>{getStatusBadge(employee.status)}</TableCell>
              {
                (role === "HR Manager" || role === "Admin") && (
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {/* <Button
                      variant="ghost"
                      size="sm"
                      className="text-yellow-600 hover:bg-yellow-100 rounded-lg"
                      onClick={() => handleEditEmployee(employee)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button> */}
                    <AddEmployeeModal
                      isDialogOpen={isDialogOpen}
                      setIsDialogOpen={setIsDialogOpen}
                      editingEmployee={editingEmployee}
                      formData={formData}
                      setFormData={setFormData}
                      employee={employee}
                      handleEditEmployee={handleEditEmployee}
                      handleSave={() => {
                        if (editingEmployee) {
                          setEmployees((prev) =>
                            prev.map((emp) =>
                              emp.id === editingEmployee.id ? { ...emp, ...formData } : emp
                            )
                          );
                        }
                        setIsDialogOpen(false);
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-100 rounded-lg"
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
                )
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
      {/* Add/Edit Employee Dialog */}
      {/* <AddEmployees/> */}
    </div>
  );
};

export default Employees;
