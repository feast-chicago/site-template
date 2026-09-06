import { Business, TextProps } from "@/schema";

export default function TextSection({
  props,
  business,
}: {
  props: TextProps;
  business: Business;
}) {
  const alignClass =
    props.alignment === "center"
      ? "text-center items-center"
      : props.alignment === "right"
        ? "text-right items-end"
        : "text-left items-start";

  const HeadingTag = props.headingSize ?? "h2";

  return (
    <section className={`p-1 flex flex-col gap-4 ${alignClass}`}>
      {props.heading && (
        <HeadingTag className="text-2xl font-secondary font-medium text-foreground">
          {props.heading}
        </HeadingTag>
      )}
      {props.body && (
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          {props.body}
        </p>
      )}
      {/* {props.button && (
        <Button asChild variant={props.button.variant}>
          <Link
            href={props.button.href ?? ""}
            target={props.button.openInNewTab ? "_blank" : undefined}
          >
            {props.button.label}
          </Link>
        </Button>
      )} */}
    </section>
  );
}
