RELEASECHANNEL="staging"
UPLOADKEY="abc123def456"
APISERVER="http://157.66.101.16:3000"

SLUG=$(grep -o '"slug": "[^"]*' app.json | grep -o '[^"]*$')
RUNTIMEVERSION=$(grep -o '"runtimeVersion": "[^"]*' app.json | grep -o '[^"]*$')

FOLDER="/${RUNTIMEVERSION}"
BUILDFOLDER=".${FOLDER}"

rm -rf $BUILDFOLDER
rm -rf ./.expo
rm -f $BUILDFOLDER.zip
mkdir $BUILDFOLDER

yarn expo export --experimental-bundle --output-dir $BUILDFOLDER

cp app.json $BUILDFOLDER/
cp package.json $BUILDFOLDER/

zip -q $BUILDFOLDER.zip -r $BUILDFOLDER

curl --location --request POST "$APISERVER/upload" \
    --form "uri=@/home/chuazz/Workspace/freetime/phone-book-for-old-man${FOLDER}.zip" \
    --header "project: $SLUG" \
    --header "version: $RUNTIMEVERSION" \
    --header "release-channel: $RELEASECHANNEL" \
    --header "upload-key: $UPLOADKEY" \
    --header "git-branch: $(git rev-parse --abbrev-ref HEAD)" \
    --header "git-commit: $(git log --oneline -n 1)"

rm -rf $BUILDFOLDER
rm -f $BUILDFOLDER.zip

printf "\n\nPublish Done"
