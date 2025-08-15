import Image from 'next/image';

export function Spinner() {
  return (
    <div
      className="grid min-h-[140px] w-full place-items-center rounded-lg p-6"
      role="status"
    >
      <Image
        alt="spinner pokemon ball"
        className="h-12 w-12 animate-spin"
        src="/newLogo.svg"
      />
    </div>
  );
}
