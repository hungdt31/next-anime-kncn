"use client";
import { Button } from "../ui/button";
import styles from "./index.module.css";
import { X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useWindowWidth } from "@react-hook/window-size";
import { useEffect } from "react";
import { InfoGroup } from "./group";
import { FaCircleInfo } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { MdFollowTheSigns } from "react-icons/md";
import { RiChatFollowUpFill } from "react-icons/ri";
import { FaListUl } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

const infoData = [
  { title: "Personal information", items: FaCircleInfo, action: () => {} },
  { title: "List", items: FaListUl, action: () => {} },
  { title: "Following", items: MdFollowTheSigns, action: () => {} },
  { title: "Comment", items: RiChatFollowUpFill, action: () => {} },
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
      items: IoMdLogOut,
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
