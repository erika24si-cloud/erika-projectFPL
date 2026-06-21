import axios from "axios";

const API_URL = import.meta.env.VITE_SUPABASE_URL + "/rest/v1";
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Header standar Supabase REST API — sesuai modul
export const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// ── TABEL: profiles (data akun user/admin) ───────────────────────────────────

export const profilesAPI = {
  async fetchProfiles() {
    const response = await axios.get(`${API_URL}/profiles`, { headers });
    return response.data;
  },
  async createProfile(data) {
    const response = await axios.post(`${API_URL}/profiles`, data, { headers });
    return response.data;
  },
  async updateProfile(id, data) {
    const response = await axios.patch(`${API_URL}/profiles?id=eq.${id}`, data, { headers });
    return response.data;
  },
  async deleteProfile(id) {
    const response = await axios.delete(`${API_URL}/profiles?id=eq.${id}`, { headers });
    return response.data;
  },
};

// ── TABEL: customers (data pelanggan klinik hewan) ───────────────────────────

export const customersAPI = {
  async fetchCustomers() {
    const response = await axios.get(`${API_URL}/customers`, { headers });
    return response.data;
  },
  async createCustomer(data) {
    const response = await axios.post(`${API_URL}/customers`, data, { headers });
    return response.data;
  },
  async updateCustomer(id, data) {
    const response = await axios.patch(`${API_URL}/customers?id=eq.${id}`, data, { headers });
    return response.data;
  },
  async deleteCustomer(id) {
    const response = await axios.delete(`${API_URL}/customers?id=eq.${id}`, { headers });
    return response.data;
  },
};

// ── TABEL: members (akun member/pelanggan umum) ──────────────────────────────

export const membersAPI = {
  async fetchMembers() {
    const response = await axios.get(`${API_URL}/members`, { headers });
    return response.data;
  },
  async getMemberById(id) {
    const response = await axios.get(`${API_URL}/members?id=eq.${id}`, { headers });
    return response.data[0] ?? null;
  },
  async updateMember(id, data) {
    const response = await axios.patch(`${API_URL}/members?id=eq.${id}`, data, { headers });
    return response.data;
  },
  async deleteMember(id) {
    const response = await axios.delete(`${API_URL}/members?id=eq.${id}`, { headers });
    return response.data;
  },
};
