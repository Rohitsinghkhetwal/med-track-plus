import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom" 
import { useToast } from "@/components/ui/use-toast";

const AddCustomers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purchases: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Submit logic here
  };

  const fetchAddCustomer = async() => {
    try {
      const result = await axios.post(`${import.meta.env.VITE_PUBLIC_API_URL}/create-customer`,{
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        purchase: formData.purchases
      });

      const data = result.data;
      if(data) {
        toast({
          title: "Customer added",
          description: "The Customer has been added successfully added"
        })
        navigate("/customers")
      }

      return data; 
      
    }catch(err) {
      console.log("something went wrong while feching the api");
    }

  }
  return (
    <form onSubmit={handleSubmit} className="border border-gray-300 mx-auto bg-white p-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Purchases *</label>
          <input
            type="number"
            name="purchases"
            value={formData.purchases}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          className="px-4 py-2 border rounded-md text-gray-700 border-gray-300 hover:bg-gray-100 text-sm"
          onClick={() => navigate("/customers")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 text-sm py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={fetchAddCustomer}
          >
          Save Customer
        </button>
      </div>
    </form>
  )
}

export default AddCustomers