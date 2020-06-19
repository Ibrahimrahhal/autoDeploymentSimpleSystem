cd $frontEndDirectory
git pull
git checkout $branch --force
buildRes=$(npm run $fontEndBuildCommand)
status=$?
if [[ $status -eq 0 ]]
then
    echo "Build Succeded"
    echo "Start Moving Transfering Files"
else
    echo $buildRes
    echo "Build Failed Please Check The Upper Log"
    exit 1
fi

cd $frontEndWWWDirectory
ls | egrep -v "web.config" | xargs rm

mv "${frontEndDirectory}/dist/*" .
iisreset
echo "Front End Is Finished"