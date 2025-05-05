import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash, Plus, FileText, Printer } from "lucide-react";
import {
  medicines,
  customers,
  Medicine,
  Customer,
  SaleItem,
} from "@/utils/dummyData";
import useStore from "@/Store/Store";

const CreateInvoice = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { AllCustomer, AllMedicine } = useStore();
  console.log("AllCustomer", JSON.stringify(AllMedicine, null, 2));

  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [items, setItems] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [paymentStatus, setPaymentStatus] = useState("");


  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxRate = 0.08; // 8%
  const tax = subtotal * taxRate;
  const discount = 0; // Could be modified in a real application
  const total = subtotal + tax - discount;

  const handleAddItem = () => {
    if (!selectedMedicine || quantity <= 0) return;

    const medicine = AllMedicine.result.find((m) => m._id === selectedMedicine);
    if (!medicine) return;

    const newItem = {
      id: `item-${Date.now()}`,
      medicineName: medicine.name,
      quantity,
      unitPrice: medicine.price,
      total: medicine.price * quantity,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setSelectedMedicine("");
    setQuantity(1);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleCreateInvoice = () => {
    if (items.length === 0 || !selectedCustomer) {
      toast({
        title: "Missing Information",
        description: "Please select a customer and add at least one item.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, we would save this to a database
    console.log({
      customer: selectedCustomer,
      items,
      subtotal,
      tax,
      discount,
      total,
      paymentStatus
    });
    

    toast({
      title: "Invoice Created",
      description: "The invoice has been successfully created.",
    });

    navigate("/sales");
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Create New Invoice</h2>
          <p className="text-muted-foreground">
            Add items and generate an invoice
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Select an existing customer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select
                    value={selectedCustomer}
                    onValueChange={setSelectedCustomer}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {AllCustomer.map((customer) => (
                        <SelectItem key={customer._id} value={customer}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCustomer && (
                  <div className="bg-muted p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <strong>Name:</strong> {selectedCustomer.name}
                      </div>
                      <div>
                        <strong>Phone:</strong> {selectedCustomer.phone}
                      </div>
                      <div>
                        <strong>Email:</strong> {selectedCustomer.email}
                      </div>
                      {/* <div>
                            <strong>Address:</strong> {customer.address}
                          </div> */}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2 mt-2">
                  <Label htmlFor="customer">Payment Status</Label>
                  <Select
                    value={paymentStatus}
                    onValueChange={setPaymentStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoice Items</CardTitle>
              <CardDescription>Add medicines to this invoice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-grow space-y-2">
                    <Label htmlFor="medicine">Medicine</Label>
                    <Select
                      value={selectedMedicine}
                      onValueChange={setSelectedMedicine}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select medicine" />
                      </SelectTrigger>
                      <SelectContent>
                        {AllMedicine.result?.map((medicine) => (
                          <SelectItem key={medicine._id} value={medicine._id}>
                            {medicine.name} Rs-{medicine.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-24 space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddItem}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medicine</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.length > 0 ? (
                        items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.medicineName}</TableCell>
                            <TableCell className="text-right">
                              {item.quantity}
                            </TableCell>
                            <TableCell className="text-right">
                              Rs. {item.unitPrice}
                            </TableCell>
                            <TableCell className="text-right">
                              Rs. {item.total}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4">
                            No items added yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>Rs. {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%):</span>
                  <span>Rs. {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount:</span>
                  <span>Rs. {discount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total:</span>
                  <span>Rs. {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full"
                  onClick={handleCreateInvoice}
                  disabled={items.length === 0 || !selectedCustomer}
                >
                  Create Invoice
                </Button>
                <Button variant="outline" className="w-full">
                  <Printer className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
