import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";
import { Link } from "react-router-dom";
import CustomLoaderButton from "../components/CustomLoaderButton";


const RegisterPage = () => {
  const [isShow, setIsShow] = React.useState(false);
  const [captcha, setCaptcha] = useState('')
  const [isLoading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    captcha: "",
  };

  const validationSchema = yup.object({
    name: yup.string().required("Name is Required"),
    email: yup
      .string()
      .email("Email must be valid")
      .required("Email is Required"),
    password: yup.string().required("Password is Required"),
    captcha: yup.string().required("Captcha is Required"),
  });

  const onSubmitHandler = async (values, helpers) => {
    try {
      setLoading(true);
      //validate captcha
      if(values.captcha != eval(captcha)){
        toast.error("Enter Valid Captcha");
        return;
      }
      toast.success("Success");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

let CaptchaOperators = ['+','-','*','/'];
  const generateCaptcha = () =>{


    let str = `${Math.floor(Math.random() *100)}
    ${CaptchaOperators[Math.floor(Math.random() * CaptchaOperators.length)]}
    ${Math.floor(Math.random() *100)}`
    setCaptcha(str)
  }

  useEffect(() =>{
    generateCaptcha()
  },[])



  return (
    <div className="min-h-[70vh] flex items-center justify-center flex-col">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        <Form
          className=" w-[98%] md:w-1/2 lg:w-1/3  border-3 py-10 px-4
        rounded border-gray-400"
        >
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <Field
              name="name"
              type="text"
              className="w-full py-2 border placeholder:font-pmedium
            border-gray-500 rounded px-3 outline-none"
              placeholder="Enter your Name"
            />
            <ErrorMessage
              name="name"
              className="text-red-500 text-xs"
              component={"p"}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              name="email"
              className="w-full py-2 border placeholder:font-pmedium
            border-gray-500 rounded px-3 outline-none"
              placeholder="Enter your Email"
            />
            <ErrorMessage
              name="email"
              className="text-red-500 text-xs"
              component={"p"}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <div
              className="flex w-full border border-gray-500 rounded 
            items-center justify-between px-4"
            >
              <Field
                type={isShow ? "text" : "password"}
                className="py-2 w-full  placeholder:font-pmedium
             outline-none"
                name="password"
                placeholder="Enter your Password"
              />

              <button
                type="button"
                onClick={() => setIsShow(!isShow)}
                className="text-gray-400 text-2xl"
              >
                {isShow ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <ErrorMessage
              name="password"
              className="text-red-500 text-xs"
              component={"p"}
            />
          </div>

          <div className="flex mb-3 items-center justify-between">
            <p className="text-center w-1/2">{captcha}</p>
            <button onClick={generateCaptcha} type="button" className="text-center w-1/2">
            <HiRefresh />
            </button>
            <div className="flex flex-col w-full">
              <Field placeholder='Enter Captcha'
                name="captcha"
                className="w-full py-2 border placeholder:font-pmedium
            border-gray-500 font-pbold rounded px-3 outline-none"
              />
              <ErrorMessage
                name="captcha"
                className="text-red-500 text-xs"
                component={"p"}
              />
            </div>
          </div>

          <div className="mb-3">
            <CustomLoaderButton isLoading={isLoading} text="Register" />
          </div>

         <div className="md-3">
            <p className="text-end">
              Already have an account ? <Link to={"/login"} className = 
              'font-psmbold text-indigo-500'>Login</Link>
            </p>
         </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;
