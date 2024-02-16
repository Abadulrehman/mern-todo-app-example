import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/services/auth/signup";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(8, "Password should be at least 8 characters long"),
});

const SignUpPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formValues: z.infer<typeof formSchema>) {
    const res = await signUp(formValues.email, formValues.password);

    if (res) {
      form.reset();
      router.push("/login");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Form {...form}>
        <Card className="flex flex-col gap-2 p-4">
          <Label className="text-lg">
            Please enter your details to sign up
          </Label>
          <Separator />
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
          <span className="flex items-center text-sm gap-1 pt-2">
            <Label>Already a user? Log in </Label>
            <Link className="hover:underline" href={"/login"}>
              here
            </Link>
          </span>
        </Card>
      </Form>
    </div>
  );
};

export default SignUpPage;
