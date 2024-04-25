import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registrationValidationSchema = Yup.object({
	email: Yup.string()
		.matches(emailRegex, "Введіть дійсну email адресу")
		.required("Email є обов'язковим полем"),
	name: Yup.string().required("Ім'я є обов'язковим полем"),
	password: Yup.string()
		.required("Пароль є обов'язковим полем")
		.min(5, "Ваш пароль занадто короткий")
		.matches(/[a-zA-Z]/, "Пароль може містити лише латинські літери"),
	confirmPassword: Yup.string()
		.required("Пароль є обов'язковим полем")
		.oneOf([Yup.ref("password")], "Паролі мають збігатися"),
});
