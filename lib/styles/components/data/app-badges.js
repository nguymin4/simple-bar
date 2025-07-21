export const timeStyles = /* css */ `
@keyframes app-badges-blinking {
  0%, 100% {
    color: var(--white);
    background-color: var(--red);
  }
  50% {
    color: var(--red);
    background-color: var(--white);
  }
}

.app-badges {
  color: var(--white);
  background: var(--red);
  // animation: app-badges-blinking 8s ease-in infinite;
}

.app-badges .app-icon {
  flex: 0 0 11px;
  width: 11px;
  height: 11px;
  margin: 0px 6px;
  fill: currentColor;
  transform: translateZ(0);
}

.app-badges i.app-icon {
  margin-top: -4px;
}

.simple-bar--widgets-background-color-as-foreground .app-badges {
  color: var(--red);
  background-color: transparent;
}
`;
