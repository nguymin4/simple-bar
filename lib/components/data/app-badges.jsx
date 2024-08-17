import * as Uebersicht from "uebersicht";
import * as DataWidget from "./data-widget.jsx";
import * as AppIcons from "../../app-icons";
import { SuspenseIcon } from "../icons/icon.jsx";
import useServerSocket from "../../hooks/use-server-socket";

export { timeStyles as styles } from "../../styles/components/data/app-badges.js";

const { React } = Uebersicht;

export const Widget = React.memo(() => {
  const [appBadges, setAppBadges] = React.useState({});

  const resetWidget = () => {
    setAppBadges({});
  };

  useServerSocket("app-badges", true, setAppBadges, resetWidget);

  if (!Object.keys(appBadges).length) {
    return <div />;
  }

  return (
    <DataWidget.Widget classes="app-badges">
      {Object.entries(appBadges).map(([appName, badge]) => {
        const Icon = AppIcons.apps[appName] || AppIcons.apps.Default;
        return (
          <SuspenseIcon key={appName}>
            <Icon className="app-icon" />
            <span>{badge}</span>
          </SuspenseIcon>
        );
      })
      }
    </DataWidget.Widget >
  )
})

Widget.displayName = "AppBadges";
