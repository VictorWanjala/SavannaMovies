
import axios from "axios";
import { toast } from "sonner";

const baseUrl = "https://api.themoviedb.org/3/";
const imageUrl = "https://image.tmdb.org/t/p/";

const useAxios = () => {

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

    let loadingToastId;
    try {
      if (!method || !url) {
        throw { custom: true, message: "Method and URL are required" };
      }

      if (show_loading) {
        loadingToastId = toast.loading("Loading...", {
          description: "Please wait while we fetch the data.",
        });
      }

      const res = await axios({
        method,
        url: `${baseUrl}${url.startsWith("/") ? url : "/" + url}`,
        data: body,
        params,
        responseType,
        headers: {
          ...headers,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
        },
      });

      if (show_success) {
        toast.success(res?.data?.message || success_message);
      }

      return res.data;
    } catch (e) {
      if (show_error) {
        toast.error(
          e?.response?.data?.message || error_message || "An error occurred"
        );
      }
      return { error: true, message: e.message || "An error occurred" };
    } finally {
      if (show_loading && loadingToastId) {
        toast.dismiss(loadingToastId);
      }
    }
  };

  return { request, imageUrl, baseUrl  };
};

export default useAxios;
