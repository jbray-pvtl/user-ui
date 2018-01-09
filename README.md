# UserUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Bootstrap Styling and Functionality Dependencies
Add the following dependencies to the project using the npm utility.

```
npm install --save jquery
npm install --save popper.js
npm install --save tether
npm install --save bootstrap@4.0.0-beta.2
```

Edit the .angular-cli.json file to include the new CSS dependencies:
```
"styles": [
"../node_modules/bootstrap/dist/css/bootstrap.min.css",
"styles.css"
],
"scripts": [
"../node_modules/jquery/dist/jquery.min.js",
"../node_modules/popper.js/dist/popper.min.js",
"../node_modules/tether/dist/js/tether.min.js",
"../node_modules/bootstrap/dist/js/bootstrap.min.js"
],
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## The Code
This is a standard Angular 5 application that uses the following component types:
-   Components
-   Services
-   Routes

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Repository
Add a new repository
```
git remote add origin https://github.com/jrbrayjr2006/user-ui.git
git push -u origin master
```

## Deployment to Pivotal Cloud Foundry (PCF)
Deploying this web UI to PCF is straight forward
1. Build the application `ng build`
2. Login to PCF `cf login`
3. Push the application `cf push`