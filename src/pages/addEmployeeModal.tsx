// addEmployeeModal.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { Employee } from "@/data/mockData";

interface AddEmployeeModalProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  editingEmployee: Employee | null;
  formData: Omit<Employee, "id" | "status">;
  setFormData: (data: Omit<Employee, "id" | "status">) => void;
  handleSave: () => void;
  handleEditEmployee: (employee: Employee) => void;
  employee: Employee; // <-- the employee row
}

const AddEmployeeModal = ({
  isDialogOpen,
  setIsDialogOpen,
  formData,
  setFormData,
  handleSave,
  handleEditEmployee,
  employee,
}: AddEmployeeModalProps) => {
  return (
<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogTrigger asChild>
    <Button
      variant="ghost"
      size="sm"
      className="text-yellow-600 hover:bg-yellow-100 rounded-lg"
      onClick={() => handleEditEmployee(employee)}
    >
      <Edit className="w-4 h-4" />
    </Button>
  </DialogTrigger>

  <DialogContent className="sm:max-w-lg bg-white border border-yellow-200 shadow-lg rounded-2xl">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 bg-clip-text text-transparent">
        ✨ Edit Employee
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <Input
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border-yellow-300 focus:ring-2 focus:ring-yellow-500 rounded-xl"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <Input
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border-yellow-300 focus:ring-2 focus:ring-yellow-500 rounded-xl"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <Input
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="border-yellow-300 focus:ring-2 focus:ring-yellow-500 rounded-xl"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
        <Input
          placeholder="Department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          className="border-yellow-300 focus:ring-2 focus:ring-yellow-500 rounded-xl"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
        <Input
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
          className="border-yellow-300 focus:ring-2 focus:ring-yellow-500 rounded-xl"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <Input
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="border-yellow-300 focus:ring-2 focus:ring-yellow-500 rounded-xl"
        />
      </div>
    </div>

    <DialogFooter className="flex justify-end gap-3 pt-4">
      <Button
        variant="outline"
        onClick={() => setIsDialogOpen(false)}
        className="rounded-xl border-yellow-300 text-yellow-600 hover:bg-yellow-50"
      >
        Cancel
      </Button>
      <Button
        className="rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

  );
};

export default AddEmployeeModal;
