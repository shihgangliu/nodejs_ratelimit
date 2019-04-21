const assert = require('chai').assert;
const request = require('request');

describe('Rate Limit Test', function () {
    it('Request 61 times in one minutes', function () {
        for (let i = 0; i <= 60; i++) {
            request({
                url: 'http://localhost:3310/',
                method: 'GET'
            }, function (err, res, body) {
                if (err) {
                    return;
                }

                if (i >= 60) {
                    assert.equal('Error', body);
                } else {
                    assert.match(body, /[0-9]/);
                }
            });
        }
    })
});
