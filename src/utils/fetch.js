import axios from "axios";

import Swal from "sweetalert2";

const fetcher = (url, method, data = {}) => {
  let token = localStorage.getItem("accessToken");
  if (token === null) {
    token = "null";
  }

  const instance = axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "Your access to this resource has expired or is unauthorized. Please log in or contact an administrator for assistance.",
          confirmButtonText: "OK",
          // backdrop: false,
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/account/signin";
          }
        });
      }
      return Promise.reject(error);
    }
  );

  if (method === "get") {
    return instance.get(url).then((res) => res.data);
  } else {
    return instance.post(url, data).then((res) => res.data);
  }
};

export default fetcher;
