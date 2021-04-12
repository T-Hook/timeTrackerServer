var ObjectId = require('mongodb').ObjectID;
module.exports=[

  {
    "updatedAt": "2019-03-05T12:52:17.252Z",
    "createdAt": "2019-03-05T12:52:17.252Z",
    "name": "rbac administrator",
    "group": "admin",
    "data": "",
    "permissions": [
      ObjectId("5d10cc48a74d940b5ad71e5b"),
      ObjectId("5d10cc5da74d940b5ad71e5c"),
      ObjectId("5d10cc7ba74d940b5ad71e5d"),
      ObjectId("5d10cc94a74d940b5ad71e5e")
    ],
    "description": "rbac administrator",
    "__v": 0
  },


  {
    "updatedAt": "2019-03-05T12:52:17.252Z",
    "createdAt": "2019-03-05T12:52:17.252Z",
    "name": "rbac user xdash",
    "group": "user",
    "data": "",
    "permissions": [
      ObjectId("5d10cc48a74d940b5ad71e5b"),
      ObjectId("5d10cc5da74d940b5ad71e5c"),
      ObjectId("5d10cc7ba74d940b5ad71e5d")
    ],
    "description": "rbac user xdash",
    "__v": 0
  },
  {
    "updatedAt": "2019-03-05T12:52:17.252Z",
    "createdAt": "2019-03-05T12:52:17.252Z",
    "name": "rbac guest users",
    "group": "guest",
    "data": "",
    "permissions": [
      ObjectId("5d10cc48a74d940b5ad71e5b"),
      ObjectId("5d10cc5da74d940b5ad71e5c")
    ],
    "description": "rbac guest users",
    "__v": 0
  }

]
