import { useSignal } from "@preact/signals";
import InvoiceList from "../islands/invoice-list.tsx";

export default function Home() {
  return (
    <div style={{ width: "100%" }}>
      <InvoiceList />
    </div>
  );
}
