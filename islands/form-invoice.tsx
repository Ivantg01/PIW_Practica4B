import { useState } from "preact/hooks";
import {fetchClient} from "../utils/db.ts";

export default function CreateInvoice() {
  const [form, setForm] = useState<Invoice>();
  const [lines, setLines] = useState<InvoiceLine[]>([]);
  const [taxs, setTaxs] = useState<InvoiceTax[]>([]);
  const [error, setError] = useState<string>("");


  const validateName= async () => {
      const client = await fetchClient(form.name);
      alert(client)
      if (!client) {
          setError("Client doesn't exists")
          return false
      } else {
          setError("")
          return true
      }
  }
  const validateForm= () => {
    setError("        ")
    let invoiceValid=true
    let lineValid=true
    let taxValid=true
    if(!form.name || !form.number || !form.data ||
    !form.base || !form.total){
        invoiceValid=false
    }
    if(lines.size>0) {
        lines.map((elem) => {
            if (!elem.description || !elem.quantity || !elem.price || !elem.total) {
                lineValid = false
            }
        })
    }
      if(taxs.size>0) {
          taxs.map((elem) => {
              if (!elem.description || !elem.rate || !elem.total) {
                  taxValid = false
              }
          })
      }

      if(taxValid===true && invoiceValid===true && lineValid===true){
          setError("")
          return true
      }else{
          setError("Error, missing blanks")
          return false
      }
  }

  const handleAddLine = () => {
    setLines([
      ...lines,
      {
        id: lines.length + 1,
        description: "",
        quantity: "",
        price: "",
        total: "",
      },
    ]);
  };

  const handleRemoveLine = (id: number) => {
    setLines(lines.filter((line) => line.id !== id));
  };

  const handleAddTax = () => {
    setTaxs([
      ...taxs,
      {
        id: `${taxs.length + 1}`,
        description: "",
        rate: "",
        total: "",
      },
    ]);
  };

  const handleRemoveTax = (id: string) => {
    setTaxs(taxs.filter((tax) => tax.id !== id));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    try {
      if(validateForm()===true && validateName()===true){
          fetch("/api/invoice", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  ...form,
                  lines,
                  taxs,
              }),
          });
      }
    } catch (error) {
    }
  };

  const Responsive = ({ children }: { children: any }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        borderRadius: "5px",
      }}
    >
      {children}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        color: "#fff",
        padding: "20px",
        width: "100%",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Responsive>
        <label>
          Name
        </label>
        <input
          type="text"
          value={form?.name}
          onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
        />
        <label>
          Number
        </label>
        <input
          type="number"
          value={form?.number}
          onChange={(e) => setForm({ ...form, number: e.currentTarget.value })}
        />
        <label>
          Date
        </label>
        <input
          type="date"
          value={form?.data}
          onChange={(e) => setForm({ ...form, data: e.currentTarget.value })}
        />
        <label>
          Base
        </label>
        <input
          type="number"
          value={form?.base}
          onChange={(e) =>
            setForm({ ...form, base: Number(e.currentTarget.value) })}
        />
        <label>
          Lines
        </label>
        {lines.map((line) => (
          <Responsive key={line.id}>
            <label>
              Description
            </label>
            <input
              type="text"
              value={line.description}
              onChange={(e) =>
                setLines(
                  lines.map((l) =>
                    l.id === line.id
                      ? { ...l, description: e.currentTarget.value }
                      : l
                  ),
                )}
            />
            <label>
              Quantity
            </label>
            <input
              type="number"
              value={line.quantity}
              onChange={(e) =>
                setLines(
                  lines.map((l) =>
                    l.id === line.id
                      ? { ...l, quantity: e.currentTarget.value }
                      : l
                  ),
                )}
            />
            <label>
              Price
            </label>
            <input
              type="number"
              value={line.price}
              onChange={(e) =>
                setLines(
                  lines.map((l) =>
                    l.id === line.id
                      ? { ...l, price: e.currentTarget.value }
                      : l
                  ),
                )}
            />
            <label>
              Total
            </label>
            <input
              type="number"
              value={line.total}
              onChange={(e) =>
                setLines(
                  lines.map((l) =>
                    l.id === line.id
                      ? { ...l, total: e.currentTarget.value }
                      : l
                  ),
                )}
            />
            <button
              onClick={() => handleRemoveLine(line.id)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "red",
                color: "#fff",
                border: "none",
                width: "100%",
              }}
              type="button"
            >
              Remove Line
            </button>
          </Responsive>
        ))}
        <button
          onClick={handleAddLine}
          style={{
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            width: "100%",
          }}
          type="button"
        >
          Add Line
        </button>
        <label>
          Taxs
        </label>
        {taxs.map((tax) => (
          <Responsive key={tax.id}>
            <label>
              Description
            </label>
            <input
              type="text"
              value={tax.description}
              onChange={(e) =>
                setTaxs(
                  taxs.map((t) =>
                    t.id === tax.id
                      ? { ...t, description: e.currentTarget.value }
                      : t
                  ),
                )}
            />
            <label>
              Rate
            </label>
            <input
              type="number"
              value={tax.rate}
              onChange={(e) =>
                setTaxs(
                  taxs.map((t) =>
                    t.id === tax.id ? { ...t, rate: e.currentTarget.value } : t
                  ),
                )}
            />
            <label>
              Total
            </label>
            <input
              type="number"
              value={tax.total}
              onChange={(e) =>
                setTaxs(
                  taxs.map((t) =>
                    t.id === tax.id ? { ...t, total: e.currentTarget.value } : t
                  ),
                )}
            />
            <button
              onClick={() => handleRemoveTax(tax.id)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "red",
                color: "#fff",
                border: "none",
                width: "100%",
              }}
              type="button"
            >
              Remove Tax
            </button>
          </Responsive>
        ))}
        <button
          onClick={handleAddTax}
          style={{
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "#fff",
            color: "#000",
            border: "none",
            width: "100%",
          }}
          type="button"
        >
          Add Tax
        </button>
        <label>
          Total
        </label>
        <input
          type="number"
          value={form?.total}
          onChange={(e) =>
            setForm({ ...form, total: Number(e.currentTarget.value) })}
        />
      </Responsive>
      <button
        style={{
          padding: "10px",
          borderRadius: "5px",
          backgroundColor: "#fff",
          color: "#000",
          border: "none",
          width: "100%",
        }}
        type="submit"
      >
        Submit
      </button>
        {error!=="" && <p>{error}</p>}
    </form>
  );
}

type Invoice = {
  name: string;
  number: string;
  data: string;
  base: string;
  total: string;
};

type InvoiceLine = {
  id: number;
  description: string;
  quantity: string;
  price: string;
  total: string;
};

type InvoiceTax = {
  id: string;
  description: string;
  rate: string;
  total: string;
};
