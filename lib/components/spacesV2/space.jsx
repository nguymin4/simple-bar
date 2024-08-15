import * as Uebersicht from "uebersicht";
import OpenedApps from "./opened-apps.jsx";
import * as Aerospace from "../../aerospace";
import * as Utils from "../../utils";

const { React } = Uebersicht;

const Component = React.memo(({ space, focused, focusedWindowId, windows }) => {
  const onClick = React.useCallback(() => Aerospace.goToSpace(space), [space])
  const classes = Utils.classNames('space', { "space--focused": focused });

  if (!windows?.length && !focused) {
    return null
  }

  return (
    <React.Fragment>
      <div className={classes}>
        <button
          className="space__inner"
          onClick={onClick}
        >
          <input
            type="text"
            className="space__label"
            value={space}
            style={{ width: `${space.toString().length}ch` }}
            readOnly
          />
          <OpenedApps windows={windows} focusedWindowId={focusedWindowId} />
        </button>
      </div>
    </React.Fragment>
  )
}, arePropsEquals)

function arePropsEquals(prevProps, nextProps) {
  if (prevProps.space !== nextProps.space
    || prevProps.focused !== nextProps.focused
    || prevProps.focusedWindowId !== nextProps.focusedWindowId
    || prevProps.windows?.length !== nextProps.windows?.length
  ) {
    return false
  }

  const prevWindows = prevProps.windows;
  const nextWindows = nextProps.windows;
  for (let i = 0; i < prevWindows.length; i++) {
    if (prevWindows[i].windowId != nextWindows[i].windowId) {
      return false
    }
  }
  return true
}

Component.displayName = "Space"

export default Component
