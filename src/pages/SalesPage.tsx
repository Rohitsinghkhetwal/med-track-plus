
import Layout from "@/components/Layout";
import SalesList from "@/components/sales/SalesList";
import CreateInvoice from "@/components/sales/CreateInvoice";
import { useLocation } from "react-router-dom";

const SalesPage = () => {
  const location = useLocation();
  const isNewPage = location.pathname === "/sales/new";

  return (
    <Layout>
      {isNewPage ? (
        <CreateInvoice />
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Sales Management</h2>
          <SalesList />
        </div>
      )}
    </Layout>
  );
};

export default SalesPage;
