
<p align="center">
    <h3 align="center">Blarity MVP<br></h3>
</p>

This is simple mvp version for state of chain hackathon Ho Chi Minh city, 02/11/2018

### What were using

* React 16
* Webpack 3
* React Router 4
* SASS
* Babel Cli
* Hot Module Reloading
* Jest 21 
* Enzyme 3 for testing

### Features

* 3 user roles: Creator, Deligator, Normal User
* Normal user can donate for project with any tokens, any where
* Creator can make request fund to smart contract
* Deligator can vote to release fund to supplier
* Creator can claim fund to suplier

### To run

* You'll need to have [git](https://git-scm.com/) and [node](https://nodejs.org/en/) installed in your system.
* Fork and clone the project:

```
git clone git@github.com:edwardEvans094/blarity.git
```

* Then install the dependencies:

```
npm install
```

* Run development server:

```
npm start
```

* Or you can run development server with [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard):

```
npm run dev
```

Open the web browser to `http://localhost:8888/`

### To test
To run unit tests:

```
npm test
```

Tests come bundled with:

* Jest
* Enzyme
* React Test Utils
* React Test Renderer

### To build the production package

```
npm run build
```

### Nginx Config

Here is an example Nginx config:

```
server {
	# ... root and other options

	gzip on;
	gzip_http_version 1.1;
	gzip_types text/plain text/css text/xml application/javascript image/svg+xml;

	location / {
		try_files $uri $uri/ /index.html;
	}

	location ~ \.html?$ {
		expires 1d;
	}

	location ~ \.(svg|ttf|js|css|svgz|eot|otf|woff|jpg|jpeg|gif|png|ico)$ {
		access_log off;
		log_not_found off;
		expires max;
	}
}
```

### Eslint
There is a `.eslint.yaml` config for eslint ready with React plugin.

To run linting, run:

```
npm run lint
```

### Notes on importing css styles
* styles having /src/ in their absolute path considered part of the application and exported as local css modules.
* other styles considered global styles used by components and included in the css bundle directly.

### Contribute
Please contribute to the project if you know how to make it better, including this README :)
