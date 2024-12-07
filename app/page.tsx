"use client";

import React, { useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Header } from "../components/header";
import { Form } from "../components/Form";

import "@aws-amplify/ui-react/styles.css";

import "./globals.css"; // Adjust path as necessary

Amplify.configure(outputs);

export default function Page() {
  const [result, setResult] = useState<string>("");

  return (
    <Authenticator>
      <div className="app-container">
        <Header />
        <Form />
      </div>
    </Authenticator>
  );
}


