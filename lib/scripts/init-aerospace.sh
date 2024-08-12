aerospace_path=${1:-'/opt/homebrew/bin/aerospace'}

pgrep -x AeroSpace > /dev/null

# Check if the previous command failed (exit status 1)
if [ $? -eq 1 ]; then
  # Print "aerospaceError" and exit the script with status 0
  echo "aerospaceError"
  exit 0
fi

spaces=$($aerospace_path list-workspaces --all | tr '\n' ',' | xargs)
current_space=$($aerospace_path list-workspaces --focused | head -n1)
focused_window=$($aerospace_path list-windows --focused \
  --format '{"windowId": "%{window-id}", "appName": "%{app-name}", "workspace": %{workspace} }' 2>/dev/null
)

# shellcheck disable=SC2005
echo "$(cat <<-EOF
  {
    "spaces": [${spaces%?}],
    "currentSpace": $current_space,
    "focusedWindow": ${focused_window:-"{}"}
  }
EOF
)" | \
  # removes invisible U+200E Left-To-Right Mark character
  sed "s/\xe2\x80\x8e//g" | \
  # removes newlines from output (handling Google Chrome JSON parse error caused by "search in page")
  tr -d '\n'
