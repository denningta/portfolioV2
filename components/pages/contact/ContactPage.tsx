'use client'

import Button from "@mui/material/Button";
import { TextareaAutosize } from "@mui/material";
import { Header } from "components/shared/Header";
import { FormikHelpers, useFormik } from "formik";
import LoadingSpinner from "components/shared/LoadingSpinner";
import CustomInput from "components/global/CustomInput";
import { AirtableMessage } from "app/api/create-message/route";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import * as Yup from 'yup'
import CustomButton from "components/global/CustomButton";

interface ContactPageProps {
}

export default function ContactPage({ }: ContactPageProps) {

  const initialValues: AirtableMessage = {
    name: '',
    email: '',
    message: '',
    botDetector: '',
  }

  const MessageSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too short!')
      .max(50, 'Too long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    message: Yup.string()
      .required('Required')
  })

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    resetForm,
    errors,
    touched
  } = useFormik({
    initialValues: initialValues,
    validationSchema: MessageSchema,
    onSubmit: (values, actions) => {
      handleFormSubmit(values, actions)
    }
  })


  const handleFormSubmit = async (data: AirtableMessage, actions: FormikHelpers<AirtableMessage>) => {
    if (data.botDetector !== '') {
      enqueueSnackbar('Something went wrong', { variant: 'error' })
      throw new Error('Something went wrong')
    }
    try {
      await fetch('/api/create-message', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
      })
      enqueueSnackbar('Thank you for your message! I will respond promptly.', { variant: 'success' })
      resetForm()
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' })
    }

  }


  return (
    <div className="space-y-10">
      <Header title={'Get in touch '} centered />

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <input
          id="botDetector"
          name="botDetector"
          onChange={handleChange}
          value={values.botDetector}
          hidden
        />

        <div>
          <CustomInput
            id="name"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          <div className="h-[20px] mt-1 text-sm text-rose-500">
            {errors.name && touched.name && errors.name}
          </div>
        </div>

        <div>
          <CustomInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <div className="h-[20px] mt-1 text-sm text-rose-500">
            {errors.email && touched.email && errors.email}
          </div>
        </div>

        <div className="col-span-2">
          <TextareaAutosize
            id="message"
            name="message"
            placeholder="Your message"
            className="w-full p-4 drop-shadow-lg border border-neutral-300 focus:outline-blue-500 focus:outline-2 rounded-md min-h-[200px]"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message}
          />
          <div className="h-[20px] text-sm text-rose-500">
            {errors.message && touched.message && errors.message}
          </div>
        </div>

        <div className="col-span-2">
          <CustomButton
            type="submit"
            className="w-20 h-10"
            isLoading={isSubmitting}
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            Send
          </CustomButton>
        </div>
      </form>
      <SnackbarProvider />
    </div>
  )

}

const ValidationError = (message: string) => {
  return (
    <div className="text-sm text-rose-500">
      {message}
    </div>

  )
}
