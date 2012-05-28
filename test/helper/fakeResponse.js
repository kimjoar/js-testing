function fakeResponse(response, options, callback) {
  var statusCode, headers, server, resp;

  statusCode = options.statusCode || 200;
  headers = options.headers || { "Content-Type": "application/json" };

  server = sinon.fakeServer.create();
  server.respondWith([statusCode, headers, response]);

  callback();

  server.respond();
  server.restore();
}
