import React, { FormEvent, useState } from "react";
import { Loader, Placeholder } from "@aws-amplify/ui-react";
import { Schema } from "./interface";
import { generateClient } from "aws-amplify/data";
import "./Form.css";

const amplifyClient = generateClient<Schema>({
  authMode: "userPool",
});

export const Form: React.FC = () => {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      // Use `any` if TypeScript cannot resolve `askBedrock` correctly
      const { data, errors } = await (amplifyClient.queries as any).askBedrock({
        query: formData.get("query")?.toString() || "",
        template: formData.get("template")?.toString() || "",
      });

      if (!errors) {
        setResult(data?.body || "No data returned");
      } else {
        console.log('Data', data)
        console.log('Errors', errors);
        setResult("An error occurred. Please check the console for details.");
      }
    } catch (e) {
      alert(`An error occurred: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form-container">
        <div className="search-container">
          <input
            type="text"
            className="wide-input"
            id="query"
            name="query"
            placeholder="Enter your query"
          />
          <input
            type="text"
            className="wide-input"
            id="template"
            name="template"
            placeholder="Enter your template"
          />
          <button type="submit" className="search-button">
            Generate
          </button>
        </div>
      </form>

      <div className="result-container">
        {loading ? (
          <div className="loader-container">
            <p>Loading...</p>
            <Loader size="large" />
            <Placeholder size="large" />
          </div>
        ) : (
          result && <p className="result">{result}</p>
        )}
      </div>
    </div>
  );
};


