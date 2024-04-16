import { Client } from "../model/client.ts";
import { Invoice } from "../model/invoice.ts";

export const createInvoice = async (invoice: Invoice): Promise<Invoice> => {
  // save on a file path /data/invoice.json
  const file = await Deno.open("./data/invoice.json", {
    write: true,
    create: true,
  });

  const data = await Deno.readTextFile("./data/invoice.json");

  const invoices: Invoice[] = data ? JSON.parse(data) : [];

  const newInvoice = { ...invoice, id: invoices.length + 1 };

  invoices.push(newInvoice);

  await Deno.writeTextFile(
    "./data/invoice.json",
    JSON.stringify(invoices, null, 2),
  );

  return newInvoice;
};

export const fetchInvoices = async (): Promise<Invoice[]> => {
  const data = await Deno.readTextFile("./data/invoice.json");

  return data ? JSON.parse(data) : [];
};

export const fetchInvoice = async (
  id: string,
): Promise<Invoice | undefined> => {
  const invoices = await fetchInvoices();

  return invoices.find((invoice) => invoice.number === id);
};

export const deleteInvoice = async (id: string): Promise<void> => {
  const invoices = await fetchInvoices();

  const newInvoices = invoices.filter((invoice) => invoice.id.toString() !== id);

  await Deno.writeTextFile(
    "./data/invoice.json",
    JSON.stringify(newInvoices, null, 2),
  );
};

export const createClient = async (client: Client): Promise<Client> => {
  // save on a file path /data/client.json
  await Deno.open("./data/client.json", {
    write: true,
    create: true,
  });

  const data = await Deno.readTextFile("./data/client.json");

  const clients: Client[] = data ? JSON.parse(data) : [];

  const newClient = { ...client, id: `${clients.length + 1}` };

  clients.push(newClient);

  await Deno.writeTextFile(
    "./data/client.json",
    JSON.stringify(clients, null, 2),
  );

  return newClient;
};

export const fetchClients = async (): Promise<Client[]> => {
  const data = await Deno.readTextFile("./data/client.json");

  return data ? JSON.parse(data) : [];
};

export const fetchClient = async (
  name: string,
): Promise<Client | undefined> => {
  const clients = await fetchClients();

  return clients.find((client:Client) => client.name === name);
};

export const deleteClient = async (id: string): Promise<void> => {
  const clients = await fetchClients();

  const newClients = clients.filter((client) => client.id !== id);

  await Deno.writeTextFile(
    "./data/client.json",
    JSON.stringify(newClients, null, 2),
  );
};
