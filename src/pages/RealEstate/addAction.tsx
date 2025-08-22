import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {Plus} from "lucide-react";
import { Action, mockActions } from "@/data/mockData";

const AddActions = () => {
  const [actions, setActions] = useState<Action[]>(mockActions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAction, setNewAction] = useState({
    clientName: "",
    description: "",
    type: "call",
    date: new Date().toISOString().split("T")[0],
    status: "scheduled" as "scheduled" | "completed" | "cancelled",
    assignedToName: "",
    outcome: "",
  });

  const handleAddAction = () => {
    const action: Action = {
      id: (actions.length + 1).toString(),
      ...newAction,
    };
    setActions((prev) => [...prev, action]);
    setIsDialogOpen(false);
    setNewAction({
      clientName: "",
      description: "",
      type: "call",
      date: new Date().toISOString().split("T")[0],
      status: "scheduled",
      assignedToName: "",
      outcome: "",
    });
  };
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-lg rounded-xl px-4 py-2"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Action
        </Button>
      </div>

      {/* Add Action Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="md:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-yellow-700">Add New Action</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Client Name"
              value={newAction.clientName}
              onChange={(e) =>
                setNewAction({ ...newAction, clientName: e.target.value })
              }
              className="border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500"
            />
            <Input
              placeholder="Description"
              value={newAction.description}
              onChange={(e) =>
                setNewAction({ ...newAction, description: e.target.value })
              }
              className="border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500"
            />
            <Select
              value={newAction.type}
              onValueChange={(val) =>
                setNewAction({ ...newAction, type: val as Action["type"] })
              }
            >
              <SelectTrigger className="border-yellow-300">
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
            <Input
              type="date"
              value={newAction.date}
              onChange={(e) =>
                setNewAction({ ...newAction, date: e.target.value })
              }
              className="border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500"
            />
            <Input
              placeholder="Assigned To"
              value={newAction.assignedToName}
              onChange={(e) =>
                setNewAction({ ...newAction, assignedToName: e.target.value })
              }
              className="border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <DialogFooter>
            <Button
            className="rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
            onClick={handleAddAction}
            >
              Add Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* ... existing stat cards ... */}
      </div>

      {/* Filters and Table remain unchanged ... */}

    </div>
  );
};

export default AddActions;
