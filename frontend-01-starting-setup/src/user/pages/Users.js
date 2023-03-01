import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    // This is a dummy array of users.
    {
      id: "u1",
      name: "common raven",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Corvus_corax_%28NPS%29.jpg/600px-Corvus_corax_%28NPS%29.jpg",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
