export function Spinner() {
  return (
    <div
      role="status"
      className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible"
    >
      <img className="h-12 w-12 animate-spin" src="/newLogo.svg" />
    </div>
  );
}
