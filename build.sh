# cleanup
rm -r ./target
mkdir target

# copy files to chrome directory
mkdir target/chrome
cp chrome/* target/chrome/
cp common/* target/chrome/

# create firefox zip
mkdir target/firefox
zip --junk-paths target/firefox/uwproxy.zip firefox/* common/*
