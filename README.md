# TaskBee


## Build

* You should first clone the project from github to your local workspace and switch to app branch: 

  ```
  git clone git@github.com:KylinChang/TaskBee.git
  git checkout app
  ```

* Then you should download necessary node modules and link the font:

  ```
  npm install
  react-native link
  ```

* Finally, you can simulate the app:

  ```
  react-native run-ios --simulator="iPhone 6"
  ```

  ​

## Project Architecture

* ``src/config/router.js``: defines screen switch navigation
* ``src/screens/``: includes screen files
* ``src/components/``: includes custom components 