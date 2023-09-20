import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("abdelatty@example.com");
  const [password, setPassword] = useState("admin");
  const { login, isAuthenticated, isError } = useAuth();

  function hundleSubmit(e) {
    e.preventDefault();
    if (email && password)
      login(email, password);
  }


  const navigate = useNavigate();

  useEffect(function () {
    if (isAuthenticated) navigate("/app", { replace: true })
  },
    [isAuthenticated])
  return (
    <main className={styles.login}>
      <PageNav></PageNav>
      <form className={styles.form} onSubmit={hundleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
        {isError && <div style={{ fontSize: '18px' }}>Faild UserName or Password .</div>}
      </form>
    </main>
  );
}
