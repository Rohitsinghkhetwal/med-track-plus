import useStore from "@/Store/Store";

// const { AllMedicine } = useStore();


export type Medicine = {
  id: string;
  name: string;
  description: string;
  batchNumber: string;
  expiryDate: string;
  manufacturer: string;
  price: number;
  stock: number;
  category: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
};

export type SaleItem = {
  id: string;
  medicineId: string;
  medicineName: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type Sale = {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  date: string;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: "paid" | "pending" | "cancelled";
};

// Generate random medicines
export const medicines: Medicine[] = [
  {
    id: "med-001",
    name: "Paracetamol",
    description: "Pain reliever and fever reducer",
    batchNumber: "BT2023-001",
    expiryDate: "2025-10-15",
    manufacturer: "PharmaCorp",
    price: 5.99,
    stock: 120,
    category: "Pain Management"
  },
  {
    id: "med-002",
    name: "Amoxicillin",
    description: "Antibiotic for bacterial infections",
    batchNumber: "BT2023-002",
    expiryDate: "2024-08-30",
    manufacturer: "MediPharm",
    price: 12.50,
    stock: 85,
    category: "Antibiotics"
  },
  {
    id: "med-003",
    name: "Loratadine",
    description: "Antihistamine for allergies",
    batchNumber: "BT2023-003",
    expiryDate: "2026-02-20",
    manufacturer: "AllergiCare",
    price: 8.75,
    stock: 65,
    category: "Allergies"
  },
  {
    id: "med-004",
    name: "Omeprazole",
    description: "Stomach acid reducer",
    batchNumber: "BT2023-004",
    expiryDate: "2024-04-10",
    manufacturer: "DigestHealth",
    price: 15.20,
    stock: 42,
    category: "Digestive Health"
  },
  {
    id: "med-005",
    name: "Ibuprofen",
    description: "Anti-inflammatory and pain reliever",
    batchNumber: "BT2023-005",
    expiryDate: "2025-07-22",
    manufacturer: "PainRelief Inc",
    price: 6.99,
    stock: 5,
    category: "Pain Management"
  },
  {
    id: "med-006",
    name: "Cetirizine",
    description: "Antihistamine for hay fever and allergies",
    batchNumber: "BT2023-006",
    expiryDate: "2023-12-15",
    manufacturer: "AllergiCare",
    price: 9.95,
    stock: 78,
    category: "Allergies"
  },
];

// Generate random customers
export const customers: Customer[] = [
  {
    id: "cust-001",
    name: "John Doe",
    phone: "555-123-4567",
    email: "john.doe@example.com",
    address: "123 Main St, Cityville",
  },
  {
    id: "cust-002",
    name: "Jane Smith",
    phone: "555-987-6543",
    email: "jane.smith@example.com",
    address: "456 Oak Ave, Townsburg",
  },
  {
    id: "cust-003",
    name: "Michael Johnson",
    phone: "555-567-8901",
    email: "michael.j@example.com",
    address: "789 Pine Rd, Villagetown",
  },
  {
    id: "cust-004",
    name: "Sarah Williams",
    phone: "555-234-5678",
    email: "sarah.w@example.com",
    address: "101 Elm Blvd, Hamletville",
  },
];

// Generate random sales
export const sales: Sale[] = [
  {
    id: "sale-001",
    invoiceNumber: "INV-2023-001",
    customerId: "cust-001",
    customerName: "John Doe",
    date: "2023-11-15",
    items: [
      {
        id: "item-001",
        medicineId: "med-001",
        medicineName: "Paracetamol",
        quantity: 2,
        unitPrice: 5.99,
        total: 11.98
      },
      {
        id: "item-002",
        medicineId: "med-003",
        medicineName: "Loratadine",
        quantity: 1,
        unitPrice: 8.75,
        total: 8.75
      }
    ],
    subtotal: 20.73,
    tax: 1.66,
    discount: 0,
    total: 22.39,
    status: "paid"
  },
  {
    id: "sale-002",
    invoiceNumber: "INV-2023-002",
    customerId: "cust-002",
    customerName: "Jane Smith",
    date: "2023-11-16",
    items: [
      {
        id: "item-003",
        medicineId: "med-002",
        medicineName: "Amoxicillin",
        quantity: 1,
        unitPrice: 12.50,
        total: 12.50
      }
    ],
    subtotal: 12.50,
    tax: 1.00,
    discount: 1.25,
    total: 12.25,
    status: "paid"
  },
  {
    id: "sale-003",
    invoiceNumber: "INV-2023-003",
    customerId: "cust-003",
    customerName: "Michael Johnson",
    date: "2023-11-18",
    items: [
      {
        id: "item-004",
        medicineId: "med-004",
        medicineName: "Omeprazole",
        quantity: 2,
        unitPrice: 15.20,
        total: 30.40
      },
      {
        id: "item-005",
        medicineId: "med-005",
        medicineName: "Ibuprofen",
        quantity: 1,
        unitPrice: 6.99,
        total: 6.99
      }
    ],
    subtotal: 37.39,
    tax: 2.99,
    discount: 3.74,
    total: 36.64,
    status: "pending"
  }
];

// Helper function to get a medicine by ID
export const getMedicineById = (id: string): Medicine | undefined => {
  return medicines.find(med => med.id === id);
};

// Helper function to get a customer by ID
export const getCustomerById = (id: string): Customer | undefined => {
  return customers.find(cust => cust.id === id);
};

// Helper function for low stock medicines (less than 10 units)
export const getLowStockMedicines = (): Medicine[] => {
  const { AllMedicine } = useStore()
  return AllMedicine?.result?.filter(med => med.stock < 10);
};

// Helper function for expired or nearly expired medicines (within 30 days)
export const getExpiringMedicines = (): Medicine[] => {
  const { AllMedicine } = useStore();
  
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  return AllMedicine?.result?.filter(med => {
    const expiryDate = new Date(med.expiryDate);
    return expiryDate <= thirtyDaysFromNow;
  });
};
