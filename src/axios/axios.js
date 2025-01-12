import axios from "axios";
import { toasts } from "../component/common/ui/Toast/Toast";
import { decryptData, encryptData, getKey } from "../utils/utils";
import { ENCRYPTION_EXCLUDED, ENVIRONMENT } from "../utils/constants";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_API_HOST;
const key = getKey(50);
// * INSTANCE:
export const axiosApi = axios.create({
  baseURL: BASE_URL,
});

// * INTERCEPTORS:
// For Request
axiosApi.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("forgotPassToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // config.origin = "http://localhost:3000";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// For Response
axiosApi.interceptors.response.use(
  (successResponse) => {
    if (Number(ENVIRONMENT.ENABLE_ENCRYPTION)) {
      const decryptedData = decryptData(successResponse?.data?.resData);

      return (successResponse.data = {
        ...successResponse.data,
        data: { ...decryptedData },
      });
    } else {
      return successResponse;
    }
  },
  (errorResponse) => {
    if (Number(ENVIRONMENT.ENABLE_ENCRYPTION)) {
      const decryptedData = decryptData(errorResponse?.response?.data?.resData);
      handleError(decryptedData);
      throw decryptedData;
    } else {
      handleError(errorResponse);
      throw errorResponse;
    }
  }
);

// Formal URL
function formatUrl(url, params) {
  params =
    params && Object.keys(params).length > 0
      ? `?${new URLSearchParams(params).toString()}`
      : "";
  return `${url}${params}`;
}

const clearWaitingQueue = () => {
  toast.clearWaitingQueue();
};

// Handle Error
function handleError(error) {
  const errorStatus = error?.response?.status || error?.status;
  const errorMessage =
    error?.response?.data?.message || error?.data?.message || error?.message;
  if (errorStatus && (errorStatus === 403 || errorStatus === 401)) {
    toasts.error("Please re-login, last login session expired.");
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    clearWaitingQueue();
  } else {
    errorMessage && toasts.error(errorMessage);
    clearWaitingQueue();
  }
}

// Handler Success
function handleSuccess(res) {
  if (res?.status === 200 || res?.status === 201) {
    res?.message && toasts?.success(res?.message);
    res?.data?.message && toasts?.success(res?.data?.message);
  }
  if (res?.status === 403 || res?.status === 400) {
    res.message && toasts.warning(res.message);
  }
}

const getPayloadData = (data, url = "") => {
  if (data) {
    if (Number(ENVIRONMENT.ENABLE_ENCRYPTION)) {
      if (ENCRYPTION_EXCLUDED.includes(url)) {
        return data;
      }

      return { reqData: encryptData(data) };
    } else {
      return data;
    }
  }
};

//* HTTP METHODS
export const apiCallGet = async (url, params = {}, toastOn) => {
  const resp = await axiosApi
    .get(formatUrl(url, params))
    .then((res) => {
      let data = res?.data;
      if (toastOn === true) {
        handleSuccess(data);
      }
      return data;
    })
    .catch((error) => {
      let data = error?.response?.data;
      // handleError(data);
      return data;
    });

  return resp;
};

export const apiCallPost = async (url, data, params = {}, toastOn, header) => {
  try {
    const resp = await axiosApi.post(
      formatUrl(url, params),
      getPayloadData(data, url),
      {},
      header
    );

    let respData = resp?.data;
    if (toastOn === true) {
      handleSuccess(respData);
    }

    return respData;
  } catch (error) {
    let errorData = error?.response?.data;

    // handleError(errorData);
    return errorData;
  }
};

export const apiCallPatch = async (url, data, params = {}, toastOn) => {
  const resp = await axiosApi
    .patch(formatUrl(url, params), getPayloadData(data, url))
    .then(async (res) => {
      let resData = res?.data;

      if (toastOn === true) {
        handleSuccess(resData);
      }
      return resData;
    })
    .catch((error) => {
      let errorData = error?.response?.data;
      // handleError(errorData);
      return errorData;
    });

  return resp;
};

export const apiCallDelete = (url, data, params = {}, toastOn) => {
  return new Promise((resolve, reject) => {
    axiosApi
      .delete(formatUrl(url, params), { data: getPayloadData(data, url) })
      .then((res) => {
        if (toastOn === true) {
          handleSuccess(res?.data);
        }
        resolve(res.data);
      })
      .catch((error) => {
        // handleError(error);
        reject(error);
      });
  });
};

// import axios from 'axios';
// //@ts-ignore
// import * as CryptoJS from 'crypto-js';
// import { ENVIRONMENT } from '../utils/constants';
// import { getKey } from '../utils/utils';

// const IS_ENCRYPTION = ENVIRONMENT.IS_ENCRYPTION;
// const BASE_URL = ENVIRONMENT.API_HOST;
// const key = getKey(50);

// const axiosApi = axios.create({
//     baseURL: BASE_URL,
// });

// console.log("object11",key);

// axiosApi.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (config?.headers?.noAuth === 'true') {
//             config.headers['api-access-token'] = `${token}`;
//         } else if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// function encryption(payload) {
//     try {
//         if (payload != undefined || payload != null) {
//             const ciphertext = CryptoJS.AES.encrypt(payload, key).toString();
//             console.log("Encrypted Data:", ciphertext);

//             return ciphertext;

//         }
//     } catch (error) {
//         return error;
//     }
// }

// function decryption(payload) {
//     try {
//         if (payload) {
//             const decryptedText = CryptoJS.AES.decrypt(payload, key);
//             const decryptData = decryptedText.toString(CryptoJS.enc.Utf8);
//             return decryptData;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// function encryptionFilter(data) {
//     if (!data?.entries && data?.entries === undefined) {
//         const encD = IS_ENCRYPTION ? encryption(JSON.stringify(data)) : data;
//         return IS_ENCRYPTION ? { reqData: encD } : data;
//     } else {
//         return data;
//     }
// }

// function decryptionFilter(data) {
//     if (data && data?.resData && typeof data?.resData === 'string') {
//         const decD = IS_ENCRYPTION ? JSON.parse(decryption(data?.resData)) : data;
//         return IS_ENCRYPTION ? decD : data;
//     } else {
//         return data;
//     }
// }

// function handleSuccess(res) {
//     if (res?.status === 200 || res?.status === 201) {
//         // res?.message && toasts?.success(res?.message);
//         // res?.data?.message && toasts?.success(res?.data?.message);
//     }
//     if (res.status === 403 || res.status === 400) {
//         // res.message && toasts.warning(res.message);
//     }
// }

// async function apiCallGet(url, header, toastOn = false) {
//     try {
//         const response = await axiosApi.get(url, header);
//         const decryptData = decryptionFilter(response?.data);

//         if (toastOn) {
//             handleSuccess(decryptData);
//         }

//         return decryptData;
//     } catch (error) {
//         const decryptData = decryptionFilter(error?.response?.data);
//         if (error?.response?.status === 401) {
//             // toasts.error('Please re-login, last login session expired.');
//             localStorage.removeItem('token');
//             // window.location.reload();
//         }
//         if ((decryptData && decryptData?.message) || decryptData?.message === 'Network Error') {
//             // toastOn && toasts.error(decryptData?.message);
//         }
//         return decryptData;
//     }
// }

// async function apiCallPost(url, data, toastOn = true) {
//     const dataFiltered = encryptionFilter(data);

//     try {
//         const resp = await axiosApi.post(url, dataFiltered, {});
//         const decryptData = decryptionFilter(resp?.data);

//         if (toastOn === true) {
//             handleSuccess(decryptData);
//         }

//         return decryptData;
//     } catch (error) {
//         const decryptData = decryptionFilter(error?.response?.data);

//         if (error?.response?.status && error?.response?.status === 401) {
//             // toasts.error('Please re-login, last login session expired.');
//             localStorage.removeItem('token');
//             window.location.reload();
//         }

//         if (decryptData?.message || decryptData?.message === 'Network Error') {
//             // toastOn && toasts.error(decryptData?.message);
//         }

//         return decryptData;
//     }
// }

// async function apiCallPatch(url, data, toastOn = false, loader = false) {
//     let dataFiltered = data;

//     const resp = await axiosApi
//         .patch(url, dataFiltered)
//         .then(async (res) => {
//             let decryptData = res?.data;

//             if (toastOn === true) {
//                 handleSuccess(decryptData);
//             }
//             return decryptData;
//         })
//         .catch((error) => {
//             let decryptData = error?.response?.data;
//             if (error?.response?.status && error?.response?.status === 401) {
//                 localStorage.clear();
//             }
//             if (
//                 (decryptData && decryptData?.message) ||
//                 decryptData?.message === 'Network Error'
//             ) {
//                 // toasts.error(decryptData?.message);
//             }
//             return decryptData;
//         });

//     return resp;
// }

// async function apiCallDelete(url, header, toastOn = false) {
//     try {
//         const response = await axiosApi.delete(url, header);
//         const decryptData = decryptionFilter(response?.data);

//         if (toastOn) {
//             handleSuccess(decryptData);
//         }

//         return decryptData;
//     } catch (error) {
//         const decryptData = decryptionFilter(error?.response?.data);
//         if (error?.response?.status === 401) {
//             localStorage.removeItem('token');
//         }
//         if ((decryptData && decryptData?.message) || decryptData?.message === 'Network Error') {
//             // toastOn && toasts.error(decryptData?.message);
//         }
//         return decryptData;
//     }
// }

// export {
//     apiCallGet,
//     apiCallPost,
//     apiCallPatch,
//     apiCallDelete,
// };
