"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

const DeleteUser = (props) => {
  const userEmail = props.email;
  const [disabled, setDisabled] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const deleteUser = async () => {
    if (inputValue === "Delete") {
      setDisabled(false);
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:3000/api/user/" + userEmail, {
          method: "DELETE",
        })
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              Swal.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success"
              ).then(() => {
                // signOut();
                router.push("/");
              });
            } else if (response.status === 404) {
              Swal.fire("Error!", "User not found.", "error");
            } else {
              Swal.fire("Error!", "Failed to delete user.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire(
              "Error!",
              "An error occurred while deleting the user.",
              "error"
            );
          });
      }
    });
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setDisabled(value !== "Delete");
  };
  return (
    <div className="grid grid-cols-3">
      <h6>Delete this account</h6>
      <div className="flex justify-end">
        <input
          value={inputValue}
          onChange={handleInputChange}
          className="bg-[#e9e9e9] border border-[#b5b5b5] rounded w-1/2 px-2"
          placeholder='please type "Delete"'
          type="text"
        />
      </div>
      <div className="text-end">
        <button
          disabled={disabled}
          onClick={deleteUser}
          className={`px-2 rounded ${disabled ? "bg-red-200 text-[#a4a4a4]" : "bg-red-500 text-white"
            }`}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
