"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { Plant, getPlants } from "@/api/plantController";

function UserPlants() {
  const { currentUser } = useAuth();
  const [plants, setPlantList] = useState<Plant[]>([]);
  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    if (!currentUser) {
      console.log("token is missing");
      return;
    }
    const token = await currentUser.getIdToken();
    const plantList = await getPlants(token);
    setPlantList(plantList);
  };

  return (
    <div>
      {plants.length > 0 ? (
        <div>
          {plants.map((plant) => {
            return <div key={plant.plantId}>{plant.title}</div>;
          })}
        </div>
      ) : (
        <div> Plant list is empty</div>
      )}
    </div>
  );
}

export default UserPlants;
