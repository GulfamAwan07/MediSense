import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { supabase } from "./supabaseClient";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: "http://localhost:3000/reset-password",
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset link sent to your email!");
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="text-sm text-center text-gray-500 mt-2">
          Enter your email and we’ll send you a reset link
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Remember your password?{" "}
                <a
                  href="/signin"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Sign in
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
