import Layout from "@/components/Layout";
import AddCustomers from "@/components/customers/AddCustomers";
import CustomerList from "@/components/customers/CustomerList";
import { useLocation } from "react-router-dom";

const CustomersPage = () => {
  const location = useLocation();
  const isAddPage = location.pathname === "/customers/add";
  return (
    <Layout>
      {isAddPage ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Add New Customer</h2>
          <AddCustomers />
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Customer Management</h2>
          <CustomerList />
        </div>
      )}
    </Layout>
  );
};

export default CustomersPage;
