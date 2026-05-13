import { createContext, useContext, useState } from "react";

const LabContext = createContext();

const datasets = [
  {
    name: "Retail Sales Lake",
    rows: "50M",
    format: "Parquet",
    storage: "S3 / ADLS",
    status: "Benchmark Ready",
  },
  {
    name: "ERP Orders",
    rows: "18M",
    format: "Relational",
    storage: "PostgreSQL",
    status: "Federation Ready",
  },
  {
    name: "CRM Customers",
    rows: "6M",
    format: "Relational",
    storage: "Snowflake",
    status: "AI Ready",
  },
];

const engines = [
  {
    name: "Exasol",
    role: "Analytics Speed Layer",
  },
  {
    name: "Snowflake",
    role: "Cloud Warehouse",
  },
  {
    name: "Databricks",
    role: "Lakehouse Platform",
  },
  {
    name: "ClickHouse",
    role: "Realtime Analytics",
  },
  { name: "BigQuery", 
    role: "Cloud Analytics" 
  },
  { name: "Trino", 
    role: "Federated Query" 
  },
];

export function LabProvider({ children }) {
  const [activeDataset, setActiveDataset] = useState(datasets[0]);

  const [activeEngine, setActiveEngine] = useState(engines[0]);
  

  return (
    <LabContext.Provider
      value={{
        datasets,
        engines,

        activeDataset,
        setActiveDataset,

        activeEngine,
        setActiveEngine,
      }}
    >
      {children}
    </LabContext.Provider>
  );
}

export function useLab() {
  return useContext(LabContext);
}