import UserPlants from "@/components/dashboardComponents/plantsComponents/userPlants";
import React from "react";

async function Dashboard() {
  return (
    <section className="scrollbar-rounded size-full overflow-auto px-8">
      <UserPlants />
    </section>
  );
}

export default Dashboard;
