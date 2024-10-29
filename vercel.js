{
  ("version");
  2, "builds";
  [
    {
      src: "server.js",
      use: "@vercel/node",
    },
  ],
    "routes";
  [
    {
      src: "/auth/register",
      dest: "/api/auth/register",
    },
    {
      src: "/admin/login",
      dest: "/api/admin/login",
    },
    {
      src: "/protected/(.*)",
      dest: "/protected/$1",
    },
    {
      src: "/(.*)",
      dest: "/$1",
    },
  ];
}
