import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../@types/types";
import auth from "../services/auth";
import dialogs, { showSuccessDialog } from "../ui/dialogs";
import patterns from "../validation/patterns";
import { useAuth } from "../contexts/AuthContext";
import "./Login.scss"; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onLogin = (data: LoginUser) => {
    login(data.email, data.password)
      .then(() => {
        showSuccessDialog("Login", "Logged in").then(() => {
          // send the user to home page
          navigate("/");
        });
      })
      .catch((e: any) => {
        dialogs.error("Login Error", e.response.data);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>();

  return (
    <div className="login-page dark:text">
      <h2>Login Page</h2>
      <form noValidate onSubmit={handleSubmit(onLogin)} className="dark:bg-slate-600">
        {/* email */}
        <section>
          <input
            placeholder="Email"
            autoCapitalize="true"
            autoCorrect="false"
            autoComplete="email"
            type="email"
            {...register("email", {
              required: "This field is mandatory",
              pattern: patterns.email,
            })}
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </section>

        {/* password */}
        <section>
          <input
            autoComplete="current-password"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "This field is mandatory",
              pattern: patterns.password,
            })}
          />
          {errors.password && <p>{errors.password?.message}</p>}
        </section>

        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;