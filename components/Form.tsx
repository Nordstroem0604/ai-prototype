import React, { FormEvent, useState } from "react";
import { Loader, Placeholder } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../amplify/data/resource";
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

      // Properly typed `askBedrock` method
      const response = await amplifyClient.queries.askBedrock({
        query: formData.get("query")?.toString() || "",
        template: formData.get("template")?.toString() || "",
      });

      if (response && response.data) {
        setResult(response.data.body || "No data returned");
      } else {
        console.log("Data", response);
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



