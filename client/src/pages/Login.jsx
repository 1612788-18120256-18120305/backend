import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import GoogleAuth from "../components/googleAuth/GoogleAuth";
import FacebookAuth from "../components/facebookAuth/FacebookAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./login.css";

const schema = yup
  .object({
    email: yup.string().email().required(),
    fullName: yup.string().required(),
    password: yup.string().min(6).max(30).required(),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

function Login(props) {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const password = useRef({});
  password.current = watch("password", "");

  const onSignUpFormSubmit = (data) => {
    console.log(data);
  };

  const onLoginFormSubmit = (data) => {
    console.log(data);
  };

  const changeToSignInForm = () => {
    setIsLoginForm(true);
  };

  const changeToSignUpForm = () => {
    setIsLoginForm(false);
  };

  if (props.isSignedIn) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <>
      <a className="back-btn" href="/" style={{ padding: "0" }}>
        <img src="/images/logo.svg" alt="logo" style={{ width: "75px" }} />
      </a>
      <div className={`container-login ${isLoginForm ? "" : "sign-up-mode"}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form
              action=""
              className="sign-in-form"
              method="POST"
              id="frmSignIn"
            >
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" name="namelogin" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" name="password" />
              </div>
              {/* {{#if msg}}
            {{#each msg}}
            <p className="text-danger" style="color: red;">{{this}}</p>
            {{/each}}
            {{/if}} */}
              <input type="submit" value="Login" className="btn-custom solid" />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                {/* <a href="/account/facebook/login" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a> */}
                <FacebookAuth />
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                {/* <a href="/account/google/login" className="social-icon">
                  <i className="fab fa-google"></i>
                </a> */}
                <GoogleAuth />
                <a href="/account/github/login" className="social-icon">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </form>
            <form
              autoComplete="off"
              onSubmit={handleSubmit(onSignUpFormSubmit)}
              action="/account/postSignUp"
              className="sign-up-form"
              method="POST"
              id="frmSignUp"
            >
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                  })}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-signature"></i>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  {...register("fullName", {
                    required: true,
                  })}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    maxLength: 30,
                    minLength: 8,
                  })}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  name="repeatPassword"
                  required
                  type="password"
                  placeholder="Repeat password"
                  {...register("repeatPassword")}
                />
              </div>
              <span className="text-danger">{errors.email?.message}</span>
              <span className="text-danger">{errors.fullName?.message}</span>
              <span className="text-danger">{errors.password?.message}</span>
              <span className="text-danger">
                {errors.confirmPassword?.message}
              </span>

              <input type="submit" className="btn-custom" value="Sign up" />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Do not have an account?</h3>
              <p>
                Create an account here and start exploring your courses! It's
                very awesome!
              </p>
              <button
                onClick={changeToSignUpForm}
                className="btn-custom transparent"
                id="sign-up-btn"
              >
                Sign up
              </button>
            </div>
            <img src="/images/log.svg" className="image" alt="img-login" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Why ClassPin ?</h3>
              <p>
                We help students and teachers have a powerful tool for learning!
              </p>
              <button
                onClick={changeToSignInForm}
                className="btn-custom transparent"
                id="sign-in-btn"
              >
                Sign in
              </button>
            </div>
            <img
              src="/images/register.svg"
              className="image"
              alt="img-register"
            />
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, null)(Login);