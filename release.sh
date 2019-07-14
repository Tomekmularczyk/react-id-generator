#!/bin/sh

### CONSTANTS
GREEN='\033[0;32m'
RED='\033[91m'
NC='\033[0m' # No Color

### FUNCTIONS
replaceVersionInPackageJSON() {
  local NEW_VERSION=$1
  local NEW_VERSION_LINE="  \"version\": \"$NEW_VERSION\","
  sed -i '' "s/.*\"version\":.*/$NEW_VERSION_LINE/" package.json || exit 1;
}

printCurrentVersion() {
  local VERSION=$(sed '3q;d' package.json | xargs) # expected on 3rd line
  echo "Current${GREEN} $VERSION ${NC}"  
}

readNewVersion() {
  local NEW_VERSION
  read -p "Type new version: " NEW_VERSION
  echo $NEW_VERSION
}

loginToNPM() {
  echo "Loging to npm..."
  npm login || exit 1;
}

runTests() {
  echo 'Running tests...\n'
  yarn lint || exit 1;
  yarn typecheck || exit 1;
  yarn test --silent --noStackTrace --colors >/dev/null || exit 1;
  echo '\n'
}

buildPackage() {
  echo 'Building library...\n'
  rm -rf lib
  yarn build || exit 1;
  yarn build:declarations || exit 1;
}

bailoutIfRepoIsNotClean() {
  git diff-index --quiet HEAD -- \
  || { echo "${RED}You have uncommitted changes, clean up the repo first.${NC}"; exit 1; }
}

confirmNewVersion() {
  local NEW_VERSION=$1
  local CONFIRMED
  echo "Are you sure you want to create version${GREEN} $NEW_VERSION ${NC}?"
  read -p "(y/n): " CONFIRMED
  if [ $CONFIRMED != "y" ] && [ $CONFIRMED != "Y" ]
  then
    exit 1;
  fi
}

confirmMasterBranch() {
  local CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  if [ $CURRENT_BRANCH != "master" ]
  then
    echo "${RED}First switch to master branch.${NC}"
    exit 1;
  fi
}

commitAndCreateTag() {
  local NEW_VERSION=$1
  git add --all
  git commit -m "Releasing version $NEW_VERSION"
  git tag "v$NEW_VERSION"
}

pushToRemote() {
  local CONFIRMED
  echo "Do you want to push new commit and tag to remote repo?"
  read -p "(y/n): " CONFIRMED
  if [ $CONFIRMED = "y" ] || [ $CONFIRMED = "Y" ]
  then
    git push origin master
    git push origin --tags
  fi
}

confirmMasterBranch

bailoutIfRepoIsNotClean

clear

runTests

printCurrentVersion

NEW_VERSION=$(readNewVersion)

loginToNPM

confirmNewVersion $NEW_VERSION

buildPackage

replaceVersionInPackageJSON $NEW_VERSION

commitAndCreateTag $NEW_VERSION

npm publish

pushToRemote
