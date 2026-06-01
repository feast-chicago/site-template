import { useBusinessContext } from "@/contexts/business-context";

export default function Footer() {
  const { business, isLoading, error } = useBusinessContext();
  return (
    <div className="w-full p-10 bg-primary text-primary-foreground">
      {isLoading ? (
        <>loading...</>
      ) : error ? (
        <>error</>
      ) : business ? (
        <>{business.name}</>
      ) : (
        <>fallback</>
      )}
    </div>
  );
}
