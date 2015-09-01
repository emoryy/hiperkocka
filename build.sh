#!/bin/bash
if [[ `git status --porcelain` ]]; then
  echo "git repository not clean"
else
  DATE="$(date +"%Y-%m-%d %H:%M")"
  rm -rf build
  ember build -prod -o build
  git checkout gh-pages
  rm -rf assets
  rm -rf ember-world-flags
  rm -rf fonts
  cp -rf build/* ./
  git add .
  git commit -m "build at ${DATE}"
  git checkout develop
fi