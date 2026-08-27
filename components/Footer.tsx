import { useBusinessContext } from "@/contexts/business-context";

export default function Footer() {
  const { business } = useBusinessContext();
  return (
    <div className="w-full p-10 bg-primary text-primary-foreground">
      <p>{business.name}</p>
      {/* TODO: If restaurant has more than one location, make a dropdown to choose your location. If a location isn't selected, hide the address. */}
      <p>{business.business_address[0].formatted_address}</p>
    </div>
  );
}
