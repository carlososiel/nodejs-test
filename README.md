#NodeJS test
An example application with Express, Jade, Bootstrap and MongoDB

How to run
----------

To run, required provide a MongoDB server with a database and that have a collection named feed
```
$ git clone https://github.com/carlososiel/nodejs-test.git
$ cd nodejs-test
$ npm install
$ export MONGODB_CONNECTION = 'mongodb://<user>@<hostname>:<ports>/<database-name>'
$ npm start
```
Open browser in url [http://127.0.0.1:3000](http://127.0.0.1:3000)

How to run with docker
----------------------
The same way to provide a MongoDB connection, it necessary make the same step here.

```
$ git clone https://github.com/carlososiel/nodejs-test.git
$ cd nodejs-test
$ docker build -t <tag> .
$ export MONGODB_CONNECTION = 'mongodb://<user>@<hostname>:<ports>/<database-name>'
$ docker run -p 8081:3000 -e MONGODB_CONNECTION <tag>
```

Open the browser in url [http://127.0.0.1:8081](http://127.0.0.1:8081)
