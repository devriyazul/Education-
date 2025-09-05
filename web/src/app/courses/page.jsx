import CourseCatalog from "../../components/CourseCatalog";

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200">
      {/* Main Content Container */}
      <main className="w-full p-4 md:p-6">
        <CourseCatalog />
      </main>
    </div>
  );
}
