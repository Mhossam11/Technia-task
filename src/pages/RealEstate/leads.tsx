import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {  Search, UserPlus, Phone, Mail, DollarSign, Edit, Trash } from "lucide-react";
import { mockLeads, Lead } from "@/data/mockData";
import AddLeads from "./addLeads";
import { getCookie } from "@/lib/cookies";
import { Button } from "@/components/ui/button";
import EditLeadModal from "./editLeadsModal";

const Leads = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
const [editingLead, setEditingLead] = useState<Lead | null>(null);

const [leads, setLeads] = useState<Lead[]>(mockLeads);
const [searchTerm, setSearchTerm] = useState("");
const [statusFilter, setStatusFilter] = useState<string>("all");
  const role = getCookie("role")
  const handleDeleteLead = (leadId: string) => {
    setLeads(leads.filter((lead) => lead.id !== leadId));
  }
// Leads stats array
const leadStats = [
  {
    title: "Total Leads",
    icon: <UserPlus className="h-4 w-4 text-amber-500" />,
    value: 120, // static number
    description: "Active pipeline",
  },
  {
    title: "Pipeline Value",
    icon: <DollarSign className="h-4 w-4 text-amber-500" />,
    value: "$1.2M", // static string
    description: "Total opportunity",
  },
  {
    title: "Closed Deals",
    icon: <UserPlus className="h-4 w-4 text-amber-500" />,
    value: 15, // static number
    description: "This month",
  },
  {
    title: "Conversion Rate",
    icon: <UserPlus className="h-4 w-4 text-amber-500" />,
    value: "25%", // static percentage
    description: "Success rate",
  },
];
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.assignedToName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });


  const getPropertyTypeBadge = (type: string) => {
    const colors = {
      apartment: "bg-blue-50 text-blue-700",
      house: "bg-green-50 text-green-700",
      commercial: "bg-purple-50 text-purple-700",
      land: "bg-amber-50 text-amber-700",
    };
    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors]}>
        {type}
      </Badge>
    );
  };

  const handleStatusChange = (leadId: string, newStatus: string) => {
    setLeads(
      leads.map((lead) =>
        lead.id === leadId ? { ...lead, status: newStatus as Lead["status"] } : lead
      )
    );

  };

  return (
<div className="space-y-6 animate-fade-in col-span-12">
  {/* Header */}
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
        Leads
      </h1>
      <p className="text-gray-500">Manage your sales and prospects</p>
    </div>
    {
      (role === "Real Estate Agent" || role === "Admin") && (
        <AddLeads />
      )
    }  
  </div>

{/* Lead Stats */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {leadStats.map((stat, index) => (
    <Card
      key={index}
      className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl shadow-sm hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
        {stat.icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-amber-700">{stat.value}</div>
        <p className="text-xs text-gray-500">{stat.description}</p>
      </CardContent>
    </Card>
  ))}
</div>

  {/* Search and Filters */}
  <Card className="bg-white border border-amber-200 shadow-sm">
    <CardHeader>
      <CardTitle className="text-lg text-amber-700">Search & Filter</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-4 h-4" />
          <Input
            placeholder="Search by client name, email, or agent..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-amber-300 focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] border-amber-300 focus:ring-2 focus:ring-amber-400">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="proposal">Proposal</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </Card>

  {/* Leads Table */}
  <Card className="bg-white border border-amber-200 shadow-sm">
    <CardHeader>
      <CardTitle className="text-amber-700">Lead Pipeline</CardTitle>
      <CardDescription>
        {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""} found
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow className="bg-amber-50">
            <TableHead>Client</TableHead>
            <TableHead>Property Type</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLeads.map((lead) => (
            <TableRow
              key={lead.id}
              className="hover:bg-amber-50 transition cursor-pointer"
            >
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium text-gray-800">{lead.clientName}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail className="w-3 h-3 text-amber-500" />
                    {lead.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Phone className="w-3 h-3 text-amber-500" />
                    {lead.phone}
                  </div>
                </div>
              </TableCell>
              <TableCell>{getPropertyTypeBadge(lead.propertyType)}</TableCell>
              <TableCell className="font-semibold text-amber-700">
                ${lead.budget.toLocaleString()}
              </TableCell>
              <TableCell>
                <Select
                  value={lead.status}
                  onValueChange={(value) => handleStatusChange(lead.id, value)}
                >
                  <SelectTrigger className="w-[120px] h-8 border-amber-300 focus:ring-2 focus:ring-amber-400">
                    <SelectValue />
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
              </TableCell>
              <TableCell>{lead.assignedToName}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-amber-100 text-amber-800 border border-amber-200"
                >
                  {lead.source.replace("-", " ")}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-amber-600 hover:bg-amber-100 rounded-lg"
                  onClick={() => {
                    setEditingLead(lead);
                    setIsEditOpen(true);
                  }}
                >
                  <Edit/>
                </Button>
                 {/* Delete Button */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:bg-red-100 rounded-lg"
                  onClick={() => handleDeleteLead(lead.id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditLeadModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        lead={editingLead}
        onSave={(updatedLead) => {
          setLeads(leads.map(l => l.id === updatedLead.id ? updatedLead : l));
        }}
      />

    </CardContent>
  </Card>
</div>

  );
};

export default Leads;
