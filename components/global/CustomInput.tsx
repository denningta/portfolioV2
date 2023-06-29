import { DetailedHTMLProps, InputHTMLAttributes } from "react"

type CustomInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {

}

export default function CustomInput(props: CustomInputProps) {

  return (
    <div>
      <input {...props}
        className="p-4 w-full rounded-md border border-neutral-200 focus:outline-blue-500 drop-shadow-lg"
      />
    </div>
  )

}
