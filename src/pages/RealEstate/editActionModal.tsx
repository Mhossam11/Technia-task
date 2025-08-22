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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Action } from "@/data/mockData";

interface EditActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: Action | null;
  onSave: (updatedAction: Action) => void;
}

const EditActionModal = ({ isOpen, onClose, action, onSave }: EditActionModalProps) => {
  const [formData, setFormData] = useState<Action | null>(action);

  useEffect(() => {
    setFormData(action);
  }, [action]);

  if (!formData) return null;

  const handleChange = (field: keyof Action, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!formData) return;
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white border border-amber-200 shadow-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
            ✨ Edit Action
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Client Name */}
          <div className="space-y-2">
            <Label className="text-amber-700">Client Name</Label>
            <Input
              value={formData.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
              className="border-amber-300 focus:ring-2 focus:ring-amber-400 rounded-xl"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-amber-700">Description</Label>
            <Input
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="border-amber-300 focus:ring-2 focus:ring-amber-400 rounded-xl"
            />
          </div>

          {/* Assigned To */}
          <div className="space-y-2">
            <Label className="text-amber-700">Assigned To</Label>
            <Input
              value={formData.assignedToName}
              onChange={(e) => handleChange("assignedToName", e.target.value)}
              className="border-amber-300 focus:ring-2 focus:ring-amber-400 rounded-xl"
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label className="text-amber-700">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleChange("type", value)}
            >
              <SelectTrigger className="border-amber-300 focus:ring-2 focus:ring-amber-400 rounded-xl">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="call">Call</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="site-visit">Site Visit</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label className="text-amber-700">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger className="border-amber-300 focus:ring-2 focus:ring-amber-400 rounded-xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Outcome */}
          <div className="space-y-2">
            <Label className="text-amber-700">Outcome</Label>
            <Input
              value={formData.outcome || ""}
              onChange={(e) => handleChange("outcome", e.target.value)}
              className="border-amber-300 focus:ring-2 focus:ring-amber-400 rounded-xl"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label className="text-amber-700">Date</Label>
            <Input
              type="date"
              value={new Date(formData.date).toISOString().split("T")[0]}
              onChange={(e) => handleChange("date", e.target.value)}
              className="border-amber-300 focus:ring-2 focus:ring-amber-400 rounded-xl"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl border-amber-300 text-amber-600 hover:bg-amber-50"
          >
            Cancel
          </Button>
          <Button
            className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditActionModal;
