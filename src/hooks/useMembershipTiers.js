import { useState, useEffect } from "react";
import { membershipAPI } from "../services/membershipAPI";

const FALLBACK_TIERS = [
  {
    id: 1,
    level: "Silver",
    range: "Rp 0 – Rp 999.999",
    benefits: ["Diskon Grooming 5%", "Reminder Vaksin"],
    status: "Aktif",
    members: 420,
  },
  {
    id: 2,
    level: "Gold",
    range: "Rp 1.000.000 – Rp 4.999.999",
    benefits: ["Diskon Grooming 10%", "Prioritas Reservasi", "Reminder Vaksin"],
    status: "Aktif",
    members: 250,
  },
  {
    id: 3,
    level: "Platinum",
    range: "> Rp 5.000.000",
    benefits: ["Diskon Grooming 15%", "Prioritas Reservasi", "Gratis Konsultasi Dasar", "Reminder Vaksin"],
    status: "Aktif",
    members: 130,
  },
];

export function useMembershipTiers() {
  const [tiers,   setTiers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await membershipAPI.fetchTiers();
        if (!cancelled) setTiers(data?.length ? data : FALLBACK_TIERS);
      } catch {
        if (!cancelled) {
          setTiers(FALLBACK_TIERS); // graceful fallback
          setError("Menggunakan data lokal — tabel Supabase belum dikonfigurasi.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  return { tiers, loading, error, setTiers };
}
