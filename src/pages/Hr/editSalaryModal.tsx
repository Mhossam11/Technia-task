import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Salary } from "@/data/mockData";

interface EditSalaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  salary: Salary | null;
  onSave: (updatedSalary: Salary) => void;
}

const EditSalaryModal = ({ isOpen, onClose, salary, onSave }: EditSalaryModalProps) => {
  const [formData, setFormData] = useState<Salary | null>(salary);

  useEffect(() => {
    setFormData(salary);
  }, [salary]);

  if (!formData) return null;

  const handleChange = (field: keyof Salary, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!formData) return;
    const totalSalary = formData.baseSalary + formData.bonus - formData.deductions;
    onSave({ ...formData, totalSalary });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white border border-yellow-200 shadow-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
            ✨ Edit Salary Record
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-yellow-700">Employee Name</Label>
            <Input
              value={formData.employeeName}
              onChange={(e) => handleChange("employeeName", e.target.value)}
              className="border-yellow-300 focus:ring-2 focus:ring-yellow-500 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-yellow-700">Pay Period</Label>
            <Input
              value={formData.payPeriod}
              onChange={(e) => handleChange("payPeriod", e.target.value)}
              className="border-yellow-300 focus:ring-2 focus:ring-yellow-500 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-yellow-700">Base Salary</Label>
            <Input
              type="number"
              value={formData.baseSalary}
              onChange={(e) => handleChange("baseSalary", Number(e.target.value))}
              className="border-yellow-300 focus:ring-2 focus:ring-yellow-500 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-yellow-700">Bonus</Label>
            <Input
              type="number"
              value={formData.bonus}
              onChange={(e) => handleChange("bonus", Number(e.target.value))}
              className="border-yellow-300 focus:ring-2 focus:ring-yellow-500 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-yellow-700">Deductions</Label>
            <Input
              type="number"
              value={formData.deductions}
              onChange={(e) => handleChange("deductions", Number(e.target.value))}
              className="border-yellow-300 focus:ring-2 focus:ring-yellow-500 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-yellow-700">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger className="border-yellow-300 focus:ring-2 focus:ring-yellow-500 rounded-xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl border-yellow-300 text-yellow-600 hover:bg-yellow-50"
          >
            Cancel
          </Button>
          <Button
            className="rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSalaryModal;
