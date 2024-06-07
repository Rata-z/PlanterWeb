import React from "react";
// import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase/config";
import { Auth, User, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "@/context/authContext";
const Home = () => {
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/home")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       changeMessage(data.message);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);
  return (
    <section className="no-scrollbar bg-white flex w-full  max-xl:max-h-screen   max-xl:overflow-y-scroll">
      <div>
        <header className="font-bold ">SIGN IN</header>
        <header className="font-bold ">SIGN IN</header>
        <header className="font-bold ">SIGN IN</header>
      </div>
      {/* <div>{currentUser ? `current User ${currentUser.email}` : ""}</div> */}
    </section>
  );
};

export default Home;
