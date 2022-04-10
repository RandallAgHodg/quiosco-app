import Image from "next/image";
import React from "react";
import useQuiosco from "../hooks/useQuiosco";
import Category from "./Category";

const Sidebar = () => {
  const { categories } = useQuiosco();
  return (
    <>
      <Image
        width={300}
        height={180}
        src="/img/logo.svg"
        alt="Logotype image"
      />

      <nav className="mt-10">
        {categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </nav>
    </>
  );
};

export default Sidebar;
