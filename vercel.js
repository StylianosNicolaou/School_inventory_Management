{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node" // Use Vercel's Node.js environment to run server.js
    }
  ],
  "routes": [
    {
      "src": "/admin/login",
      "dest": "/api/admin/login"
    },
    {
      "src": "/protected/(.*)",
      "dest": "/protected/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
