EventFlow Engine 🚀

A scalable Activity Management API built using Node.js.

🔧 Tech Stack
Node.js + Express
MongoDB
Redis
Socket.IO
Worker Threads
⚡ Features
Activity creation and listing
Redis caching (cache hit/miss)
Race condition handling (atomic DB operation)
Real-time updates using WebSockets
Background processing using Worker Threads
🧪 API Endpoints
POST /api/activity
GET /api/activity
POST /api/activity/join/:id
🎯 Key Highlight

Handles high-concurrency seat booking using atomic operations and optional Redis locking.