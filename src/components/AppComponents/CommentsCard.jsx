import moment from "moment";
import React from "react";

const CommentsCard = ({ comment }) => {
  // console.log(comment);
  return (
    <>
      <div className="w-full bg-green-100 p-5 flex flex-col gap-2 rounded-xl">
        <div className="flex flex-wrap items-center gap-x-2">
          {comment.name}
          <time className="text-xs opacity-50 ">{moment(comment.time).format("MMM Do YY")}</time>
        </div>
        <div className="">{comment.comment}</div>
      </div>
    </>
  );
};

export default CommentsCard;
