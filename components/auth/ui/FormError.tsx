export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div role="alert" className="rounded-xl border border-red-500/35 bg-red-500/10 px-3.5 py-2.5 text-[13px] text-red-300">
      {message}
    </div>
  );
}
