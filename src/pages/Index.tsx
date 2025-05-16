
import React from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import { HealthProvider } from "@/context/HealthContext";

const Index: React.FC = () => {
  return (
    <HealthProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </HealthProvider>
  );
};

export default Index;
