
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
// import { useMediaQuery } from "usehooks-ts";
// import CustomButton from "../../../components/CustomButton";
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
    console.log(response)
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
    // const isMobile = useMediaQuery('(max-width: 768px)');

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
                    if (user) {
                        console.log(validatedData,user)
                        await createUser(validatedData, user);
                        router.refresh();
                        const prevUrl = (typeof window !== "undefined" && window.sessionStorage.getItem("userSignupReferrer")) ?? document.referrer;
                        if (prevUrl && prevUrl !== window.location.href && !prevUrl.includes("/userSignup")) {
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
                    } else {
                        throw err;
                    }
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
                    return "An error occurred while creating the user.";
                },
            },
        );
    };

    if (loading) {
        // Store referrer in sessionStorage if coming from another page
        if (typeof window !== "undefined" && !window.sessionStorage.getItem("userSignupReferrer")) {
            const referrer = document.referrer;
            if (referrer && referrer !== window.location.href && !referrer.includes("/userSignup")) {
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
        <div className="clip-angled flex min-h-screen w-screen animate-glowMove
        flex-col items-center
        justify-center bg-[#000000] bg-red-grid bg-[length:100%_100%,100%_100%,50px_50px,50px_50px,50px_50px] bg-fixed bg-[position:0_0,0_0,25px_25px,0_0,0_0] pt-28 md:pt-32">
            <div className=" text-center text-white font-nyxerin text-2xl font-normal tracking-widest text-transparent lg:text-5xl mb-5">
                USER REGISTRATION
            </div>
            <form onSubmit={handleSubmit} className="gap-15 flex flex-col">
                <div className="flex min-w-[90vw] flex-col items-center justify-center gap-7 lg:min-w-[60vw]">
                    {/* ...existing code for form fields... */}
                    <div className="inline-flex w-full items-center justify-between lg:gap-7">
                        <label
                            htmlFor="firstName"
                            className="w-3/10 text-wrap font-bankGothik text-sm font-normal text-white md:text-xl lg:text-nowrap lg:text-2xl"
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
                            className="h-10 w-1/2 origin-top-left rounded-[10.036px] border-[0.627px] border-b-gray-700 border-t-gray-400 bg-transparent text-center text-white backdrop-blur-[9.878px] font-orbitron"
                        />
                    </div>
                    {/* ...existing code for other fields... */}
                    <div className="inline-flex w-full items-center justify-between lg:gap-7">
                        <label
                            htmlFor="middleName"
                            className="w-3/10 text-wrap font-bankGothik text-sm font-normal text-white md:text-xl lg:text-nowrap lg:text-2xl"
                        >
                            MIDDLE NAME:
                        </label>
                        <input
                            type="text"
                            id="middleName"
                            name="middleName"
                            value={formData.middleName}
                            onChange={handleChange}
                            className="h-10 w-1/2 origin-top-left rounded-[10.036px] border-[0.627px] border-b-gray-700 border-t-gray-400 bg-transparent text-center text-white backdrop-blur-[9.878px] font-orbitron"
                        />
                    </div>
                    {/* ...existing code for other fields... */}
                    <div className="inline-flex w-full items-center justify-between lg:gap-7">
                        <label
                            htmlFor="lastName"
                            className="w-3/10 text-wrap font-bankGothik text-sm font-normal text-white md:text-xl lg:text-nowrap lg:text-2xl"
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
                            className="h-10 w-1/2 origin-top-left rounded-[10.036px] border-[0.627px] border-b-gray-700 border-t-gray-400 bg-transparent text-center text-white backdrop-blur-[9.878px] font-orbitron"
                        />
                    </div>
                    {/* ...existing code for other fields... */}
                    <div className="inline-flex w-full justify-between lg:gap-7">
                        <label
                            htmlFor="phoneNumber"
                            className="font-bankGothik text-sm w-3/10 text-wrap font-normal text-white md:text-xl lg:text-nowrap lg:text-2xl"
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
                            className="h-10 w-1/2 origin-top-left rounded-[10.036px] border-[0.627px] border-b-gray-700 border-t-gray-400 bg-transparent text-center text-white backdrop-blur-[9.878px] font-orbitron"
                        />
                    </div>
                    {/* ...existing code for other fields... */}
                    <div className="inline-flex w-full justify-between lg:gap-7">
                        <label
                            htmlFor="username"
                            className="w-3/10 text-wrap font-bankGothik text-sm font-normal text-white md:text-xl lg:text-nowrap lg:text-2xl"
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
                            className="h-10 w-1/2 origin-top-left rounded-[10.036px] border-[0.627px] border-b-gray-700 border-t-gray-400 bg-transparent text-center text-white backdrop-blur-[9.878px] font-orbitron"
                        />
                    </div>
                    {/* ...existing code for other fields... */}
                    <div className="inline-flex w-full justify-between lg:gap-7">
                        <label
                            htmlFor="collegeName"
                            className="w-3/10 text-wrap font-bankGothik text-sm font-normal text-white md:text-xl lg:text-nowrap lg:text-2xl"
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
                            className="h-10 w-1/2 origin-top-left rounded-[10.036px] border-[0.627px] border-b-gray-700 border-t-gray-400 bg-transparent text-center text-white backdrop-blur-[9.878px] font-orbitron"
                        />
                    </div>
                    {/* ...existing code for other fields... */}
                    <div className="inline-flex w-full justify-between lg:gap-7">
                        <label
                            htmlFor="registrationId"
                            className="w-3/10 text-wrap font-bankGothik text-sm font-normal text-white md:text-xl lg:text-nowrap lg:text-2xl"
                        >
                            REGISTRATION ID (Only for NIT Students):
                        </label>
                        <input
                            type="text"
                            id="registrationId"
                            name="registrationId"
                            value={formData.registrationId}
                            onChange={handleChange}
                            className="h-10 w-1/2 origin-top-left rounded-[10.036px] border-[0.627px] border-b-gray-700 border-t-gray-400 bg-transparent text-center text-white backdrop-blur-[9.878px] font-orbitron"
                        />
                    </div>
                </div>
                {/* Error Messages */}
                {error && (
                    <div className="mt-4 text-red-500 text-center">
                        {error}
                    </div>
                )}
                {Object.entries(formErrors).map(([field, errorMessage]) => (
                    <div key={field} className="mt-2 text-red-500 text-center">
                        {errorMessage}
                    </div>
                ))}
                <div className="lg:translate-x-25 mt-10 flex w-full items-center justify-around">
                    <div className="w-[60vw] lg:w-[30vw] xl:w-[20vw] text-white">
                        <button type="submit">Submit</button>
                        {/* <CustomButton
                            text="Submit"
                            // width={isMobile ? 180 : 200}
                            // height={isMobile ? 55 : 100}
                            // className={isMobile ? "text-sm" : "text-xl"}
                            onClick={undefined}
                        /> */}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CompleteProfile;