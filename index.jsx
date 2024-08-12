import * as Uebersicht from "uebersicht";
import * as Error from "./lib/components/error.jsx";
import SimpleBarContextProvider from "./lib/components/simple-bar-context.jsx";
import UserWidgets from "./lib/components/data/user-widgets.jsx";
// Each simple-bar widgets exports both a "Component" or "Widget" render function
// and a "styles" string containing its own CSS
import * as SpaceV2 from "./lib/components/spacesV2/spaces.jsx";
import * as Variables from "./lib/styles/core/variables";
import * as Base from "./lib/styles/core/base";
import * as Time from "./lib/components/data/time.jsx";
import * as DateDisplay from "./lib/components/data/date-display.jsx";
import * as Netstats from "./lib/components/data/netstats.jsx";
import * as Cpu from "./lib/components/data/cpu.jsx";
import * as Gpu from "./lib/components/data/gpu.jsx";
import * as Memory from "./lib/components/data/memory.jsx";
import * as Battery from "./lib/components/data/battery.jsx";
import * as Sound from "./lib/components/data/sound.jsx";
import * as Mic from "./lib/components/data/mic.jsx";
import * as Wifi from "./lib/components/data/wifi.jsx";
import * as Keyboard from "./lib/components/data/keyboard.jsx";
import * as Mpd from "./lib/components/data/mpd.jsx";
import * as Graph from "./lib/components/data/graph.jsx";
import * as DataWidgetLoader from "./lib/components/data/data-widget-loader.jsx";
import * as DataWidget from "./lib/components/data/data-widget.jsx";
import * as SideIcon from "./lib/components/side-icon.jsx";
import * as Utils from "./lib/utils";
import * as Settings from "./lib/settings";

// Destructure React from Uebersicht in order to make eslint catch hook rules for example
const { React } = Uebersicht;

// Set refresh frequency to false
// Übersicht auto-refresh system is not required as simple-bar works in sync with
// yabai or AeroSpaces for spaces & process widgets and data widgets are refreshed with
// their local refresh functions
const refreshFrequency = false;

// Init settings from file if existing
Settings.init();

// Get settings from the Settings module
const settings = Settings.get();
const {
  aerospacePath = "/opt/homebrew/bin/aerospace",
  shell, // Shell to use for commands
} = settings.global;

const args = `${aerospacePath}`;
const command = `${shell} simple-bar/lib/scripts/init-aerospace.sh ${args}`;

// Inject global styles into the document
// I prefer using native CSS instead of Emotion bundled by default in Übersicht
Utils.injectStyles("simple-bar-index-styles", [
  Variables.styles,
  Base.styles,
  SpaceV2.styles,
  Settings.styles,
  DataWidget.styles,
  DateDisplay.styles,
  Time.styles,
  Netstats.styles,
  Cpu.styles,
  Gpu.styles,
  Memory.styles,
  Crypto.styles,
  Battery.styles,
  Wifi.styles,
  Keyboard.styles,
  Mic.styles,
  Sound.styles,
  Mpd.styles,
  Graph.styles,
  DataWidgetLoader.styles,
  settings.customStyles.styles,
  SideIcon.styles,
]);

// Render function to display the bar
function render({ output, error }) {
  // Define base classes for the bar based on settings
  const baseClasses = Utils.classNames("simple-bar", {
    "simple-bar--floating": settings.global.floatingBar,
    "simple-bar--no-bar-background": settings.global.noBarBg,
    "simple-bar--no-color-in-data": settings.global.noColorInData,
    "simple-bar--on-bottom": settings.global.bottomBar,
    "simple-bar--inline-spaces-options": settings.global.inlineSpacesOptions,
    "simple-bar--animations-disabled": settings.global.disableAnimations,
    "simple-bar--spaces-background-color-as-foreground":
      settings.global.spacesBackgroundColorAsForeground,
    "simple-bar--widgets-background-color-as-foreground":
      settings.global.widgetsBackgroundColorAsForeground,
    "simple-bar--process-aligned-to-left": !settings.global.centered,
    "simple-bar--no-shadow": true,
  });

  // Handle errors
  if (error) {
    return <Error.Component type="error" classes={baseClasses} />;
  }
  if (!output) {
    return <Error.Component type="noOutput" classes={baseClasses} />;
  }

  // Cleanup the output data
  const cleanedUpOutput = Utils.cleanupOutput(output);

  // Handle specific errors related to yabai, AeroSpace or FlashSpace
  const errors = ["yabaiError", "aerospaceError", "flashspaceError"];
  if (errors.includes(cleanedUpOutput)) {
    return <Error.Component type={cleanedUpOutput} classes={baseClasses} />;
  }

  // Parse the output data
  const data = Utils.parseJson(cleanedUpOutput);
  if (!data) return <Error.Component type="noData" classes={baseClasses} />;

  const { spaces, currentSpace } = data;

  // Handle bar focus ring on click
  Utils.handleBarFocus();

  // Render the bar with appropriate components and data
  return (
    <SimpleBarContextProvider
      initialSettings={settings}
    >
      <div className={baseClasses}>
        <SideIcon.Component />
        <SpaceV2.Component
          spaces={spaces}
          currentSpace={currentSpace}
        />
        <Settings.Wrapper />
        <div className="simple-bar__data">
          <UserWidgets />
          <Mpd.Widget />
          <Netstats.Widget />
          <Cpu.Widget />
          <Gpu.Widget />
          <Memory.Widget />
          <Mic.Widget />
          <Sound.Widget />
          <Wifi.Widget />
          <Keyboard.Widget />
          <DateDisplay.Widget />
          <Time.Widget />
        </div>
      </div>
    </SimpleBarContextProvider>
  );
}

export { command, refreshFrequency, render };
