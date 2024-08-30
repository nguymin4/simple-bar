// Styles for /lib/components/data/mic.jsx component
export const micStyles = /* css */ `
.mic {
  font-variant-numeric: tabular-nums;
  color: var(--yellow);
  background-color: var(--minor);
  transform: translateZ(0);
}
.simple-bar--widgets-background-color-as-foreground .mic {
  color: var(--minor);
  background-color: transparent;
}
.mic__slider-container {
  --slider-size: 10px;

  position: relative;
  max-width: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0;
  clip-path: inset(0);
  opacity: 0.7;
  border-radius: calc(var(--item-radius) / 3);
  transition: max-width 320ms var(--transition-easing), padding 320ms var(--transition-easing),
    opacity 320ms var(--transition-easing),
    clip-path 0ms var(--transition-easing);
}
.mic:hover .mic__slider-container,
.mic--dragging .mic__slider-container {
  max-width: 100px;
  clip-path: inset(-100vh -100vw);
  transition: max-width 320ms var(--transition-easing), padding 320ms var(--transition-easing),
    opacity 320ms var(--transition-easing),
    clip-path 320ms 320ms var(--transition-easing)
}
.mic__slider-container:hover {
  opacity: 1;
}
.mic__slider {
  width: 100px;
  height: var(--slider-size);
  appearance: none;
  background-color: var(--background);
  border-radius: var(--item-radius);
  outline: none;
  -webkit-appearance: none;
}
.simple-bar--widgets-background-color-as-foreground .mic__slider {
  background-color: var(--foreground);
}
.mic__slider::-webkit-slider-thumb {
  width: var(--slider-size);
  height: var(--slider-size);
  background-color: var(--yellow);
  border-radius: calc(var(--item-radius) / 3);
  cursor: pointer;
  -webkit-appearance: none;
  transform-origin: center;
  transform: scale(1.5);
  transition: transform 160ms var(--transition-easing);
}
.simple-bar--widgets-background-color-as-foreground .mic__slider::-webkit-slider-thumb {
  background-color: var(--minor);
}
.mic__slider::-webkit-slider-thumb:hover {
  transform: scale(1.5);
}
.mic__slider-filler {
  position: absolute;
  top: calc(50% - (var(--slider-size) / 2));
  left: calc(var(--slider-size) / 2.5);
  left: 0;
  height: var(--slider-size);
  background-color: var(--foreground);
  border-radius: calc(var(--item-radius) / 3);
  transform-origin: left;
  pointer-events: none;
}
.simple-bar--widgets-background-color-as-foreground .mic__slider-filler {
  background-color: var(--minor);
}
.mic__display {
  display: flex;
  align-items: center;
  margin-right: 4px;
  overflow: hidden;
}
.mic__display:active {
  color: currentColor;
}
.mic__display > svg {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  margin-right: 3px;
  fill: currentColor;
}
.mic__display .mic__value {
  color: var(--white);
}
`;
