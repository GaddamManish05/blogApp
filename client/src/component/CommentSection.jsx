import { useState } from "react";

import axios from "axios";

import { toast } from "react-hot-toast";

import { userAuth } from "../AuthStore/AuthStore";

function CommentSection({ article, setArticle }) {

  const BASE_URL = import.meta.env.VITE_API_URL;

  const user = userAuth(
    (state) => state.currentUser
  );

  const COMMENTS_PER_PAGE = 3;

  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);

  // pagination state

  const [visibleComments, setVisibleComments] =
    useState(COMMENTS_PER_PAGE);

  // add comment

  const onAddComment = async () => {

    // validation

    if (!comment.trim()) {

      return toast.error(
        "Comment cannot be empty"
      );
    }

    try {

      setLoading(true);

      const res = await axios.put(

        `${BASE_URL}/user-api/comments`,

        {
          articleId: article._id,
          comment: comment
        },

        {
          withCredentials: true
        }
      );

      console.log(
        "COMMENT RESPONSE:",
        res.data
      );

      // update UI instantly

      setArticle(res.data.payload);

      // clear input

      setComment("");

      toast.success("Comment Added");

    } catch (err) {

      console.log(err);

      toast.error(

        err.response?.data?.message ||

        "Failed to add comment"
      );

    } finally {

      setLoading(false);
    }
  };

  // delete comment

  const onDeleteComment = async (commentId) => {

    const confirmDelete =
      window.confirm(
        "Delete this comment?"
      );

    if (!confirmDelete) return;

    try {

      const res = await axios.delete(

        `${BASE_URL}/user-api/comments/${article._id}/${commentId}`,

        {
          withCredentials: true
        }
      );

      // update UI instantly

      setArticle(res.data.payload);

      toast.success("Comment Deleted");

    } catch (err) {

      console.log(err);

      toast.error(

        err.response?.data?.message ||

        "Delete Failed"
      );
    }
  };

  // permission check

  const canDeleteComment = (commentObj) => {

    // comment owner

    const isCommentOwner =

      commentObj.user?._id === user?._id;

    // article author

    const isArticleAuthor =

      article.author?._id === user?._id;

    // admin

    const isAdmin =

      user?.role === "ADMIN";

    return (

      isCommentOwner ||

      isArticleAuthor ||

      isAdmin
    );
  };

  return (

    <div className="mt-14">

      {/* heading */}

      <h2
        className="
          text-4xl
          font-bold
          mb-8
          uppercase
          text-center
          tracking-wide
        "
      >
        Comments
      </h2>

      {/* comment input */}

      <div
        className="
          flex
          gap-4
          mb-10
        "
      >

        <input

          type="text"

          placeholder="Join discussion..."

          value={comment}

          onChange={(e) =>
            setComment(e.target.value)
          }

          className="
            flex-1
            border
            border-gray-700
            bg-transparent
            rounded-xl
            px-5
            py-4
            outline-none
            text-white
            placeholder:text-gray-500
            focus:border-orange-500
            transition
          "
        />

        <button

          onClick={onAddComment}

          disabled={
            loading ||
            !comment.trim()
          }

          className="
            bg-orange-500
            hover:bg-orange-600
            px-6
            rounded-xl
            text-white
            font-semibold
            transition
            disabled:opacity-50
          "
        >
          {
            loading
              ? "Posting..."
              : "POST"
          }
        </button>

      </div>

      {/* comments list */}

      <div className="space-y-7">

        {
          article.comment?.length > 0 ? (

            [...article.comment]

              // latest first

              .reverse()

              // pagination

              .slice(0, visibleComments)

              .map((commentObj) => (

                <div

                  key={commentObj._id}

                  className="
                    border-b
                    border-gray-800
                    pb-6
                  "
                >

                  {/* top section */}

                  <div className="flex gap-4">

                    {/* avatar */}

                    <div
                      className="
                        min-w-[48px]
                        h-12
                        rounded-full
                        bg-gray-700
                        flex
                        items-center
                        justify-center
                        text-lg
                        font-bold
                        text-white
                      "
                    >
                      {
                        commentObj.user?.firstName?.[0]
                          ?.toUpperCase() || "U"
                      }
                    </div>

                    {/* content */}

                    <div className="flex-1">

                      {/* username */}

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          mb-2
                        "
                      >

                        <h3
                          className="
                            font-semibold
                            text-white
                          "
                        >
                          {
                            commentObj.user?.firstName ||
                            "User"
                          }
                        </h3>

                        <p
                          className="
                            text-sm
                            text-gray-400
                          "
                        >
                          {
                            commentObj.createdAt

                              ? new Date(
                                  commentObj.createdAt
                                ).toLocaleString(
                                  "en-IN",
                                  {
                                    dateStyle:
                                      "medium",

                                    timeStyle:
                                      "short",
                                  }
                                )

                              : ""
                          }
                        </p>

                      </div>

                      {/* comment text */}

                      <p
                        className="
                          text-gray-200
                          break-words
                          leading-relaxed
                        "
                      >
                        {commentObj.comment}
                      </p>

                      {/* actions */}

                      {
                        canDeleteComment(
                          commentObj
                        ) && (

                          <div className="mt-3">

                            <button

                              onClick={() =>
                                onDeleteComment(
                                  commentObj._id
                                )
                              }

                              className="
                                text-red-400
                                hover:text-red-500
                                text-sm
                                transition
                              "
                            >
                              Delete
                            </button>

                          </div>
                        )
                      }

                    </div>

                  </div>

                </div>
              ))

          ) : (

            <p
              className="
                text-center
                text-gray-400
              "
            >
              No comments yet
            </p>
          )
        }

      </div>

      {/* load more */}

      {
        visibleComments <
          article.comment?.length && (

          <div className="mt-8 text-center">

            <button

              onClick={() =>
                setVisibleComments(
                  prev =>
                    prev +
                    COMMENTS_PER_PAGE
                )
              }

              className="
                bg-gray-800
                hover:bg-gray-700
                px-6
                py-3
                rounded-xl
                text-white
                transition
              "
            >
              Load More
            </button>

          </div>
        )
      }

    </div>
  );
}

export default CommentSection;