import { MerchSection } from "~/components/merch/merch-section";

export default function MerchPage() {
  return (
    // This container ignores the default layout padding if any, ensuring full screen
    <main className="min-h-screen w-full bg-[#0f0221]">
      <MerchSection />
    </main>
  );
}
