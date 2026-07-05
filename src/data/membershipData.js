export const MEMBERSHIP_TIERS = [
  {
    id: 1,
    level: "Silver",
    range: "Rp 0 – Rp 999.999",
    members: 420,
    status: "Aktif",
    benefits: ["Diskon Grooming 5%", "Reminder Vaksin"],
  },
  {
    id: 2,
    level: "Gold",
    range: "Rp 1.000.000 – Rp 4.999.999",
    members: 250,
    status: "Aktif",
    highlight: true,
    benefits: ["Diskon Grooming 10%", "Prioritas Reservasi", "Reminder Vaksin"],
  },
  {
    id: 3,
    level: "Platinum",
    range: "> Rp 5.000.000",
    members: 130,
    status: "Aktif",
    benefits: [
      "Diskon Grooming 15%",
      "Prioritas Reservasi",
      "Gratis Konsultasi Dasar",
      "Reminder Vaksin",
    ],
  },
];

/** Helper styling per tier — dipakai di semua halaman */
export const TIER_STYLE = {
  Silver: {
    icon:      "🥈",
    badge:     "bg-slate-100 text-slate-600",
    border:    "border-slate-200",
    bg:        "bg-slate-50",
    btnActive: "bg-slate-500 hover:bg-slate-600",
    textColor: "text-slate-700",
  },
  Gold: {
    icon:      "🥇",
    badge:     "bg-amber-100 text-amber-700",
    border:    "border-amber-200",
    bg:        "bg-amber-50",
    btnActive: "bg-[#FF7A00] hover:bg-[#FF9F43]",
    textColor: "text-amber-700",
  },
  Platinum: {
    icon:      "💎",
    badge:     "bg-purple-100 text-purple-700",
    border:    "border-purple-200",
    bg:        "bg-purple-50",
    btnActive: "bg-purple-600 hover:bg-purple-700",
    textColor: "text-purple-700",
  },
};
