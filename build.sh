#!/bin/bash

DATE="$(date +"%Y-%m-%d %H:%M")"

if [ -d "build" ]; then
  rm -r build
fi

ember build -prod -o build
git checkout gh-pages
rm -rf assets
rm -rf ember-world-flags
rm -rf fonts
cp -rf build/* ./
git add .
git commit -m "build at ${DATE}"
git checkout develop