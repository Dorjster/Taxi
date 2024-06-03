"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      localStorage.setItem("phoneNumber", phoneNumber);
      toast.success("Phone number saved successfully!");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      push("/map");
    } catch (error) {
      console.error("Error saving phone number:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   const number = localStorage.getItem("phoneNumber");
  //   if (number !== null && number !== "") {
  //     push("/map");
  //   } else {
  //     push("/");
  //   }
  // }, [push]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col items-center ">
        <input
          type="tel"
          placeholder="Утасны дугаар"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="mb-4 px-4 py-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded w-[100%]"
          disabled={isLoading}
        >
          {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
        </button>
      </form>
    </div>
  );
};

export default Login;
