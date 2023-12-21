import loginImage from "../images/login-image.webp";
import { Button } from "react-bootstrap";
import React, { useRef, useState, useEffect } from "react";

const LoginPage = () => {
  // const userRef = useRef<HTMLInputElement>();
  // const errRef = useRef<HTMLParagraphElement>();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   if (userRef.current) {
  //     userRef.current.focus();
  //   }
  // }, []);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [user, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(user, pwd);
    setUser("");
    setPwd("");
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to home</a>
          </p>
        </section>
      ) : (
        <div className="d-flex w-[45vw] items-center justify-center">
          <img
            src={loginImage}
            alt="login-image"
            className="col-md-6 img-fluid"
          />
          <div className="d-flex flex-column align-items-center justify-content-center bg-light p-4 rounded">
            {/* <p
              ref={errRef}
              className={errMsg ? "errMsg" : "offscreen"}
              aria-live="assertive"
            >{errMsg}</p> */}
            {/* <p ref={errRef} className={"errMsg ? "errMsg" : "offscreen"} aria-live="assertive>{errMsg}</p> */}
            <h1 className="col text-primary">My Todo App</h1>
            <h4 className="text-info">Welcome to My Todo List</h4>
            <form onSubmit={handleSubmit} className="m-auto">
              <div className="">
                <label htmlFor="email" className="my-1">
                  Email Addrerss
                </label>
                <input
                  type="text"
                  id="email"
                  // ref={userRef}
                  autoComplete="off"
                  placeholder="Enter your Email Address"
                  className="form-control w-100"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="my-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your Password"
                  className="form-control w-100"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </div>
              <Button type="submit" className="mt-4 w-90">
                Login
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
