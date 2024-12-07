export interface Schema {
    queries: {
      askBedrock: (args: { query: string; template: string }) => Promise<{
        data?: { body?: string };
        errors?: any;
      }>;
    };
  }
  