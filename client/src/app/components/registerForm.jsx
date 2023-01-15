import React, { useState, useEffect } from "react";
import { validator } from "../utils/validator";
import { useAuth } from "../hooks/useAuth";

const RegisterForm = () => {
  const { signUp } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
    sex: "male",
    license: false
  });
  const optionsSex = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
    { name: "Other", value: "other" }
  ];
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const handleChangeLicense = () => {
    setData((prevState) => ({
      ...prevState,
      license: !data.license
    }));
  };
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    license: {
      isRequired: {
        message:
          "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
      }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    signUp(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">email</label>
      <div className="input-group has-validation mb-3">
        <input
          type="text"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className={errors.email ? "form-control is-invalid" : "form-control"}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <label htmlFor="password">password</label>
      <div className="input-group has-validation mb-3">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          className={
            errors.password ? "form-control is-invalid" : "form-control"
          }
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={toggleShowPassword}
        >
          <i className={"bi bi-eye" + (showPassword ? "" : "-slash")}></i>
        </button>
        {errors.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}
      </div>
      <label htmlFor="sex" className="form-label">
        Выберите ваш пол
      </label>
      <div>
        {optionsSex.map((option) => (
          <div
            key={option.name + "_" + option.value}
            className="form-check form-check-inline mb-3"
          >
            <input
              className="form-check-input"
              type="radio"
              name="sex"
              id={option.name + "_" + option.value}
              checked={option.value === data.sex}
              value={option.value}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor={option.name + "_" + option.value}
            >
              {option.name}
            </label>
          </div>
        ))}
      </div>
      <div className="form-check mb-4">
        <input
          type="checkbox"
          name="license"
          value=""
          onChange={handleChangeLicense}
          checked={data.license}
        />
        <label className="form-check-label">
          Подтвердить <a>лицензионное соглашение</a>
        </label>
        {errors.license && (
          <div className="invalid-feedback">{errors.license}</div>
        )}
      </div>
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
