"use client";
import { UAvatar } from "../header/avatar";
import { Button } from "../ui/button";
import styles from "./index.module.css";
import { X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useWindowWidth } from "@react-hook/window-size";
import { useEffect } from "react";
import { InfoGroup } from "./group";
import { FaCircleInfo } from "react-icons/fa6";
import { LogOut } from "lucide-react";
import { MdFollowTheSigns } from "react-icons/md";
import { RiChatFollowUpFill } from "react-icons/ri";
import { FaListUl } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const infoData = [
  { title: "Personal information", items: FaCircleInfo, action: null },
  { title: "List", items: FaListUl, action: null },
  { title: "Following", items: MdFollowTheSigns, action: null },
  { title: "Comment", items: RiChatFollowUpFill, action: null },
];

const closeDrawer = () => {
  const drawer = document.querySelector(`.${styles.drawer}`) as HTMLElement;
  drawer.style.width = "0";
};

const openDrawer = () => {
  const drawer = document.querySelector(`.${styles.drawer}`) as HTMLElement;

  const windowWidth = window.innerWidth;
  if (drawer) {
    if (windowWidth > 1024) {
      drawer.style.width = "30%";
    } else if (windowWidth < 1024 && windowWidth > 768) {
      drawer.style.width = "40%";
    } else if (windowWidth < 768 && windowWidth > 640) {
      drawer.style.width = "50%";
    } else {
      drawer.style.width = "65%";
    }
  }
};

export function RightDrawer() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const onlyWidth = useWindowWidth();
  useEffect(() => {
    const drawer = document.querySelector(`.${styles.drawer}`) as HTMLElement;
    if (drawer != null && drawer.style.width !== "0px") {
      openDrawer();
    }
  }, [onlyWidth]);
  const logOut = [
    {
      title: "Log out",
      items: LogOut,
      action: () => {
        signOut()
          .then(() => {
            toast({
              title: "Signed out",
              description: "You have successfully signed out.",
            });
          })
          .catch((error) => {
            toast({
              title: "Error",
              description: "There was an issue signing you out.",
              variant: "destructive",
            });
          });
      },
    },
  ];
  if (session)
    return (
      <div className={styles.drawer}>
        <Button
          variant={"link"}
          onClick={closeDrawer}
          className="mt-3 cursor-pointer"
        >
          <X />
        </Button>

        {session?.user && (
          <div className="flex justify-between pl-3 items-center pr-5 pb-3">
            <h4 className="font-bold">Hello, {session.user.name}</h4>
            {/* <UAvatar
              size={10}
              imgUrl={session.user.image as string}
              alt={session.user.name as string}
            /> */}
            <p>{session.user.email}</p>
          </div>
        )}
        <InfoGroup infoData={infoData} title="About you" />
        <InfoGroup infoData={logOut} />
      </div>
    );
  else return null;
}

export const DrawerTrigger = ({ children }: { children: React.ReactNode }) => {
  // set with to 100% to make the button full width

  return (
    <button className={styles.drawerTrigger} onClick={openDrawer}>
      {children}
    </button>
  );
};
