const addCart = async (appId, accessToken) => {
  return await fetch("http://localhost:3000/api/user/addCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "appId": appId,
    }),
  });
};
const removeCart = async (appId, accessToken) => {
  return await fetch("http://localhost:3000/api/user/removeCart", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "appId": appId,
    }),
  });
};

const showCart = async (accessToken) => {
  return await fetch("http://localhost:3000/api/user/cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  });
};

const changePassword = async (accessToken, newpass) => {
  return await fetch("http://localhost:3000/api/user", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      "newpass": newpass,
    }),
  });
};

const checkProtected = async (accessToken) => {
  await fetch("http://localhost:3000/api/auth/protected", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${accessToken}`,
              },
            })
}
export {
  addCart,
  removeCart,
  showCart,
  changePassword,
  checkProtected
}