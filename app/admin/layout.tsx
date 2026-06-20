export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#121212] text-white" dir="rtl">
      {children}
    </div>
  );
}
