
import Layout from "@/components/Layout";
import CustomerList from "@/components/customers/CustomerList";

const CustomersPage = () => {
  return (
    <Layout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Customer Management</h2>
        <CustomerList />
      </div>
    </Layout>
  );
};

export default CustomersPage;
