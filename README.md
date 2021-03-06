[![Build Status](https://travis-ci.com/hellofresh/janus-dashboard.svg?branch=master)](https://travis-ci.com/hellofresh/janus-dashboard)

# Janus-Dashboard
**Janus Dashboard** is a web-based UI for [Janus][1]. It allows users to easily configure the API Gateway without having to send HTTP calls manually.

![Dashboard API Definitions Page](https://user-images.githubusercontent.com/1451155/42759398-22a4d80e-8907-11e8-86d1-911994cab020.png)

## Getting Started
A quick way to start the dashboard is to run the [docker image][2].
Execute the following command to start the dashboard using the latest Docker image:

```sh
docker run -d \
-p 8082:80 \
--name janus-dashboard \
hellofreshtech/janus-dashboard
```

You can then visit http://localhost:8082 and start using the dashboard.

### Advanced Configuration
Janus Dashboard supports authentication with [GitHub OAuth][3]. A guide on how to configure GitHub OAuth can be read [here][4].
An example command can be seen below:

```sh
docker run -d \
-p 8082:80 \
-e REACT_APP_JANUS_URI=http://localhost:8081 \
-e REACT_APP_DISABLE_BASIC_AUTH=true \
-e REACT_APP_GITHUB_AUTHORIZE_URL=http://localhost:8080/auth/github/authorize \
-e REACT_APP_GITHUB_CLIENT_ID=exampleClientId \
-e REACT_APP_GITHUB_SCOPE=read:org \
-e REACT_APP_GITHUB_TOKEN_URL=http://localhost:8080/auth/github/token \
--name janus-dashboard \
hellofreshtech/janus-dashboard
```

Supported environment variables:
 - `REACT_APP_DISABLE_BASIC_AUTH` removes the user interface for basic authentication if set to `true`
 - `REACT_APP_DISABLE_GITHUB_AUTH` removes the user interface of GitHub authentication if set to `true`
 - The following environment variables are required for GitHub authentication
   - `REACT_APP_GITHUB_AUTHORIZE_URL`
   - `REACT_APP_GITHUB_CLIENT_ID`
   - `REACT_APP_GITHUB_TOKEN_URL`
   - `REACT_APP_GITHUB_SCOPE`

## Development

### With Docker
The following command will start Janus Dashboard server and the latest version of Janus with the default username `admin` and password `admin`:

```sh
$ docker-compose -f tests/docker-compose.test.yml up -d
```

### Without Docker
The following command will start only Janus Dashboard:

```sh
$ npm install
$ npm run start
```

This method will load `public/config.js` as the configuration. A sample of this file can be found in [/src/config.js.tmpl][5].

[1]: https://github.com/hellofresh/janus
[2]: https://hub.docker.com/r/hellofreshtech/janus-dashboard
[3]: https://hellofresh.gitbooks.io/janus/quick_start/authenticating.html
[4]: https://github.com/hellofresh/janus-dashboard/wiki/Configuring-GitHub-OAuth
[5]: https://github.com/hellofresh/janus-dashboard/blob/master/src/config.js.tmpl
