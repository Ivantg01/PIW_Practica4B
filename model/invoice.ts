export type Invoice = {
  id: number;
  name: string;
  number: string;
  date: string;
  lines: InvoiceLine[];
  taxs: InvoiceTax[];
  base: number;
  total: number;
};

export type InvoiceLine = {
  id: number;
  description: string;
  quantity: number;
  price: number;
  total: number;
};

export type InvoiceTax = {
  id: number;
  description: string;
  rate: number;
  total: number;
};
