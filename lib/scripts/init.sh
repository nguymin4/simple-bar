aerospace_path=$1

pgrep -x aerospace > /dev/null

if [ $? -eq 1 ]; then
  echo "aerospaceError"
  exit 0
fi

current_window=$($aerospace_path list-windows --focused --format '{"id": "%{window-id}", "windowTitle": "%{app-name}"}')
if [ -z "$current_window" ]; then
  current_window="null"
fi

displays=$($aerospace_path list-monitors --format '{"id": "%{monitor-id}"}')
skhd_mode="{}"

echo "$(cat <<-EOF
  {
    "spaces": "[1, 2, 3, 4, 5, 6, 7, 8, 9]",
    "currentWindow": $current_window,
    "displays": $displays,
    "skhdMode": $skhd_mode
  }
EOF
)" | \
  # removes invisible U+200E Left-To-Right Mark character
  sed "s/\xe2\x80\x8e//g" | \
  # removes newlines from output (handling Google Chrome JSON parse error caused by "search in page")
  tr -d '\n'
