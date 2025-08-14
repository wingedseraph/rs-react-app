export function Spinner() {
  return (
    <div
      className="grid min-h-[140px] w-full place-items-center rounded-lg p-6"
      role="status"
    >
      <img className="h-12 w-12 animate-spin" src="/newLogo.svg" />
    </div>
  );
}
