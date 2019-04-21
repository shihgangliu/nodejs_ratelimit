const http = require('http');
const redis = require("redis"),
      redisClient = redis.createClient();

const server = http.createServer(function (req, res) {
    const rateLimit = 60;
    const ip = req.socket.localAddress;
    const cacheKey = ip + ':' + new Date().getMinutes();

    redisClient.get(cacheKey, function (err, reply) {
        if (reply >= rateLimit) {
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            res.end('Error');
            return;
        }
    });

    var multi = redisClient.multi();
    multi.incr(cacheKey);
    multi.expire(cacheKey, 59);
    multi.exec(function (err, replies) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(replies[0].toString());
        return;
    });
}).listen(3310, '0.0.0.0');
