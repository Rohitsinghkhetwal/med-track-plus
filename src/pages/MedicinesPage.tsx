
import Layout from "@/components/Layout";
import MedicineList from "@/components/medicines/MedicineList";
import MedicineForm from "@/components/medicines/MedicineForm";
import { useLocation } from "react-router-dom";

const MedicinesPage = () => {
  const location = useLocation();
  const isAddPage = location.pathname === "/medicines/add";

  return (
    <Layout>
      {isAddPage ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Add New Medicine</h2>
          <MedicineForm />
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Medicine Management</h2>
          <MedicineList />
        </div>
      )}
    </Layout>
  );
};

export default MedicinesPage;
