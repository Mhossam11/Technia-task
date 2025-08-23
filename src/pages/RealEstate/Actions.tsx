import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {  Search, Calendar, Phone, Mail, Users, CheckCircle, Clock, Edit, Trash } from "lucide-react";
import { Action, mockActions } from "@/data/mockData";
import AddActions from "./addAction";
import { getCookie } from "@/lib/cookies";
import EditActionModal from "./editActionModal";
import { Button } from "@/components/ui/button";

const Actions = () => {
  const role = getCookie("role");
  const [actions, setActions] = useState<Action[]>(mockActions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingAction, setEditingAction] = useState<Action | null>(null);

const handleDeleteAction = (id: string) => {
  if (window.confirm("Are you sure you want to delete this action?")) {
    setActions((prev) => prev.filter((action) => action.id !== id));
  }
};

  const filteredActions = actions.filter(action => {
    const matchesSearch = action.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.assignedToName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || action.status === statusFilter;
    const matchesType = typeFilter === "all" || action.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });


  const getTypeBadge = (type: string) => {
    const variants = {
      call: { icon: Phone, className: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
      meeting: { icon: Users, className: "bg-purple-50 text-purple-700 border border-purple-200" },
      email: { icon: Mail, className: "bg-green-50 text-green-700 border border-green-200" },
      "site-visit": { icon: Calendar, className: "bg-orange-50 text-orange-700 border border-orange-200" },
      "follow-up": { icon: Clock, className: "bg-gray-50 text-gray-700 border border-gray-200" }
    };
    
    const config = variants[type as keyof typeof variants];
    const Icon = config.icon;
    return (
      <Badge className={`px-2 py-1 rounded-full font-medium ${config.className}`}>
        <Icon className="w-3 h-3 mr-1" />
        {type.replace('-', ' ')}
      </Badge>
    );
  };
  const handleStatusChange = (id: string, newStatus: "scheduled" | "completed" | "cancelled") => {
    setActions((prev) =>
      prev.map((action) =>
        action.id === id ? { ...action, status: newStatus } : action
      )
    );
  };

  return (
    <div className="space-y-6 animate-fade-in col-span-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">Actions</h1>
          <p className="text-gray-600">Track and manage your lead activities</p>
        </div>
        {
          (role === "Real Estate Agent" || role === "Admin" )&& (    
            <AddActions />
          )
        }
      </div>
      {/* Search and Filters */}
      <Card className="shadow-md border border-yellow-200 hover:shadow-lg transition">
        <CardHeader>
          <CardTitle className="text-lg text-yellow-700">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by client, description, or assignee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px] border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px] border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent  className="bg-white">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="call">Call</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="site-visit">Site Visit</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Actions Table */}
      <Card className="shadow-md border border-yellow-200 hover:shadow-lg transition max-h-[50vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none][&::-webkit-scrollbar]:hidden">
        <CardHeader>
          <CardTitle className="text-yellow-700">Action Items</CardTitle>
          <CardDescription className="text-gray-500">
            {filteredActions.length} action{filteredActions.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-yellow-50">
                <TableHead className="text-yellow-700 font-semibold">Client & Description</TableHead>
                <TableHead className="text-yellow-700 font-semibold">Type</TableHead>
                <TableHead className="text-yellow-700 font-semibold">Date</TableHead>
                <TableHead className="text-yellow-700 font-semibold">Status</TableHead>
                <TableHead className="text-yellow-700 font-semibold">Assigned To</TableHead>
                <TableHead className="text-yellow-700 font-semibold">Outcome</TableHead>
                <TableHead className="text-yellow-700 font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActions.map((action) => (
                <TableRow key={action.id} className="hover:bg-yellow-50/50 transition">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900">{action.clientName}</div>
                      <div className="text-sm text-gray-600">
                        {action.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(action.type)}</TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-700">
                      {new Date(action.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={action.status}
                      onValueChange={(value) =>
                        handleStatusChange(action.id, value as "scheduled" | "completed" | "cancelled")
                      }
                    >
                      <SelectTrigger className="w-[150px] border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md shadow-sm bg-white dark:bg-neutral-900 text-sm">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-neutral-900 shadow-lg rounded-md">
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="text-gray-800">{action.assignedToName}</TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600 max-w-[200px] truncate">
                      {action.outcome || '-'}
                    </div>
                  </TableCell>
                        {/* Add Edit button */}
                  <TableCell>
                    <Button
                      onClick={() => {
                        setEditingAction(action);
                        setIsEditOpen(true);
                      }}
                      className="px-3 py-1 text-sm rounded-md text-yellow-500"
                    >
                      <Edit/>
                    </Button>
                    <Button
                      className="ml-2 text-red-500 "
                      onClick={() => handleDeleteAction(action.id)}
                    >
                      <Trash/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Edit Modal (always outside the table) */}
          <EditActionModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            action={editingAction}
            onSave={(updatedAction) => {
              setActions((prev) =>
                prev.map((a) => (a.id === updatedAction.id ? updatedAction : a))
              );
              setIsEditOpen(false);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Actions;
