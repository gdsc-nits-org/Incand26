"use client";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import { auth } from "~/utils/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { env } from "~/env";

interface UserResponse {
    username: string;
    firstName: string;
    lastName: string;
}

const Login = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const [_user, _loading] = useAuthState(auth);
    const router = useRouter();
    const [userName, setUserName] = useState("");
    useEffect(() => {
        const checkUserFirstTime = async () => {
            if (!_user) return;
            try {
                const token = await _user.getIdToken();
                const res = await axios.get<{ msg: UserResponse }>(
                    `${env.NEXT_PUBLIC_API_URL}/api/user/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                setUserName(() => res.data.msg.username);
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    if (e.status === 404) {
                        router.push("/signup");
                    }
                } else {
                    toast.error("Firebase Backend Auth Error");
                }
            }
        };
        void checkUserFirstTime();
    }, [_user, userName, setUserName, router, user]);

    if (error) {
        console.log("Firebase Error", error);
    }
    
    if (loading || _loading) {
        return (
            <div className="px-14 animate-spin">
                <LoaderCircle size={40} />
            </div>
        );
    }

    if (!_user) {
        return (
            <StyledButton
                onClick={async () => {
                    await signInWithGoogle();
                }}
                isLoggedIn={false}
            >
                Sign In
            </StyledButton>
        );
    }

    return (
        <p>Logged In</p>
        // <ProfileCard
        //     photoURL={_user.photoURL}
        //     displayName={_user.displayName}
        //     userName={userName}
        //     firstName={firstName}
        //     lastName={lastName}
        // />
    );
};

const StyledButton = ({
    onClick,
    children,
    isLoggedIn,
}: {
    onClick: () => void;
    children: React.ReactNode;
    isLoggedIn: boolean;
}) => {
    const [hovered, setHovered] = useState(false);

    if (isLoggedIn) {
        return (
            <button onClick={onClick}>
                {children}
            </button>
        );
    }

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
        >
            <div></div>
            <div>
                Log In
            </div>
        </div>
    );
};

interface UserCred {
    photoURL: string | null | undefined;
    displayName: string | null | undefined;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    userName: string | null | undefined;
}

const ProfileCard: React.FC<UserCred> = ({
    photoURL,
    userName,
    firstName,
    lastName,
}) => {
    const router = useRouter();
    return (
        <section>
            <section onClick={() => router.push("/merch")} className="flex gap-2 items-center">
                <div>
                    {photoURL && (
                        <Image
                            src={photoURL}
                            width={50}
                            height={50}
                            alt="avatar"
                            className="rounded-full"
                        />
                    )}
                </div>
                <div>
                    <h3>{userName}</h3>
                    <span>
                        {firstName} {lastName}
                    </span>
                </div>
            </section>
        </section>
    );
};

export default Login;