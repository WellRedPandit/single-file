#!/usr/local/bin/bash
set -e
set -x
rm -f singlefile-extension-chromium.zip

rollup -c rollup.config.dev.js

cp manifest.json manifest.copy.json
cp extension/core/bg/downloads.js downloads.copy.js

gsed -i 's/207618107333-3pj2pmelhnl4sf3rpctghs9cean3q8nj/207618107333-7tjs1im1pighftpoepea2kvkubnfjj44/g' extension/core/bg/downloads.js
jq "del(.browser_specific_settings,.permissions[0],.permissions[1],.permissions[2],.options_ui.browser_style)" manifest.copy.json > manifest.json
gsed -i 's/207618107333-3pj2pmelhnl4sf3rpctghs9cean3q8nj/207618107333-7tjs1im1pighftpoepea2kvkubnfjj44/g' manifest.json
zip -r singlefile-extension-chromium.zip manifest.json dist _locales extension

mv manifest.copy.json manifest.json
mv downloads.copy.js extension/core/bg/downloads.js
