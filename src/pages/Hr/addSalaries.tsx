import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Salary {
  id: number;
  employeeName: string;
  basic: number;
  bonus: number;
  deductions: number;
  status: "pending" | "paid" | "cancelled";
  createdAt: string;
}

interface AddSalaryModalProps {
  onAdd: (salary: Omit<Salary, "id">) => void;
}

export default function AddSalaries({ onAdd }: AddSalaryModalProps) {
  const [form, setForm] = useState<Omit<Salary, "id">>({
    employeeName: "",
    basic: 0,
    bonus: 0,
    deductions: 0,
    status: "pending",
    createdAt: new Date().toISOString(),
  });

  const handleChange = (field: keyof typeof form, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]:
        field === "basic" || field === "bonus" || field === "deductions"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    onAdd(form);
    setForm({
      employeeName: "",
      basic: 0,
      bonus: 0,
      deductions: 0,
      status: "pending",
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl shadow-md">
          + Add Salary
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white rounded-2xl shadow-lg max-w-lg p-6 border border-yellow-400">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-yellow-700">
            Add New Salary
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-yellow-700">Employee Name</Label>
            <Input
              value={form.employeeName}
              onChange={(e) => handleChange("employeeName", e.target.value)}
              className="border-yellow-400 focus:ring-yellow-500"
              placeholder="Enter employee name"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-yellow-700">Basic</Label>
              <Input
                type="number"
                value={form.basic}
                onChange={(e) => handleChange("basic", e.target.value)}
                className="border-yellow-400 focus:ring-yellow-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-yellow-700">Bonus</Label>
              <Input
                type="number"
                value={form.bonus}
                onChange={(e) => handleChange("bonus", e.target.value)}
                className="border-yellow-400 focus:ring-yellow-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-yellow-700">Deductions</Label>
              <Input
                type="number"
                value={form.deductions}
                onChange={(e) => handleChange("deductions", e.target.value)}
                className="border-yellow-400 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-yellow-700">Status</Label>
            <Select
              value={form.status}
              onValueChange={(value: "pending" | "paid" | "cancelled") =>
                handleChange("status", value)
              }
            >
              <SelectTrigger className="border-yellow-400 focus:ring-yellow-500">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            onClick={handleSubmit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl px-4"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
