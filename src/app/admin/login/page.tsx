import AdminLoginForm from '@/components/admin/AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-brand-beige
        px-4
      "
    >
      <AdminLoginForm />
    </div>
  );
}
