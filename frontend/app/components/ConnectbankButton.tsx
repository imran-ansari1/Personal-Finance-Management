"use client";

import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";

export default function ConnectBankButton() {
  const [linkToken, setLinkToken] = useState(null);

  // Backend se link token lana
  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/plaid/create-link-token",
          {},
          {
            withCredentials: true, // Agar JWT cookie use kar rahe ho
          }
        );

        setLinkToken(res.data.linkToken);
      } catch (error) {
        console.error("Error creating link token:", error);
      }
    };

    createLinkToken();
  }, []);

  // Plaid Link
  const { open, ready } = usePlaidLink({
    token: linkToken,

 onSuccess: async (public_token, metadata) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/exchange-token",
      {
        publicToken: public_token,
      },
      {
        withCredentials: true,
      }
    );

    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
},

    onExit: (err, metadata) => {
      console.log(err);
      console.log(metadata);
    },
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Connect Bank
    </button>
  );
}