import React, { use, useContext, createContext, useState, useEffect } from "react";

// Create two contexts
const ThemeContext = createContext("light");
const LanguageContext = createContext("en");

// Component using the `use` hook conditionally with if statement
const ComponentWithUse: React.FC = () => {
  const [showTheme, setShowTheme] = useState(true);

  let content;
  if (showTheme) {
    const theme = use(ThemeContext);
    content = <p>Current theme = {theme}</p>;
  } else {
    const language = use(LanguageContext);
    content = <p>Current language: {language}</p>;
  }

  return (
    <div>
      <h2>Component with "use" hook</h2>
      <button onClick={() => setShowTheme(!showTheme)}>
        Toggle Theme/Language
      </button>
      {content}
    </div>
  );
};

// Component without using the `use` hook (this will cause an error)
const ComponentWithoutUse: React.FC = () => {
  const [showTheme, setShowTheme] = useState(true);

  useEffect(() => {
    console.log("ComponentWithoutUse mounted or updated", showTheme);
    return () => {
      console.log("ComponentWithoutUse unmounted");
    };
  }, [showTheme]);;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (showTheme) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useContext(ThemeContext);
  //  const [state, setState] = useState(false); (would cause error)

    return (
      <div>
        <h2>Component without use hook</h2>
        <button onClick={() => setShowTheme(!showTheme)}>
          Toggle Theme/Language
        </button>
        <p>Current theme: {theme}</p>
      </div>
    );
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const language = useContext(LanguageContext);
    return (
      <div>
        <h2>Component without use hook</h2>
        <button onClick={() => setShowTheme(!showTheme)}>
          Toggle Theme/Language
        </button>
        <p>Current language: {language}</p>
      </div>
    );
  }
};

// Parent component to demonstrate usage
const ContextApp: React.FC = () => {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "fr" : "en"));
  };

  return (
    <ThemeContext.Provider value={theme}>
      <LanguageContext.Provider value={language}>
        <div id="use-hook-context">
          <div>Theme & Language</div>
          <div>
            <button onClick={toggleTheme}>
              Toggle Theme: {theme === "light" ? "Light" : "Dark"}
            </button>
            <button onClick={toggleLanguage}>
              Toggle Language: {language === "en" ? "English" : "French"}
            </button>
          </div>
          {/* <ComponentWithUse /> */}
          {/* ComponentWithoutUse is commented out because it would cause an error */}
          <ComponentWithoutUse />
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export { ComponentWithUse, ComponentWithoutUse, ContextApp };
