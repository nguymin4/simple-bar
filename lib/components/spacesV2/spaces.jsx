import * as Uebersicht from "uebersicht";
import Space from "./space.jsx";
import useServerSocket from "../../hooks/use-server-socket";
import { useSimpleBarContext } from "../simple-bar-context.jsx";
import * as Aerospace from "../../aerospace";

export { styles } from "../../styles/components/spacesV2/spaces";

const { React } = Uebersicht;

export function Component({ ...initialValues }) {
  const { settings } = useSimpleBarContext();
  const { enableServer: serverEnabled } = settings.global;

  const [currentSpace, setCurrentSpace] = React.useState(initialValues.currentSpace);
  const [groupedWindows, setGroupedWindows] = React.useState({});
  const [focusedWindowId, setFocusedWindowId] = React.useState(initialValues.focusedWindowId);

  // We need to refetch all windows everytime window focus is changed e.g.
  // - New window is created
  // - Window closed
  // - Window moved to a different workspace
  React.useEffect(() => {
    async function fetchOpenedWindows() {
      const windows = await Aerospace.listWindows();
      const groupedWindows = windows.reduce((acc, window) => {
        if (acc[window.workspace]) {
          acc[window.workspace].push(window);
        } else {
          acc[window.workspace] = [window];
        }
        return acc;
      }, {});

      setGroupedWindows(groupedWindows);
    }

    fetchOpenedWindows();
  }, [focusedWindowId])

  // Track currentSpace
  const refreshCurrentSpace = (payload) => setCurrentSpace(payload.focusedSpace);
  const resetCurrentSpace = () => setCurrentSpace(initialValues.currentSpace);
  useServerSocket("spaces", serverEnabled, refreshCurrentSpace, resetCurrentSpace);


  // Track focusedWindow
  const refreshFocusedWindow = (payload) => setFocusedWindowId(payload.windowId)
  const resetFocusedWindow = () => setFocusedWindowId(initialValues.focusedWindowId);
  useServerSocket("windows", serverEnabled, refreshFocusedWindow, resetFocusedWindow);

  return (
    <div className="spaces">
      {initialValues.spaces.map((space) => {
        const focused = space === currentSpace;
        return (
          <Space
            key={space}
            space={space}
            focused={focused}
            focusedWindowId={focused ? focusedWindowId : null}
            windows={groupedWindows[space] || []}
          />
        )
      })}
    </div>
  )
}
