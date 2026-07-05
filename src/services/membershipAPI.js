import axios from "axios";

const API_URL = import.meta.env.VITE_SUPABASE_URL + "/rest/v1";
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation",
};


export const membershipAPI = {
  async fetchTiers() {
    const res = await axios.get(
      `${API_URL}/membership_tiers?order=id.asc`,
      { headers }
    );
    return res.data;
  },

  async updateTier(id, data) {
    const res = await axios.patch(
      `${API_URL}/membership_tiers?id=eq.${id}`,
      data,
      { headers }
    );
    return res.data;
  },
};
