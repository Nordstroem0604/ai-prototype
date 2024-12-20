export interface Message {
  content: string;
  isUser: boolean;
}

type Language = 'en' | 'da';

interface Feature {
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    title: "Company Search",
    description: "Search for companies using their CVR number to get detailed information and analysis."
  },
  {
    title: "Web Site Analysis",
    description: "Get detailed insights about any website including performance metrics, content evaluation, and technology analysis."
  }
];

export const quickReplies: Record<Language, string[]> = {
  en: ["Who are you?", "How can you help me?", "What data do you have?"],
  da: ["Hvem er du?", "Hvordan kan du hjælpe?", "Hvilke data har du?"]
};

// Define responses that match the quickReplies keys exactly
export const responses: Record<Language, Record<string, string>> = {
  en: {
    "Who are you?":
      "I'm Freyai, an advanced AI assistant specializing in financial analysis and machine learning insights. I'm here to help you interpret complex financial data, provide insights on company performance, and explain machine learning model outputs in clear terms. How can I assist you today?",
    "How can you help me?":
      "I can assist with:\n\n📊 Financial data analysis\n🔍 Credit risk assessment\n📈 Market trend analysis\n🤖 ML model interpretation\n💡 Business recommendations",
    "What data do you have?":
      "I have access to a wide range of financial and business data, including historical market data, company financial metrics, industry reports, and regulatory filings."
  },
  da: {
    "Hvem er du?":
      "Jeg er Freyai, en avanceret AI-assistent specialiseret i finansiel analyse og machine learning-indsigt. Jeg hjælper med at fortolke komplekse finansielle data og give klare, handlingsorienterede anbefalinger. Hvordan kan jeg hjælpe dig i dag?",
    "Hvordan kan du hjælpe?":
      "Jeg kan hjælpe med:\n\n📊 Finansiel dataanalyse\n🔍 Kreditrisikovurdering\n📈 Markedstrendanalyse\n🤖 ML-model fortolkning\n💡 Forretningsanbefalinger",
    "Hvilke data har du?":
      "Jeg har adgang til omfattende finansielle og forretningsmæssige data, herunder historiske markedsdata, virksomhedsøkonomiske nøgletal, brancherapporter og regulatoriske indberetninger."
  }
};

export function getWelcomeMessage(language: Language): Message {
  return {
    content:
      language === 'en'
        ? "Welcome to freyai. What companies do you want to explore today?"
        : "Velkommen til freyai. Hvilke virksomheder vil du udforske i dag?",
    isUser: false
  };
}

  