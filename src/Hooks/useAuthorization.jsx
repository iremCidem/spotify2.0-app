import { useState } from "react";
import axios from "axios";

function useAuthorization() {
  const [authorization, setAuthorization] = useState();
  const url = "https://accounts.spotify.com/api/token";
  const data =
    "grant_type=client_credentials&client_id=d3dfe68896d84d669d61f3ff75ad286d&client_secret=a8a346ab768c493483443b637b28f99b";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const fetchData = async () => {
    try {
      const response = await axios.post(url, data, { headers });
      setAuthorization(`Bearer ${response.data.access_token}`);
    } catch (error) {
      console.error(error);
    }
  };

  return [authorization, fetchData];
}
export default useAuthorization;
