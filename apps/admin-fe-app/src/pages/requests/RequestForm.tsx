import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20)
});
type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export default function RequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  //we should here call like API or something...
  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <input className="input" placeholder="email" {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        className="input"
        placeholder="password"
        {...register("password")}
      />

      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit">submit!</button>
    </form>
  );
}