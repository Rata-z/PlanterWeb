import UserPlants from "@/components/dashboardComponents/plantsComponents/userPlants";
import React from "react";

async function Dashboard() {
  return (
    <section className="flex flex-col">
      <UserPlants />
    </section>
  );
}

export default Dashboard;
