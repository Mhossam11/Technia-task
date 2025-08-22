import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { mockEmployees, Employee } from "@/data/mockData";
import { DialogTrigger } from "@radix-ui/react-dialog";

const AddEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
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




  const handleSave = () => {
    if (editingEmployee) {
      // update existing
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployee.id ? { ...emp, ...formData } : emp
        )
      );
    } else {
      // add new
      const newEmployee: Employee = {
        id: Date.now().toString(),
        ...formData,
        status: "active", // default new employee as active
      };
      setEmployees((prev) => [...prev, newEmployee]);
    }
    setIsDialogOpen(false);
  };



  return (
    <div className="space-y-6 animate-fade-in">
      {/* Add/Edit Employee Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl shadow-md">
          + Add Employee
        </Button>
      </DialogTrigger>
        <DialogContent className="text-yellow-700 sm:max-w-[600px] rounded-2xl border border-yellow-200 shadow-xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-yellow-700">
              {editingEmployee ? "Edit Employee" : "Add New Employee"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {editingEmployee
                ? "Update employee information"
                : "Enter the details for the new employee"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Name & Email */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Phone & Department */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(val) =>
                    setFormData({ ...formData, department: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Human Resources">
                      Human Resources
                    </SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Salary & Address */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Annual Salary</Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
            className="rounded-xl border-amber-300 text-amber-600 hover:bg-amber-50"
            variant="outline" onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
              Add Employee
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEmployees;
