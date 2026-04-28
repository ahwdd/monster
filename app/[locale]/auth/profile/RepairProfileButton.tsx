// src/components/profile/RepairProfileButton.tsx
"use client";
import { useState } from "react";
import { IoRefreshOutline } from "react-icons/io5";
import { useToast } from "@/contexts/ToastContext";

type Props = {
  userId: string;
  onRepaired: (freshProfile: any) => void;
};

export default function RepairProfileButton({ userId, onRepaired }: Props) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  async function handleRepair() {
    if (loading) return;
    setLoading(true);
    try {
      // 1. Call the repair API for this specific user
      const repairRes = await fetch("/api/admin/repair", {
        method:      "POST",
        credentials: "include",
        headers:     { "Content-Type": "application/json" },
        body:        JSON.stringify({ userId }),
      });
      const repairData = await repairRes.json();
      if (!repairData.success) {
        toast.error(repairData.error ?? "Repair failed");
        return;
      }

      // 2. Re-fetch the profile so the UI reflects the corrected values
      const profileRes  = await fetch("/api/profile/register", { credentials: "include" });
      const profileData = await profileRes.json();
      if (profileData.data) {
        onRepaired(profileData.data);
        toast.success("Profile stats refreshed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleRepair}
      disabled={loading}
      title="Recalculate & refresh profile stats"
      className="
        flex items-center justify-center
        w-8 h-8 rounded-xl
        bg-[#171717] border border-[#272727]
        text-[#555] hover:text-[#ccccd0] hover:border-[#444]
        transition-colors disabled:opacity-40 disabled:cursor-not-allowed
      ">
      <IoRefreshOutline
        className={`size-4 ${loading ? "animate-spin" : ""}`}
      />
    </button>
  );
}