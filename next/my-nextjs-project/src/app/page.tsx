import { DialogDemo } from "@/components/dialog";
import  Hero  from "../components/hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-800 text-white">
      <h2 className="text-center  text-lg pt-4"> hello corvit</h2>
      {<DialogDemo />}
      {<Hero />}
    </div>
  );
}
