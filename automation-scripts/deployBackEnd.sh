cd $backEndDirectory
git pull
git checkout $branch --force
buildRes=$(npm run $backendBuildCommand)
if [[ $status -eq 0 ]]
then
    echo "Build Succeded"
    echo "Start Moving Transfering Files"
else
    echo $buildRes
    echo "Build Failed Please Check The Upper Log"
    exit 1
fi

cd $backEndWWWDirectory
ls | egrep -v "web.config|config.js" | xargs rm

mv "${backEndDirectory}/dist/*" .
iisreset
echo "Back End Is Finished"