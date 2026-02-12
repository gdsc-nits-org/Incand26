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
  hasOpted: boolean;
}

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [_user, _loading] = useAuthState(auth);
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
        setFirstName(() => res.data.msg.firstName);
        setLastName(() => res.data.msg.lastName);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.response?.status === 404) {
            router.push("/signup");
          }
        } else {
          toast.error("Firebase Backend Auth Error");
        }
      }
    };
    void checkUserFirstTime();
  }, [_user, userName, setUserName, router, user]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setShowLogoutModal(false);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Error logging out", error);
      toast.error("Error logging out");
    }
  };

  if (error) {
    console.log("Firebase Error", error);
  }

  if (loading || _loading) {
    return (
      <div className="relative flex items-center justify-center">
        <span className="invisible opacity-0">Log In</span>
        <span className="absolute inset-0 flex animate-spin items-center justify-center">
          <LoaderCircle className="h-[1em] w-[1em]" />
        </span>
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
    <>
      <ProfileCard
        photoURL={_user.photoURL}
        displayName={_user.displayName}
        userName={userName}
        firstName={firstName}
        lastName={lastName}
        onClick={() => setShowLogoutModal(true)}
      />
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
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
  if (isLoggedIn) {
    return <button onClick={onClick}>{children}</button>;
  }

  return (
    <div onClick={onClick}>
      <div></div>
      <div>Log In</div>
    </div>
  );
};

interface UserCred {
  photoURL: string | null | undefined;
  displayName: string | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  userName: string | null | undefined;
  onClick?: () => void;
}

const ProfileCard: React.FC<UserCred> = ({
  photoURL,
  userName,
  firstName,
  lastName,
  onClick,
}) => {
  return (
    <section>
      <section
        onClick={onClick}
        className="flex cursor-pointer items-center gap-[2vw] sm:gap-[1.5vw] md:gap-[1vw]"
      >
        <div>
          {photoURL && (
            <Image
              src={photoURL}
              width={100}
              height={100}
              alt="avatar"
              className="h-[8vw] w-[8vw] rounded-full sm:h-[5vw] sm:w-[5vw] md:h-[4vw] md:w-[4vw] lg:h-[3.5vw] lg:w-[3.5vw]"
            />
          )}
        </div>
        <div>
          <span className="text-[3.5vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1.25vw]">
            {firstName} {lastName}
          </span>
        </div>
      </section>
    </section>
  );
};

import { createPortal } from "react-dom";

const LogoutModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative flex w-[90vw] max-w-md flex-col items-center gap-6 rounded-xl border-[0.3vw] border-black bg-[#751313] p-8 text-[#f5e6c8] shadow-2xl sm:border-[0.2vw]">
        <h2 className="font-hitchcut text-3xl font-bold tracking-wider">
          Log Out?
        </h2>
        <p className="text-center font-sans text-lg font-medium">
          Are you sure you want to log out?
        </p>
        <div className="flex gap-4 font-sans">
          <button
            onClick={onClose}
            className="rounded-full border-2 border-[#f5e6c8] bg-transparent px-6 py-2 font-bold transition-all hover:bg-[#f5e6c8] hover:text-[#751313]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-full border-2 border-[#f5e6c8] bg-[#f5e6c8] px-6 py-2 font-bold text-[#751313] transition-all hover:bg-transparent hover:text-[#f5e6c8]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Login;