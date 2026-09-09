import ShopThemeProvider from "@/theme/ShopThemeProvider";
import ShopHeader from "@/components/ShopHeader";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShopThemeProvider>
      <ShopHeader />
      {children}
    </ShopThemeProvider>
  );
}
