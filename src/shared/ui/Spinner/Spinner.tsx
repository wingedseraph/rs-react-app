export default function Spinner() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="not-sr-only h-6 w-6 animate-spin rounded-full border-b-2 border-current"></div>
    </div>
  );
}
