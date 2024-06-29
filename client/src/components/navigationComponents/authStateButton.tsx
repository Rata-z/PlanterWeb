import { User } from "firebase/auth";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { User as UserItem } from "@nextui-org/user";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import React from "react";
import { HiOutlineUser } from "react-icons/hi";
interface AuthStateProps {
  currentUser: User | null;
  signOut: () => Promise<void>;
}

function AuthStateButton({ props }: { props: AuthStateProps }) {
  return (
    <div className="hidden self-center text-nowrap sm:inline-block">
      {props.currentUser ? (
        <Dropdown
          radius="sm"
          classNames={{
            content: "p-0 border-small border-divider bg-accent",
          }}
        >
          <DropdownTrigger>
            <Button
              size="sm"
              isIconOnly
              className="self-center rounded-bl-2xl rounded-br-md rounded-tl-md rounded-tr-2xl bg-card p-1 shadow-xl"
            >
              <HiOutlineUser className="text-foreground" size={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disabledKeys={["profile"]}
            className="p-3"
            itemClasses={{
              base: [
                "rounded-lg",

                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-card-foreground",
                "data-[hover=true]:bg-card",
                "data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
              ],
            }}
          >
            <DropdownItem
              isReadOnly
              key="profile"
              className="h-14 gap-2 opacity-100"
            >
              <UserItem
                name={props.currentUser.displayName}
                description={props.currentUser.email}
                classNames={{
                  name: "text-default-600",
                  description: "text-default-500",
                }}
              />
            </DropdownItem>
            <DropdownItem key="dashboard" href={`/${props.currentUser.uid}`}>
              Dashboard
            </DropdownItem>
            <DropdownItem
              key="settings"
              href={`/${props.currentUser.uid}/settings`}
            >
              Settings
            </DropdownItem>
            <DropdownItem
              key="logOut"
              onPress={props.signOut}
              className="text-danger"
              color="danger"
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Link className="text-card-foreground" href={"/sign-in"}>
          SIGN IN
        </Link>
      )}
    </div>
  );
}

export default AuthStateButton;
