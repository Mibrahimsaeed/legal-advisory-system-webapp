import type { ServiceHealth } from "@/lib/store/features/admin/admin.types";

export const ADMIN_PAGE_SIZE = 20;
export const SEARCH_DEBOUNCE_MS = 300;

// Topics the backend assigns to questions (app/admin/service.py TOPIC_KEYWORDS).
export const TOPIC_FILTER_OPTIONS: readonly { value: string; label: string }[] = [
  { value: "all", label: "All topics" },
  ...["Family law", "Criminal law", "Property law", "Labour & employment", "Constitutional rights", "Business & tax", "Other"].map(
    (topic) => ({ value: topic, label: topic }),
  ),
];

export const SERVICE_HEALTH_LABELS: Record<ServiceHealth, string> = {
  ok: "Operational",
  simulated: "Simulated",
  not_configured: "Not configured",
  error: "Error",
};

export const AUDIT_ACTION_LABELS: Record<string, string> = {
  user_deactivated: "Deactivated user",
  user_reactivated: "Reactivated user",
  user_deleted: "Deleted user",
};

// Uploaded-document statuses (app/documents/models.py DocumentStatus).
export const DOCUMENT_STATUS_LABELS: Record<string, string> = {
  uploaded: "Uploaded",
  processing: "Processing",
  ready: "Ready",
  failed: "Failed",
};
