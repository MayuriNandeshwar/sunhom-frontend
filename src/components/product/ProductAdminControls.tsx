"use client";

export function ProductAdminControls({
  mode,
  onSave,
  onPublish,
}: any) {
  if (mode !== "edit") return null;

  return (
    <div className="mt-8 flex gap-4">
      <button
        onClick={onSave}
        className="border px-6 py-3 rounded-full"
      >
        Save Draft
      </button>

      <button
        onClick={onPublish}
        className="bg-emerald-700 text-white px-6 py-3 rounded-full"
      >
        Publish
      </button>
    </div>
  );
}
