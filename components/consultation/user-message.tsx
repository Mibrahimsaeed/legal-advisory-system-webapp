export function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[80%] rounded-2xl bg-muted px-4 py-2.5 text-[15px] leading-6 whitespace-pre-wrap">
        {text}
      </p>
    </div>
  );
}
