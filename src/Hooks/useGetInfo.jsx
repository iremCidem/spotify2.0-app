import axios from "axios";
import { useState } from "react";
const useGetInfo = () => {
  const [datas, setDatas] = useState();
  const getInfo = async (url, authorization) => {
    const headers = {
      Authorization: authorization,
    };
    try {
      const response = await axios.get(url, { headers });
      setDatas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return [datas, getInfo];
};
export default useGetInfo;
