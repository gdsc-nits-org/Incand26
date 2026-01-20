"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { env } from "~/env";
import type { User } from "firebase/auth";
import { z } from "zod";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
export const runtime = "edge";
const userDataSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  collegeName: z.string().min(1, "College name is required"),
  registrationId: z.string().optional(),
});

interface UserData {
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  collegeName: string;
  registrationId?: string;
}

async function createUser(data: UserData, user: User) {
  const payload = {
    email: user.email,
    firebaseId: user.uid,
    imageUrl: user.photoURL,
    ...data,
  };
  const token = await user?.getIdToken();
  const response = await axios.post(
    `${env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
}

const CompleteProfile = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    username: "",
    collegeName: "",
    registrationId: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setError(null);

    toast.promise(
      (async () => {
        try {
          const validatedData = userDataSchema.parse(formData);
          if (!user) {
            throw new Error("Login required through the home page to proceed.");
          }
          if (user) {
            await createUser(validatedData, user);
            router.refresh();
            const prevUrl =
              (typeof window !== "undefined" &&
                window.sessionStorage.getItem("userSignupReferrer")) ??
              document.referrer;
            if (
              prevUrl &&
              prevUrl !== window.location.href &&
              !prevUrl.includes("/userSignup")
            ) {
              window.sessionStorage.removeItem("userSignupReferrer");
              router.replace(prevUrl);
            } else {
              router.replace("/home");
            }
          }
        } catch (err) {
          if (axios.isAxiosError(err)) {
            console.log("Axios Error: ", err, err.status);
          }
          if (err instanceof z.ZodError) {
            const zodErrors = err.errors.reduce(
              (acc, current) => {
                const key = String(current.path[0]);
                return {
                  ...acc,
                  [key]: current.message,
                };
              },
              {} as Record<string, string>,
            );
            setFormErrors(zodErrors);
          }
          throw err;
        }
      })(),
      {
        loading: "Creating user...",
        success: "User created successfully!",
        error: (err) => {
          if (err instanceof z.ZodError) {
            return "Validation errors occurred.";
          }
          if (axios.isAxiosError(err)) {
            const responseData = err.response?.data as { msg?: string };
            if (
              err.response?.status &&
              err.response.status <= 500 &&
              responseData?.msg
            ) {
              return responseData.msg;
            }
          }
          return err instanceof Error? err.message :"An error occurred while creating the user.";
        },
      },
    );
  };

  if (loading) {
    // Store referrer in sessionStorage if coming from another page
    if (
      typeof window !== "undefined" &&
      !window.sessionStorage.getItem("userSignupReferrer")
    ) {
      const referrer = document.referrer;
      if (
        referrer &&
        referrer !== window.location.href &&
        !referrer.includes("/userSignup")
      ) {
        window.sessionStorage.setItem("userSignupReferrer", referrer);
      }
    }
    return (
      <div className="flex h-screen w-screen items-center justify-center gap-3">
        Loading....
      </div>
    );
  }

  return (
    <div
      className="clip-angled animate-glowMove bg-red-grid flex min-h-screen w-screen flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dgechlqls/image/upload/v1766212699/BACKUP_SPONSORS_osnbmg.png')",
      }}
    >
      <div className="mb-5 text-center text-2xl font-normal tracking-widest text-[#8B4513] lg:text-5xl">
        USER REGISTRATION
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-15">
        <div className="flex min-w-[90vw] flex-col items-center justify-center gap-7 lg:min-w-[60vw]">
          {/* ...existing code for form fields... */}
          <div className="inline-flex w-full items-center justify-between lg:gap-7">
            <label
              htmlFor="firstName"
              className="font-bankGothik w-3/10 text-sm font-normal text-wrap text-[#520000] md:text-xl lg:text-2xl lg:text-nowrap"
            >
              FIRST NAME:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="font-orbitron h-10 w-1/2 origin-top-left rounded-[10.036px] border-[0.627px] border-t-gray-400 border-b-gray-700 bg-transparent text-center text-[#520000] backdrop-blur-[9.878px]"
            />
          </div>
          {/* ...existing code for other fields... */}
          <div className="inline-flex w-full items-center justify-between lg:gap-7">
            <label
              htmlFor="middleName"
              className="font-bankGothik w-3/10 text-sm font-normal text-wrap text-[#520000] md:text-xl lg:text-2xl lg:text-nowrap"
            >
              MIDDLE NAME:
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="font-orbitron h-10 w-1/2 origin-top-left rounded-[10.036px] border-[0.627px] border-t-gray-400 border-b-gray-700 bg-transparent text-center text-[#520000] backdrop-blur-[9.878px]"
            />
          </div>
          {/* ...existing code for other fields... */}
          <div className="inline-flex w-full items-center justify-between lg:gap-7">
            <label
              htmlFor="lastName"
              className="font-bankGothik w-3/10 text-sm font-normal text-wrap text-[#520000] md:text-xl lg:text-2xl lg:text-nowrap"
            >
              LAST NAME:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="font-orbitron h-10 w-1/2 origin-top-left rounded-[10.036px] border-[0.627px] border-t-gray-400 border-b-gray-700 bg-transparent text-center text-[#520000] backdrop-blur-[9.878px]"
            />
          </div>
          {/* ...existing code for other fields... */}
          <div className="inline-flex w-full justify-between lg:gap-7">
            <label
              htmlFor="phoneNumber"
              className="font-bankGothik w-3/10 text-sm font-normal text-wrap text-[#520000] md:text-xl lg:text-2xl lg:text-nowrap"
            >
              PHONE NUMBER:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="font-orbitron h-10 w-1/2 origin-top-left rounded-[10.036px] border-[0.627px] border-t-gray-400 border-b-gray-700 bg-transparent text-center text-[#520000] backdrop-blur-[9.878px]"
            />
          </div>
          {/* ...existing code for other fields... */}
          <div className="inline-flex w-full justify-between lg:gap-7">
            <label
              htmlFor="username"
              className="font-bankGothik w-3/10 text-sm font-normal text-wrap text-[#520000] md:text-xl lg:text-2xl lg:text-nowrap"
            >
              USERNAME:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="font-orbitron h-10 w-1/2 origin-top-left rounded-[10.036px] border-[0.627px] border-t-gray-400 border-b-gray-700 bg-transparent text-center text-[#520000] backdrop-blur-[9.878px]"
            />
          </div>
          {/* ...existing code for other fields... */}
          <div className="inline-flex w-full justify-between lg:gap-7">
            <label
              htmlFor="collegeName"
              className="font-bankGothik w-3/10 text-sm font-normal text-wrap text-[#520000] md:text-xl lg:text-2xl lg:text-nowrap"
            >
              COLLEGE NAME:
            </label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              required
              className="font-orbitron h-10 w-1/2 origin-top-left rounded-[10.036px] border-[0.627px] border-t-gray-400 border-b-gray-700 bg-transparent text-center text-[#520000] backdrop-blur-[9.878px]"
            />
          </div>
          {/* ...existing code for other fields... */}
          <div className="inline-flex w-full justify-between lg:gap-7">
            <label
              htmlFor="registrationId"
              className="font-bankGothik w-3/10 text-sm font-normal text-wrap text-[#520000] md:text-xl lg:text-2xl lg:text-nowrap"
            >
              REGISTRATION ID
              <br /> (Only for NIT Students):
            </label>
            <input
              type="text"
              id="registrationId"
              name="registrationId"
              value={formData.registrationId}
              onChange={handleChange}
              className="font-orbitron h-10 w-1/2 origin-top-left rounded-[10.036px] border-[0.627px] border-t-gray-400 border-b-gray-700 bg-transparent text-center text-[#520000] backdrop-blur-[9.878px]"
            />
          </div>
        </div>
        {/* Error Messages */}
        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
        {Object.entries(formErrors).map(([field, errorMessage]) => (
          <div key={field} className="mt-2 text-center text-red-500">
            {errorMessage}
          </div>
        ))}
        <div className="flex w-full items-center justify-around">
          <button
            type="submit"
            className="flex h-14 cursor-pointer items-center justify-between overflow-hidden rounded-full border-3 border-black bg-[#6b1f1f] text-[0.125rem] tracking-widest text-[#fff2cc] shadow-lg hover:scale-105"
          >
            <img
              src="https://res.cloudinary.com/dsaaxuphe/image/upload/v1766330315/Group_48096168_ufcdsb.webp"
              alt=""
              className="h-full rotate-180 opacity-90"
            />

            {/* TEXT */}
            <span className="tracking-0.18em relative z-70 px-6 text-lg">
              {!user ? "Log In to Submit" : "Submit Details"}
            </span>

            <img
              src="https://res.cloudinary.com/dsaaxuphe/image/upload/v1766330315/Group_48096168_ufcdsb.webp"
              alt=""
              className="h-full"
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfile;
