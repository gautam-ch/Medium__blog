import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface ButtonType {
  label: string;
  onClick: () => Promise<any>; 
}

export function Button({ label, onClick }: ButtonType) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await onClick();
      
      toast.success(response.data.message || "Success!");
      
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const { data } = error.response;
        
     
        if (data.details?.issues && data.details.issues.length > 0) {
         
          const errorMessage = data.details.issues[0].message || data.error;
          toast.error(errorMessage);
        } else {
        
          toast.error(data.error || "Something went wrong!");
        }
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-[24rem] h-10 bg-black text-white rounded-md flex items-center justify-center"
      disabled={loading}
    >
      {loading ? (
        <div className="w-5 h-5 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
      ) : (
        label
      )}
    </button>
  );
}