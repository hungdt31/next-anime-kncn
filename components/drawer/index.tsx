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
import { link } from "fs";

const infoData = [
  { title: "Personal information", items: FaCircleInfo, action: () => {}, linkHref: "/profile" },
  { title: "List", items: FaListUl, action: () => {}, linkHref: "/list" },
  { title: "Following", items: MdFollowTheSigns, action: () => {}, linkHref: "/list" },
  { title: "Comment", items: RiChatFollowUpFill, action: () => {}, linkHref: "/comments" },
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
      drawer.style.width = "35%";
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
              description: `There was an issue signing you out: ${error}`,
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
          <div className="p-5 flex gap-3 justify-around overflow-hidden flex-col sm:flex-row">
            <div>
              <h4 className="font-bold">Hello, {session.user.name}</h4>
              <p>{session.user.email}</p>
            </div>
            <div className="flex justify-end">
              <img
                loading="lazy"
                className="w-20 h-20 rounded-full"
                src={session.user.image as string}
                alt={session.user.name as string}
              />
            </div>
          </div>
        )}
        <InfoGroup infoData={infoData} />
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
