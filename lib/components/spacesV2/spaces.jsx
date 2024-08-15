import * as Uebersicht from "uebersicht";
import Space from "./space.jsx";
import * as Aerospace from "../../aerospace";

export { spacesStyles as styles } from "../../styles/components/spacesV2/spaces";

const { React } = Uebersicht;

export function Component({ spaces, currentSpace }) {
  const [groupedApps, setGroupedApps] = React.useState({});

  React.useEffect(() => {
    async function fetchOpenedApps() {
      const focusedApp = await Aerospace.getFocusedApp();
      const apps = await Aerospace.listAllApps();

      const groupedApps = apps.reduce((acc, app) => {
        const focused = app.windowId === focusedApp.windowId;
        const enrichedApp = { ...app, focused}
        if (acc[app.workspace]) {
          acc[app.workspace].push(enrichedApp);
        } else {
          acc[app.workspace] = [enrichedApp];
        }
        return acc
      }, {});

      setGroupedApps(groupedApps);
    }

    fetchOpenedApps()
  }, [spaces, currentSpace])

  return (
    <div className="spaces">
      {spaces.map((space) => (
        <Space
          key={space}
          space={space}
          focused={space === currentSpace}
          apps={groupedApps[space]}
        />
      ))}
    </div>
  )
}
