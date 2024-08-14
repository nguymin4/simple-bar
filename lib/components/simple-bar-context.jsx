import * as Uebersicht from "uebersicht";

const { React } = Uebersicht;

const SimpleBarContext = React.createContext({
  display: 1,
  settings: {},
  setSettings: () => {},
});

export const useSimpleBarContext = () => React.useContext(SimpleBarContext);

export default function SimpleBarContextProvider({
  initialSettings,
  children,
}) {
  const [settings, setSettings] = React.useState(initialSettings);

  return (
    <SimpleBarContext.Provider
      value={{
        displayIndex: 0,
        settings,
        setSettings,
      }}
    >
      {children}
    </SimpleBarContext.Provider>
  );
}
