export function Spinner() {
  return (
    <div
      role="status"
      className="grid min-h-[140px] w-full place-items-center rounded-lg p-6"
    >
      <img className="h-12 w-12 animate-spin" src="/newLogo.svg" />
    </div>
  );
}
