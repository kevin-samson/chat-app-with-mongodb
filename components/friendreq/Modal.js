import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { TbUserPlus } from "react-icons/tb";
import { useSession } from "next-auth/react";
import { mutate } from "swr";

function Modal({ friends }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { data: session } = useSession();

  if (!session) return <p>loading</p>;
  const handleSubmit = (e) => {
    e.preventDefault();
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    if (validateEmail(email)) {
      if (email === session?.user.email) {
        alert("Cant send email to yourself");
      } else if (friends.some((obj) => obj.resEmail === email)) {
        alert("Cant send to the same person");
      } else {
        const body = {
          senderId: session?.user.id,
          senderEmail: session?.user.email,
          resEmail: email,
        };
        fetch("api/friendreq", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        mutate(
          session && "/api/friendreq/" + session.user.email,
          (reqs) => {
            return [...reqs, body];
          },
          false
        );
        setOpen(false);
        setEmail("");
      }
    } else {
      alert("Not a vaild email,Please try again");
    }
  };
  const handleOpen = () => setOpen(!open);
  return (
    <>
      <TbUserPlus
        className="h-5 w-5 text-gray-400 mb-8 cursor-pointer"
        onClick={handleOpen}
      />

      <Dialog open={open} handler={handleOpen} className="bg-darker">
        <DialogHeader className="text-grey-400">Add Contacts</DialogHeader>
        <DialogBody className="flex flex-col border-secondary border-t border-b">
          Enter the email of your friend
          <form onSubmit={handleSubmit}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="bg-secondary w-full mr-8 rounded-lg text-gray-300 border-none focus:ring-lightblue mt-5"
              placeholder="Enter the text"
            />
            <input type="submit" className="hidden" />
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button className="bg-lightblue" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Modal;
