"use client";

import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Header } from "../components/header";
import { Form } from "../components/Form";

import "@aws-amplify/ui-react/styles.css";

import "./globals.css"; // Adjust path as necessary

Amplify.configure(outputs);

export default function Page() {

  return (
    <Authenticator>
      {({ signOut, user }) => ( // Destructure signOut and user
        <div className="app-container">
          <Header signOut={signOut} user={user} />
          <Form />
        </div>
      )}
    </Authenticator>
  );
}



