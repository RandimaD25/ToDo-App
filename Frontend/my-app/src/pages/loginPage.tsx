import loginImage from "../images/login-image.webp";
import { Button } from "react-bootstrap";

const LoginPage = () => {
  return (
    <>
      <div className="d-flex w-[45vw] items-center justify-center">
        <img
          src={loginImage}
          alt="login-image"
          className="col-md-6 img-fluid"
        />
        <div className="d-flex flex-column align-items-center justify-content-center bg-light p-4 rounded">
          <h1 className="col text-primary">My Todo App</h1>
          <h4 className="text-info">Welcome to My Todo List</h4>
          <form action="" className="m-auto">
            <div className="">
              <label htmlFor="" className="my-1">
                Email Addrerss
              </label>
              <input
                type="text"
                placeholder="Enter your Email Address"
                className="form-control w-100"
              />
            </div>
            <div>
              <label htmlFor="" className="my-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your Password"
                className="form-control w-100"
              />
            </div>
            <Button type="submit" className="mt-4 w-90">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
