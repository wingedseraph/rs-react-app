import Image from 'next/image';

export function Spinner() {
  return (
    <div
      className="grid min-h-[140px] w-full place-items-center rounded-lg p-6"
      role="status"
    >
      <Image
        priority={false}
        alt="spinner pokemon ball"
        className="h-12 w-12 animate-spin"
        src="/newLogo.svg"
        height="48"
        width="48"
      />
    </div>
  );
}
