"use client";

import { useState } from "react";
import {
  AdminPageHeader,
  adminBtnPrimary,
  adminCardClass,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/AdminUI";
import { FileUploadField } from "@/components/admin/FileUploadField";
import { notify } from "@/lib/toast";

export default function AdminAccountPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function changePassword() {
    if (newPassword !== confirmPassword) {
      notify.error("Passwords do not match");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/admin/account/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      notify.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      notify.error(data.error ?? "Failed to update password");
    }
  }

  return (
    <>
      <AdminPageHeader title="Account Settings" description="Change your admin password and profile photo." />

      <div className={`${adminCardClass} mb-6 space-y-4`}>
        <h3 className="font-semibold text-white">Change Password</h3>
        <div><label className={adminLabelClass}>Current Password</label><input type="password" className={adminInputClass} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} /></div>
        <div><label className={adminLabelClass}>New Password</label><input type="password" className={adminInputClass} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /></div>
        <div><label className={adminLabelClass}>Confirm New Password</label><input type="password" className={adminInputClass} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
        <button onClick={changePassword} disabled={saving} className={adminBtnPrimary}>{saving ? "Updating..." : "Update Password"}</button>
      </div>

      <div className={`${adminCardClass} space-y-4`}>
        <h3 className="font-semibold text-white">Admin Profile Photo</h3>
        <p className="text-sm text-slate-400">This photo appears in the admin sidebar and login page.</p>
        <FileUploadField
          label="Upload Admin Avatar"
          accept="image/jpeg,image/png,image/webp"
          uploadType="admin-avatar"
          onUploaded={async (url) => {
            await fetch("/api/admin/account/profile", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ avatarUrl: url }),
            });
            notify.success("Admin photo updated! Refresh to see changes.");
          }}
        />
      </div>
    </>
  );
}
