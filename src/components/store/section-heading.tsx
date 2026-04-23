export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="eyebrow">{eyebrow}</p>
      <div className="space-y-3">
        <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">{title}</h2>
        <p className="text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
      </div>
    </div>
  );
}
