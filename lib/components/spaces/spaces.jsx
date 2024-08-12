import * as Uebersicht from "uebersicht";
import Space from "./space.jsx";
import Stickies from "./stickies.jsx";
import { useYabaiContext } from "../yabai-context.jsx";
import { useSimpleBarContext } from "../simple-bar-context.jsx";
import * as Utils from "../../utils";

export { spacesStyles as styles } from "../../styles/components/spaces/spaces";

const { React } = Uebersicht;

export const Component = React.memo(() => {
  const { spaces, windows } = useYabaiContext();
  const { displayIndex, settings } = useSimpleBarContext();
  const { spacesDisplay, process } = settings;
  const {
    displayStickyWindowsSeparately,
    spacesExclusions,
    exclusionsAsRegex,
    showOnDisplay,
  } = spacesDisplay;
  const visible = Utils.isVisibleOnDisplay(displayIndex, showOnDisplay);
  const isProcessVisible = Utils.isVisibleOnDisplay(
    displayIndex,
    process.showOnDisplay
  );

  if (!visible) return null;

  if (!spaces && !windows) {
    return <div className="spaces spaces--empty" />;
  }

  const displays = [...new Set(spaces.map((space) => space.display))];

  const { index: currentSpaceIndex } =
    spaces.find((space) => {
      const { "has-focus": hasFocus, focused: __legacyHasFocus } = space;
      return hasFocus ?? __legacyHasFocus;
    }) || {};

  return displays.map((display, i) => {
    if (display !== displayIndex) return null;

    return (
      <div key={i} className="spaces">
        {displayStickyWindowsSeparately && <Stickies display={display} />}
        {spaces.map((space, i) => {
          const { label, index } = space;
          const lastOfSpace =
            i !== 0 && space.display !== spaces[i - 1].display;

          const key = label?.length ? label : index;
          const isExcluded = Utils.isSpaceExcluded(
            key,
            spacesExclusions,
            exclusionsAsRegex
          );

          if (isExcluded) return null;

          return (
            <Space
              key={key}
              display={display}
              space={space}
              currentSpaceIndex={currentSpaceIndex}
              lastOfSpace={lastOfSpace}
            />
          );
        })}
        {isProcessVisible && <div className="spaces__end-separator" />}
      </div>
    );
  });
});

Component.displayName = "Spaces";
