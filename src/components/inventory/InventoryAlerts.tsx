
import { getLowStockMedicines, getExpiringMedicines } from "@/utils/dummyData";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowUpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import useStore from "@/Store/Store";
import { useEffect } from "react";

const InventoryAlerts = () => {
  const { getAllMedicine } = useStore();
  const lowStockItems = getLowStockMedicines();
  const expiringItems = getExpiringMedicines();
  
  
  
  
  const totalAlerts = lowStockItems.length + expiringItems.length;

  useEffect(() => {
    getAllMedicine();
  },[])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Inventory Alerts</h2>
          <p className="text-muted-foreground">
            {totalAlerts} alerts require your attention
          </p>
        </div>
        <Link to="/medicines">
          <Button>
            Manage Inventory
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="low-stock" className="space-y-4">
        <TabsList>
          <TabsTrigger value="low-stock" className="flex items-center gap-2">
            <ArrowUpCircle className="h-4 w-4" />
            Low Stock ({lowStockItems.length})
          </TabsTrigger>
          <TabsTrigger value="expiring" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Expiring Soon ({expiringItems.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="low-stock" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Batch Number</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockItems.length > 0 ? (
                  lowStockItems.map((med) => (
                    <TableRow key={med.id}>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell>{med.category}</TableCell>
                      <TableCell>{med.batchNumber}</TableCell>
                      <TableCell>
                        <span className="text-amber-500 font-medium">{med.stock}</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Restock
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No low stock alerts
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="expiring" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Batch Number</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expiringItems.length > 0 ? (
                  expiringItems.map((med) => (
                    <TableRow key={med.id}>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell>{med.category}</TableCell>
                      <TableCell>{med.batchNumber}</TableCell>
                      <TableCell>
                        <span className="text-red-500 font-medium">{med.expiryDate}</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No expiry alerts
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryAlerts;
