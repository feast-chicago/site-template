import { useBusinessContext } from "@/contexts/business-context";

export default function Footer() {
  const { business } = useBusinessContext();
  return (
    <div className="w-full p-10 bg-primary text-primary-foreground">
      <p>{business.name}</p>
      <p>
        {[business.business_address.line_1, business.business_address.line_2]
          .join(" ")
          .trim()}
      </p>
      <p>
        {" "}
        {[business.business_address.city, business.business_address.state]
          .join(", ")
          .trim()}{" "}
        {business.business_address.zip_code}
      </p>
    </div>
  );
}
