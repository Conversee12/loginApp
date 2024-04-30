import {IonPage, IonContent} from '@ionic/react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Button} from '../components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import {Input} from '../components/ui/input';
import {Calendar} from '../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import {cn} from '../lib/utils';
import {CalendarIcon} from 'lucide-react';
import {format} from 'date-fns';
import '../index.css';
import {Link} from 'react-router-dom';
import {Checkbox} from '../components/ui/checkbox';
import {emailValidation, passwordValidation} from '../utils/formValidation';

const LoginSchema = z
  .object({
    username: z.string().min(3, {
      message: 'UserName should contain at least 3 characters',
    }),
    dob: z.date().refine(
      date => {
        const currentDate = new Date();
        return date <= currentDate;
      },
      {
        message: 'Invalid Date of Birth',
      },
    ),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string().min(1, {
      message: 'Password is required.',
    }),
    policy: z.boolean().refine(data => data === true, {
      message: 'Policy is required.',
    }),
  })
  .refine(data => data.confirmPassword === data.password, {
    message: 'Password did not match',
    path: ['confirmPassword'],
  });

const CreateAccountPage = () => {
  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log(data);
  };

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      dob: new Date(),
      policy: false,
      confirmPassword: '',
    },
    mode: 'onTouched',
  });

  const {formState} = form;

  return (
    <IonPage className="pt-11 px-4 pb-2 ">
      <IonContent scrollY={false}>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-4">
            <div className="font-semibold text-[28px] leading-[33.6px]">
              Let&apos;s get you started
            </div>
            <div className="flex gap-x-2">
              <div className="text-base font-normal leading-6 text-[#393D41]">
                Already have account?
              </div>
              <Link
                to="/login"
                className="text-[#0070F3] font-medium text-base">
                Login
              </Link>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col items-start gap-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({field}) => (
                  <FormItem className="w-full gap-y-2 flex flex-col">
                    <FormLabel className="text-base font-normal">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={field.onChange}
                        type="text"
                        className="placeholder:text-base placeholder:leading-6 placeholder:font-medium placeholder:text-[#7A7D80] h-12"
                        placeholder="Enter username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({field}) => (
                  <FormItem className="flex flex-col w-full gap-y-2">
                    <FormLabel className="text-base font-normal">
                      Date of birth
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div
                            className={cn(
                              'px-4 py-3 w-full border border-[#C2C3C4] text-[#7A7D80] font-medium text-base rounded-[8px] flex items-center box-border h-12',
                            )}>
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={date =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem className="w-full gap-y-2 flex flex-col">
                    <FormLabel className="text-base font-normal">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={field.onChange}
                        type="text"
                        className="placeholder:text-base placeholder:leading-6 placeholder:font-medium placeholder:text-[#7A7D80] h-12"
                        placeholder="Enter email address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem className="w-full gap-y-2 flex flex-col">
                    <FormLabel className="text-base font-normal">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={field.onChange}
                        type="password"
                        className="placeholder:text-base placeholder:leading-6 placeholder:font-medium placeholder:text-[#7A7D80] h-12"
                        placeholder="Enter password"
                      />
                    </FormControl>
                    <div className="text-[#393D41] leading-5 text-sm font-normal">
                      Password should contain at least 8 characters, 1 special
                      symbol character, 1 number, 1 uppercase letter
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({field}) => (
                  <FormItem className="w-full gap-y-2 flex flex-col">
                    <FormLabel className="text-base font-normal">
                      Confirm password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={field.onChange}
                        type="password"
                        className="placeholder:text-base placeholder:leading-6 placeholder:font-medium placeholder:text-[#7A7D80] h-12"
                        placeholder="Confirm password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="policy"
                render={({field}) => (
                  <FormItem className="flex items-center gap-x-4">
                    <FormControl>
                      <div className="border border-[#C2C3C4] w-6 h-6 rounded-[4px]">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-base font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black">
                      I agree to the{' '}
                      <Link className="text-[#0070F3] underline" to="/toc">
                        Terms and Conditions
                      </Link>{' '}
                      and{' '}
                      <Link
                        className="text-[#0070F3] underline"
                        to="/privacy-policy">
                        Privacy Policy
                      </Link>{' '}
                      of this app.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex mt-[51px] w-full pt-4">
                <Button
                  disabled={!formState.isValid}
                  type="submit"
                  className="w-full flex gap-x-5 px-5 py-3 text-base font-medium h-12 rounded-[8px] bg-[#549FF7] ">
                  Create Account
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccountPage;
