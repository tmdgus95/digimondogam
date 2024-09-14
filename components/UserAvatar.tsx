import React from "react";

type Props = {
  user: {
    avatar_url: string;
    email_prefix: string;
  };
};
const UserAvatar = ({ user: { avatar_url, email_prefix } }: Props) => {
  return (
    <div className="">
      <img src={avatar_url} alt="아바타" className="mx-auto w-10 rounded-lg" />
      <p>{email_prefix}</p>
    </div>
  );
};

export default UserAvatar;
