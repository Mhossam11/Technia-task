
export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  salary: number;
  startDate?: string;
  status: 'active' | 'inactive';
  phone: string;
  address: string;
}

export interface Salary {
  id: string;
  employeeId: string;
  employeeName: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  totalSalary: number;
  payPeriod: string;
  status: 'paid' | 'pending' | 'processing';
}

export interface Lead {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  propertyType: 'apartment' | 'house' | 'commercial' | 'land';
  budget: number;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed' | 'lost';
  assignedTo: string;
  assignedToName: string;
  source: 'website' | 'referral' | 'social-media' | 'cold-call' | 'walk-in';
  createdAt: string;
  notes: string;
}

export interface Action {
  id: string;
  leadId?: string;
  clientName: string;
  type: string;
  description: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  assignedTo?: string;
  assignedToName: string;
  outcome?: string;
}

// Mock employees data
export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Admin',
    email: 'admin@company.com',
    department: 'Management',
    salary: 120000,
    startDate: '2020-01-15',
    status: 'active',
    phone: '+1-555-0101',
    address: '123 Main St, City, State 12345'
  },
  {
    id: '2',
    name: 'Sarah HR Manager',
    email: 'sarah.hr@company.com',
    department: 'Human Resources',
    salary: 85000,
    startDate: '2021-03-10',
    status: 'active',
    phone: '+1-555-0102',
    address: '456 Oak Ave, City, State 12345'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.j@company.com',
    department: 'Sales',
    salary: 75000,
    startDate: '2022-06-20',
    status: 'active',
    phone: '+1-555-0103',
    address: '789 Pine St, City, State 12345'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@company.com',
    department: 'Marketing',
    salary: 65000,
    startDate: '2023-02-14',
    status: 'active',
    phone: '+1-555-0104',
    address: '321 Elm Dr, City, State 12345'
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.w@company.com',
    department: 'Sales',
    salary: 78000,
    startDate: '2021-11-08',
    status: 'active',
    phone: '+1-555-0105',
    address: '654 Maple Ln, City, State 12345'
  }
];

// Mock salaries data
export const mockSalaries: Salary[] = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'John Admin',
    baseSalary: 10000,
    bonus: 2000,
    deductions: 500,
    totalSalary: 11500,
    payPeriod: '2024-01',
    status: 'paid'
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Sarah HR Manager',
    baseSalary: 7083,
    bonus: 1000,
    deductions: 350,
    totalSalary: 7733,
    payPeriod: '2024-01',
    status: 'paid'
  },
  {
    id: '3',
    employeeId: '3',
    employeeName: 'Mike Johnson',
    baseSalary: 6250,
    bonus: 1500,
    deductions: 300,
    totalSalary: 7450,
    payPeriod: '2024-01',
    status: 'processing'
  },
  {
    id: '4',
    employeeId: '4',
    employeeName: 'Emily Davis',
    baseSalary: 5417,
    bonus: 500,
    deductions: 250,
    totalSalary: 5667,
    payPeriod: '2024-01',
    status: 'pending'
  },
  {
    id: '5',
    employeeId: '5',
    employeeName: 'Robert Wilson',
    baseSalary: 6500,
    bonus: 1200,
    deductions: 280,
    totalSalary: 7420,
    payPeriod: '2024-01',
    status: 'paid'
  }
];

// Mock leads data
export const mockLeads: Lead[] = [
  {
    id: '1',
    clientName: 'Alice Cooper',
    email: 'alice@email.com',
    phone: '+1-555-1001',
    propertyType: 'apartment',
    budget: 350000,
    status: 'qualified',
    assignedTo: '3',
    assignedToName: 'Mike Johnson',
    source: 'website',
    createdAt: '2024-01-15',
    notes: 'Looking for 2-bedroom apartment in downtown area'
  },
  {
    id: '2',
    clientName: 'Bob Smith',
    email: 'bob@email.com',
    phone: '+1-555-1002',
    propertyType: 'house',
    budget: 650000,
    status: 'proposal',
    assignedTo: '5',
    assignedToName: 'Robert Wilson',
    source: 'referral',
    createdAt: '2024-01-18',
    notes: 'Family of 4, needs 3+ bedrooms with garden'
  },
  {
    id: '3',
    clientName: 'Carol Brown',
    email: 'carol@email.com',
    phone: '+1-555-1003',
    propertyType: 'commercial',
    budget: 1200000,
    status: 'new',
    assignedTo: '3',
    assignedToName: 'Mike Johnson',
    source: 'cold-call',
    createdAt: '2024-01-20',
    notes: 'Looking for retail space in shopping center'
  },
  {
    id: '4',
    clientName: 'David Wilson',
    email: 'david@email.com',
    phone: '+1-555-1004',
    propertyType: 'land',
    budget: 200000,
    status: 'contacted',
    assignedTo: '5',
    assignedToName: 'Robert Wilson',
    source: 'social-media',
    createdAt: '2024-01-22',
    notes: 'Interested in building custom home'
  },
  {
    id: '5',
    clientName: 'Eva Martinez',
    email: 'eva@email.com',
    phone: '+1-555-1005',
    propertyType: 'apartment',
    budget: 280000,
    status: 'closed',
    assignedTo: '3',
    assignedToName: 'Mike Johnson',
    source: 'walk-in',
    createdAt: '2024-01-10',
    notes: 'First-time buyer, completed purchase'
  }
];

// Mock actions data
export const mockActions: Action[] = [
  {
    id: '1',
    leadId: '1',
    clientName: 'Alice Cooper',
    type: 'call',
    description: 'Initial consultation call to understand requirements',
    date: '2024-01-16',
    status: 'completed',
    assignedTo: '3',
    assignedToName: 'Mike Johnson',
    outcome: 'Qualified lead, scheduled property viewing'
  },
  {
    id: '2',
    leadId: '2',
    clientName: 'Bob Smith',
    type: 'site-visit',
    description: 'Property viewing at 123 Oak Street',
    date: '2024-01-19',
    status: 'completed',
    assignedTo: '5',
    assignedToName: 'Robert Wilson',
    outcome: 'Client interested, preparing proposal'
  },
  {
    id: '3',
    leadId: '3',
    clientName: 'Carol Brown',
    type: 'meeting',
    description: 'Initial meeting to discuss commercial requirements',
    date: '2024-01-23',
    status: 'scheduled',
    assignedTo: '3',
    assignedToName: 'Mike Johnson'
  },
  {
    id: '4',
    leadId: '4',
    clientName: 'David Wilson',
    type: 'email',
    description: 'Send property listings and market information',
    date: '2024-01-24',
    status: 'completed',
    assignedTo: '5',
    assignedToName: 'Robert Wilson',
    outcome: 'Client reviewing options'
  },
  {
    id: '5',
    leadId: '1',
    clientName: 'Alice Cooper',
    type: 'follow-up',
    description: 'Follow up after property viewing',
    date: '2024-01-25',
    status: 'scheduled',
    assignedTo: '3',
    assignedToName: 'Mike Johnson'
  }
];