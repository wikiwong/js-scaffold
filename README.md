#JS Starter

This project provides a good starting point for a JS project built with gulp. 

###Get started
1. Install [Node](https://nodejs.org/)
2. `$ git clone https://github.com/wikiwong/js-scaffold`
3. `$ npm install`
4. `$ gulp`

###Features
* node modules and commonjs/es6 module support (via [browserify](http://browserify.org/))
* es6 compilation to es5 (via [babel](https://babeljs.io/))
* jsx compiliation (via [babelify](https://github.com/babel/babelify))
* eslint validation (via [eslint](http://eslint.org/))
* precommit hook to enforce eslint rules before commit (via [precommit-hook](https://github.com/nlf/precommit-hook))
* development server with auto reload (via [browser-sync](http://www.browsersync.io/) and [livereactload](https://github.com/milankinen/livereactload))
* uglification of production js (via [uglify](https://github.com/mishoo/UglifyJS2))

###Preconfigured Gulp Tasks
* `clean` - deletes the `/build` folder and all files within it.
* `html` - copies all `.html` files from `/src` to `/build`.
* `lint` - runs eslint for all `.js` and `.jsx` files and displays results to stdout.
* `serve` - starts a development server at `http://localhost.espn.go.com:3000` using `/build` as the root file path.
* `watch` - `[clean, html]` + builds a development js bundle in the `/build` folder and begins watching for changes, automatically rebuilding the bundle when necessary.
* `build` - `[clean]` + builds a production ready uglified js bundle.
* `default` - `[watch + serve]`

###Eslint
eslint rules are defined in `.eslintrc` and are a fork of [Airbnb's](https://github.com/airbnb/javascript/blob/master/linters/.eslintrc), with modifications to support jsx validation.
