# Nodejs Rate Limit

## 設計理念
採用 redis 的原因是因為 redis 本身提供的特性相當適合計算 request 量，且如果每個 request 都要記錄這樣的 rate count 的話，放在 redis 相對比放在 DB 要來的快一些，以及掉失沒有太嚴重的情況下，在這邊就簡單地用 redis 來實作 rate limit 這塊。

## 執行方式
- docker build -t "node-ratelimit:v1" .
- docker run -p 3310:3310 -it node-ratelimit:v1
- curl http://localhost:3310/

## 測試
- 可先安裝 local redis（不用更改 config）
- npm install
- npm test
