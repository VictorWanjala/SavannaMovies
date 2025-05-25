import axios from "axios";
import { useContext } from "react";
import AppContext from "@/components/AppContext";
import { toast } from "sonner";

const baseUrl = "/api/";

const useAxios = () => {
  const { setLoading } = useContext(AppContext);

  const request = async (obj = {}) => {
    const {
      method = "GET",
      url = "",
      headers = {},
      body = {},
      params = {},
      show_error = true,
      show_loading = true,
      responseType = "json",
      show_success = false,
      success_message = "Success",
      error_message = "An error occurred",
    } = obj;

    try {
      if (!method || !url) {
        throw { custom: true, message: "Method and URL are required" };
      }

      if (show_loading) setLoading(true);

      const res = await axios({
        method,
        url: `${baseUrl}/${url}`,
        data: body,
        params,
        responseType,
        withCredentials: true,
      });

      if (show_success) {
        toast.success("Success", {
          description: (
            <p className="text-gray-800">
              {res?.data?.message || success_message}
            </p>
          ),
          action: {},
        });
      }

      return res.data;
    } catch (e) {
      if (show_error) {
        toast.warning("Error", {
          description: (
            <p className="text-red-500">
              {e?.response?.data?.message ||
                error_message ||
                "An error occurred"}
            </p>
          ),

          action: {
            label: "Try again",
            onClick: () => {},
          },
        });
      }
      return { error: true, message: e.message || "An error occurred" };
    } finally {
      if (show_loading) setLoading(false);
    }
  };

  return request;
};

export default useAxios;
