import api from 'api/api';
import endpoints from 'api/endpoint';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import Label from 'components/Label/Label';
import SectionHero3 from 'components/SectionHero/SectionHero3';
import { FC, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import Input from 'shared/Input/Input';
import Textarea from 'shared/Textarea/Textarea';
import { ContactPayload } from 'types/payload/contact';
import { BiLogoTelegram } from 'react-icons/bi'

export interface PageContactProps {
  className?: string;
}

const info = [
  {
    title: '🗺 Office Hours',
    desc: `Monday to Friday: 9 AM - 6 PM
    Saturday: 10 AM - 4 PM
    Sunday: Closed`,
  },
  {
    title: '💌 EMAIL',
    desc: 'support@my-lotus.com',
  },
  {
    title: '📸 INSTAGRAM',
    desc: '@mylotus.uz',
  },
  {
    icon : <>
    <BiLogoTelegram className='text-[#27A3E2] mb-2' />
    </>,
    title: 'TELEGRAM (SPONSORS)',
    desc: '@khamidovsktg',
  },
  // {
  //   title: '☎ PHONE',
  //   desc: '000-123-456-7890',
  // },
];

const PageContact: FC<PageContactProps> = ({ className = '' }) => {
  const contactFormRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactPayload>();
  const { mutate, isLoading, isSuccess } = useMutation<
    any,
    Error,
    ContactPayload
  >({
    mutationFn: async (payload) =>
      api.mutateBackend(endpoints.other.contact, payload),
  });

  return (
    <div
      className={`nc-PageContact overflow-hidden ${className}`}
      data-nc-id="PageContact"
    >
  

      {/* SECTION HERO */}
      {/* <div className="container px-1 sm:px-4 mb-24 ">
        <SectionHero3
          onClick={() => {
            if (contactFormRef && contactFormRef.current) {
              contactFormRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className=""
        />
      </div> */}

      <div ref={contactFormRef} className="relative z-20 mb-24 lg:mb-32">
        {/* <div className="flex items-center justify-center gap-5 flex-col mt-16  sm:my-20">
          <h2 className="mt-32 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Contact Form
          </h2>
          <p className="max-w-[750px] text-center text-neutral-400 ">
            For your convenience, you can reach us by filling out the contact
            form below. Provide your name, email, subject, and message, and our
            team will get back to you as soon as possible.
          </p>
        </div> */}
        <div className="mt-12 sm:mt-24 container max-w-7xl mx-auto px-12 sm:px-32">
          <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
            <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <div className="flex gap-1.5 items-center">
                    {item.icon && item.icon}
                    <h3 className="mb-2 uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-0">
                    {item.desc.split('\n').map((val) => (
                      <span key={val} className="block text-neutral-500 dark:text-neutral-400">
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {/* <div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 SOCIALS
                </h3>a
                <SocialsList className="mt-2" />
              </div> */}
            </div>
            <div>
              {!isSuccess ? (
                <form
                  onSubmit={handleSubmit((e) => mutate(e))}
                  className="grid grid-cols-1 gap-6"
                  method="post"
                >
                  <label className="block">
                    <Label>Title</Label>
                    <Input
                      errors={errors}
                      {...register('title', {
                        required: 'Title is required to contact us!',
                        minLength: {
                          value: 3,
                          message: 'Title must be at least 3 characters',
                        },
                      })}
                      placeholder=""
                      type="text"
                      className="mt-1"
                    />
                  </label>
                  <label className="block">
                    <Label>Email address</Label>
                    <Input
                      errors={errors}
                      {...register('email', {
                        required: 'Email is required to contact us!',
                        minLength: {
                          value: 3,
                          message: 'Email must be at least 3 characters',
                        },
                      })}
                      type="email"
                      placeholder="example@example.com"
                      className="mt-1"
                    />
                  </label>
                  <label className="block">
                    <Label>Message</Label>
                    <Textarea
                      {...register('message', {
                        required: 'Message is required to contact us!',
                        minLength: {
                          value: 3,
                          message: 'Message must be at least 3 characters',
                        },
                      })}
                      className="mt-1"
                      rows={6}
                    />
                  </label>
                  <div>
                    <ButtonPrimary loading={isLoading} type="submit">
                      Send Message
                    </ButtonPrimary>
                  </div>
                </form>
              ) : (
                <div className="sm:py-0 py-36 flex flex-col gap-1 text-center center w-full h-full text-xl ">
                  <div className="">Thank you for choosing LOTUS. 🌟</div>
                  <div className="text-neutral-500 text-lg">
                    We look forward to assisting you!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BgGlassmorphism />
      {/* OTHER SECTIONS */}
      {/* <div className="container">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="Pagecontact_" />
        </div>
        <SectionSubscribe2 className="py-24 lg:py-32" />
      </div> */}
    </div>
  );
};

export default PageContact;
