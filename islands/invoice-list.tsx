import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

type Invoice = {
  id: number;
  name: string;
  number: string;
  data: string;
  base: number;
  total: number;
};

const InvoiceList = () => {
  const invoices = useSignal([]);
  const loading = useSignal(true);

  async function fetchInvoices() {
    loading.value = true;
    const response = await fetch("/api/invoice");
    const data = await response.json();
    invoices.value = data;
    loading.value = false;
  }

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {loading.value && <div>Loading...</div>}
      {invoices.value.length !== 0 && <div>No invoices</div>}
      {invoices.value.length !== 0 && (
        <div width="100%">
          {invoices.value.map((invoice: Invoice) => (
            <div
              key={invoice.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                itemsAlign: "center",
                padding: "10px",
                borderBottom: "1px solid #ccc",
                width: "calc(100% - 20px)",
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  <p>Client: {invoice.name}</p>
                  <p>Number: {invoice.number}</p>
                  <p>Date: {invoice.data}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  <p>Base: {invoice.base}</p>
                  <p>Total: {invoice.total}</p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  itemsAlign: "center",
                  gap: "10px",
                  height: "fit-content",
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                <button
                  onClick={async () => {
                    await fetch(`/api/invoice?id=${invoice.id}`, {
                      method: "DELETE",
                    });
                    fetchInvoices();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
