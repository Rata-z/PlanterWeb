"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { Plant, getPlants } from "@/api/plantController";
import { PiPlantLight } from "react-icons/pi";
import { Spinner } from "@nextui-org/spinner";

function UserPlants() {
  const { currentUser } = useAuth();
  const [plants, setPlantList] = useState<Plant[] | null>(null);
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
    setPlantList(plantList.sort((a, b) => a.title.localeCompare(b.title)));
  };

  return (
    <div>
      {!plants ? (
        <div className="flex h-64 w-full justify-center">
          <Spinner />
        </div>
      ) : plants.length > 0 ? (
        <div className="grid grid-flow-row grid-cols-2 gap-8 pb-8 sm:grid-cols-3">
          {plants.map((plant) => {
            return (
              <div
                className="border-ring flex min-h-64 w-full flex-col items-center justify-center rounded-2xl border-t-2 bg-accent p-3 text-small shadow-xl"
                key={plant.plantId}
              >
                <PiPlantLight size={98} className="rounded-xl border-2 p-1" />
                <h1 className="pt-4 text-xl">{plant.title}</h1>
                <h3>Last watered: {plant.lastWateringDate}</h3>
                <h3>Next Watering: {plant.nextWateringDate}</h3>
              </div>
            );
          })}
        </div>
      ) : (
        <div> Plant list is empty</div>
      )}
    </div>
  );
}

export default UserPlants;
