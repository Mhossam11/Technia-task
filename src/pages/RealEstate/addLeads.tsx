import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { mockLeads, Lead } from "@/data/mockData";

// ---- union option helpers (keeps Selects type-safe)
const PROPERTY_TYPES = ["apartment", "house", "commercial", "land"] as const;
const STATUS_OPTIONS = ["new", "contacted", "qualified", "proposal", "closed", "lost"] as const;
const SOURCE_OPTIONS = ["website", "referral", "social-media", "cold-call", "walk-in"] as const;

// Fresh default each time so createdAt is now
const createEmptyLead = (): Omit<Lead, "id"> => ({
  clientName: "",
  email: "",
  phone: "",
  propertyType: "apartment",
  budget: 0,
  status: "new",
  assignedToName: "",
  assignedTo: "",       // required by your Lead type
  source: "website",
  createdAt: new Date().toISOString(),
  notes: "",
});

const AddLeads = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [open, setOpen] = useState(false);
  const [newLead, setNewLead] = useState<Omit<Lead, "id">>(createEmptyLead());
  const handleAddLead = () => {
    // (Optional) simple guard — adjust as you like
    if (!newLead.clientName || !newLead.email) return;

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setLeads((prev) => [...prev, { ...newLead, id }]);
    setNewLead(createEmptyLead());
    setOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
        {/* Add Lead Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-lg rounded-xl px-4 py-2">
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[calc(95vh)] bg-white border border-amber-200 shadow-lg rounded-xl overflow-auto">
            <DialogHeader>
              <DialogTitle className="text-amber-700 text-xl">Add New Lead</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Client Name"
                value={newLead.clientName}
                onChange={(e) => setNewLead({ ...newLead, clientName: e.target.value })}
                className="border-amber-300 focus:ring-2 focus:ring-amber-400"
              />
              <Input
                placeholder="Email"
                value={newLead.email}
                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                className="border-amber-300 focus:ring-2 focus:ring-amber-400"
              />
              <Input
                placeholder="Phone"
                value={newLead.phone}
                onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                className="border-amber-300 focus:ring-2 focus:ring-amber-400"
              />

              {/* Property Type */}
              <Select
                value={newLead.propertyType}
                onValueChange={(value) =>
                  setNewLead({ ...newLead, propertyType: value as Lead["propertyType"] })
                }
              >
                <SelectTrigger className="border-amber-300 focus:ring-2 focus:ring-amber-400">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {PROPERTY_TYPES.map((pt) => (
                    <SelectItem key={pt} value={pt}>{pt[0].toUpperCase() + pt.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Budget */}
              <Input
                type="number"
                placeholder="Budget"
                value={Number.isFinite(newLead.budget) ? newLead.budget : ""}
                onChange={(e) =>
                  setNewLead({ ...newLead, budget: Number(e.target.value || 0) })
                }
                className="border-amber-300 focus:ring-2 focus:ring-amber-400"
              />

              {/* Status */}
              <Select
                value={newLead.status}
                onValueChange={(value) =>
                  setNewLead({ ...newLead, status: value as Lead["status"] })
                }
              >
                <SelectTrigger className="border-amber-300 focus:ring-2 focus:ring-amber-400">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.replace("-", " ").replace(/\b\w/g, (m) => m.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Assigned To (display name + id) */}
              <Input
                placeholder="Assigned To (Name)"
                value={newLead.assignedToName}
                onChange={(e) => setNewLead({ ...newLead, assignedToName: e.target.value })}
                className="border-amber-300 focus:ring-2 focus:ring-amber-400"
              />
              <Input
                placeholder="Assigned To (ID)"
                value={newLead.assignedTo}
                onChange={(e) => setNewLead({ ...newLead, assignedTo: e.target.value })}
                className="border-amber-300 focus:ring-2 focus:ring-amber-400"
              />
              {/* Source (union-safe) */}
              <Select
                value={newLead.source}
                onValueChange={(value) =>
                  setNewLead({ ...newLead, source: value as Lead["source"] })
                }
              >
                <SelectTrigger className="border-amber-300 focus:ring-2 focus:ring-amber-400">
                  <SelectValue placeholder="Lead Source" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {SOURCE_OPTIONS.map((src) => (
                    <SelectItem key={src} value={src}>
                      {src.replace("-", " ").replace(/\b\w/g, (m) => m.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Created At (date) */}
              <Input
                type="date"
                value={newLead.createdAt.slice(0, 10)}
                onChange={(e) =>
                  setNewLead({
                    ...newLead,
                    createdAt: new Date(e.target.value).toISOString(),
                  })
                }
                className="border-amber-300 focus:ring-2 focus:ring-amber-400"
              />
              {/* Notes */}
              <Textarea
                placeholder="Notes"
                value={newLead.notes}
                onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                className="border-amber-300 focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <DialogFooter className="mt-6 flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddLead}
                className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-md"
              >
                Save Lead
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  );
};

export default AddLeads;
