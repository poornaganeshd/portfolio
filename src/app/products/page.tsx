import { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products | Poornaganesh",
  description:
    "Products built at the intersection of AI, creative technology, and film.",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
