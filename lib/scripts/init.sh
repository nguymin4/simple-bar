aerospace_path=$1

pgrep -x AeroSpace > /dev/null

if [ $? -eq 1 ]; then
  echo "aerospaceError"
  exit 0
fi

current_space=$($aerospace_path list-workspaces --focused | head -n1)

# shellcheck disable=SC2005
echo "$(cat <<-EOF
  {
    "spaces": [
      { "id": "1", "label": "1: " },
      { "id": "2", "label": "2: " },
      { "id": "3", "label": "3: " },
      { "id": "4", "label": "4: " },
      { "id": "5", "label": "5: 󰊻" },
      { "id": "6", "label": "6: 󰴢" }
    ],
    "currentSpace": "$current_space"
  }
EOF
)" | \
  # removes invisible U+200E Left-To-Right Mark character
  sed "s/\xe2\x80\x8e//g" | \
  # removes newlines from output (handling Google Chrome JSON parse error caused by "search in page")
  tr -d '\n'
