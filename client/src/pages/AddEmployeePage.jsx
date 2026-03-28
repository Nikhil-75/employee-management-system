import { ErrorMessage, Field, Form, Formik } from "formik";
import React, {useState} from "react";
import { EmployeeRoles } from "../utils/constant";
import CustomLoaderButton from "../components/CustomLoaderButton";
import * as Yup from 'yup';
import { toast} from 'react-toastify';
import { axiosClient} from "../utils/axiosClient";
import { faker } from '@faker-js/faker';
import { useMainContext } from "../context/mainContext";

const AddEmployeePage = () => {
  const [loading, setLoading] = useState(false);
  const { fetchUserProfile } = useMainContext()
  const [initialValues, setInitialValues] = useState({
    name: '',
    role: '',
    salary: '',
    image: '',
    mobile: '',
    email: '',
    address: ''
  })
  const validationSchema = Yup.object({
    'name': Yup.string().required('Name is required'),
    'salary': Yup.number().min(1, 'Salary Can Not Be Negative or Zero').required('Salary is required'),
    'role': Yup.string().required('Role is required'),
    'mobile': Yup.string().required('mobile is required'),
    'address': Yup.string().required('Address is required'),
    'email': Yup.string().required('Email is required').email('Enter a valid email'),
  })

  const TestData = () => { 
    setInitialValues({
      name: faker.name.fullName(),
      salary: faker.number.int({min: 20000, max: 25000}),
      role: EmployeeRoles[Math.floor(Math.random() * EmployeeRoles.length)],
      image: faker.image.avatar(),
      mobile: faker.number.int({min: 1000000000}),
      email: faker.person.firstName()+"@gmail.com",
      address: faker.lorem.sentence(10)
    })
      
   }
  const onSubmitHandler =  async(values, helpers) => {
    try {
      setLoading(true);
      const response = await axiosClient.post('/add-emp', values,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      const data =  await response.data;
      toast.success(data.message);
      helpers.resetForm();
      await fetchUserProfile();

      
      setInitialValues({
        name: '',
        role: '',
        salary: '',
        image: '',
        mobile: '',
        email: '',
        address: ''

      })
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message )
    }finally{
      setLoading(false);
    }
  }
  return (
    <>
      <Formik
      initialValues = {initialValues}
      onSubmit={onSubmitHandler}
      validationSchema={validationSchema}
      enableReinitialize={true}
      >
        <Form className="w-[90%] mx-auto py-10 bg-zinc-100">
          <div className="mb-3 flex items-center justify-end">
              <button type="button" onClick={TestData} className="px-4 py-2 bg-indigo-500 text-white">
                Test 
              </button>
          </div>
          <div className="mb-3">
            <label htmlFor="">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              name="name"
              className="w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium"
              placeholder="Enter Employee Name"
            />
            <ErrorMessage
              name="name"
              component={"p"}
              className="text-red-500 text-xs"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="">
              Employee Role <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              name="role"
              className="w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium "
            >
              <option value={''}>-------select---------</option>
              {EmployeeRoles.map((cur, i) => {
                return (
                  <option key={i} value={cur}>
                    {cur}
                  </option>
                );
              })}
            </Field>
            <ErrorMessage
              name="role"
              component={"p"}
              className="text-red-500 text-xs"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="">
              Employee Salary <span className="text-red-500">*</span>
            </label>
            <Field
              type="number"
              name="salary"
              className="w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium"
              placeholder="Enter Employee Salary"
            />
            <ErrorMessage
              name="salary"
              component={"p"}
              className="text-red-500 text-xs"
            />
          </div>

            <div className="mb-3">
            <label htmlFor="">
              Employee Image <span className="text-red-500">*</span>
            </label>
            <Field
              type="url"
              name="image"
              className="w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium"
              placeholder="Enter Employee Image URL"
            />
            <ErrorMessage
              name="image"
              component={"p"}
              className="text-red-500 text-xs"
            />
          </div>

            <div className="mb-3">
            <label htmlFor="">
              Employee Mobile No <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              name="mobile"
              className="w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium"
              placeholder="Enter Employee Mobile No"
            />
            <ErrorMessage
              name="mobile"
              component={"p"}
              className="text-red-500 text-xs"
            />
          </div>

            <div className="mb-3">
            <label htmlFor="">
              Employee Email ID  <span className="text-red-500">*</span>
            </label>
            <Field
              type="email"
              name="email"
              className="w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium"
              placeholder="Enter Employee Email ID"
            />
            <ErrorMessage
              name="email"
              component={"p"}
              className="text-red-500 text-xs"
            />
          </div>

            <div className="mb-3">
            <label htmlFor="">
              Employee Address <span className="text-red-500">*</span>
            </label>
            <Field
              as="textarea" rows={2}
              name="address"
              className="w-full py-2 border border-gray-300 rounded outline-none px-3 placeholder:font-pmedium"
              placeholder="Enter Employee Address"
            />
            <ErrorMessage
              name="address"
              component={"p"}
              className="text-red-500 text-xs"
            />
          </div>

          <div className="mb-3">
             <CustomLoaderButton isLoading={loading} text = 'Add Employee' />
          </div>

        </Form>
      </Formik>
    </>
  );
};

export default AddEmployeePage;
