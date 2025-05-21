import axios from "axios";
import {create} from "zustand"
import {persist} from "zustand/middleware"


interface storeState {
  medicine: [],
  loading: boolean
  setMedicine: (data:any) => void;
  getAllMedicine: () => Promise<void>;
  AllMedicine: [],
  AllCustomer: [],
  AllSales: [],
  getAllCustomer: () => Promise<void>,
  getAllSales : () => Promise<void>

}

const useStore = create<storeState>()(
  persist(
    (set) => ({
      medicine: [],
      loading: false,
      setMedicine: (data) => set({ medicine: data }),
      AllMedicine: [],
      AllCustomer: [],
      AllSales: [],
      getAllMedicine: async() => {
        try{
          set({loading: true})
          const response = await axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/getAllMed`);
          const result = response.data;
          set({AllMedicine: result})
        }catch(err) {
          console.log("Something went wrong here !")
        }finally{
          set({loading: false})
        }
      },
      getAllCustomer: async() => {
        try {
          set({loading: true})
          const result = await axios.get(`${import.meta.env.VITE_PUBLIC_API_URL}/getAllCustomers`);
          const data = result.data;
          set({AllCustomer: data});
        }catch(err) {
          console.log("Something went wrong while getting the customers ")
        }finally{
          set({loading: false})
        }

      },
      getAllSales: async() => {
        try {
          set({loading: true})
          const res = await axios.get(
            `${import.meta.env.VITE_PUBLIC_API_URL}/getAll-sale`
          );
          const data = res.data;
          set({AllSales: data})
          return data;
        } catch (err) {
          console.log("Something went wrong while getting the sales ....");
        } finally {
          set({loading: false})
        }

      }

    }),
    {
      name: "user-storage"
    }
  )
)

export default useStore;