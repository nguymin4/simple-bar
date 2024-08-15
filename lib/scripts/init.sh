aerospace_path=$1

pgrep -x AeroSpace > /dev/null

if [ $? -eq 1 ]; then
  echo "aerospaceError"
  exit 0
fi

spaces=$($aerospace_path list-workspaces --all | tr '\n' ',' | xargs)
current_space=$($aerospace_path list-workspaces --focused | head -n1)

# shellcheck disable=SC2005
echo "$(cat <<-EOF
  {
    "spaces": [${spaces%?}],
    "currentSpace": $current_space
  }
EOF
)" | \
  # removes invisible U+200E Left-To-Right Mark character
  sed "s/\xe2\x80\x8e//g" | \
  # removes newlines from output (handling Google Chrome JSON parse error caused by "search in page")
  tr -d '\n'
