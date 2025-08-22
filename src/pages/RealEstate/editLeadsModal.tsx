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
import { Lead } from "@/data/mockData";

interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onSave: (updatedLead: Lead) => void;
}

const EditLeadModal = ({ isOpen, onClose, lead, onSave }: EditLeadModalProps) => {
  const [formData, setFormData] = useState<Lead | null>(lead);

  useEffect(() => {
    setFormData(lead);
  }, [lead]);

  if (!formData) return null;

  const handleChange = (field: keyof Lead, value: string | number) => {
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
            ✨ Edit Lead
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-amber-700">Client Name</Label>
            <Input
              value={formData.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
              className="border-amber-300 focus:ring-2 focus:ring-amber-400 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-amber-700">Email</Label>
            <Input
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border-amber-300 focus:ring-2 focus:ring-amber-400 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-amber-700">Phone</Label>
            <Input
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="border-amber-300 focus:ring-2 focus:ring-amber-400 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-amber-700">Property Type</Label>
            <Select
              value={formData.propertyType}
              onValueChange={(value) => handleChange("propertyType", value)}
            >
              <SelectTrigger className="border-amber-300 focus:ring-2 focus:ring-amber-400 rounded-xl">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-amber-700">Budget</Label>
            <Input
              type="number"
              value={formData.budget}
              onChange={(e) => handleChange("budget", Number(e.target.value))}
              className="border-amber-300 focus:ring-2 focus:ring-amber-400 rounded-xl"
            />
          </div>

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
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
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

export default EditLeadModal;
