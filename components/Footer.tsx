import { useBusinessContext } from "@/contexts/business-context";

export default function Footer() {
  const { business, isLoading, error } = useBusinessContext();
  const address = business?.business_address;
  return (
    <div className="w-full p-10 bg-primary text-primary-foreground">
      {isLoading ? (
        <>loading...</>
      ) : error ? (
        <>error</>
      ) : business ? (
        <>
          <p>{business.name}</p>
          <p>
            {[
              business.business_address.line_1,
              business.business_address.line_2,
            ]
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
        </>
      ) : (
        <>fallback</>
      )}
    </div>
  );
}
