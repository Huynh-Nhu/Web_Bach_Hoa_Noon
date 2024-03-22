import React from "react";
import { useSelector } from "react-redux";

function HomePage() {
  const user = useSelector((state) => state.auth.login.currentUser);

  if (user && user.auth === "admin") {
    return <h1>home</h1>;
  } else {
    // Nếu không phải vai trò "admin", có thể render một thông báo hoặc chuyển hướng đến trang khác.
    return <h1>Chào mừng bạn đến với Noon</h1>;
  }
}

export default HomePage;