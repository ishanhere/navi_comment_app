import { useState, useRef, useEffect } from "react";
import { UpSquareFilled, DownSquareFilled } from "@ant-design/icons";
import { Button, Input } from "antd";

const Comment = ({
  handleaddComment,
  handleeditComment,
  handledeleteComment,
  comment,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    console.log("123");
    if (editMode) {
      handleeditComment(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleaddComment(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handledeleteComment(comment.id);
  };

  return (
    <div>
      <div className={comment.id === 1 ? "inputContainer" : "commentList"}>
        {comment.id === 1 ? (
          <>
            <Input
              type="text"
              className="inputContainer__input first_input"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Comment"
            />

            <Button className="comment" onClick={() => onAddComment()}>
              COMMENT
            </Button>
          </>
        ) : (
          <>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={inputRef}
              style={{ wordWrap: "break-word" }}
            >
              {comment.name}
            </span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Button
                    type="primary"
                    text="SAVE"
                    onClick={() => onAddComment()}
                    className="margin-right-5"
                  >
                    SAVE
                  </Button>
                  <Button
                    danger
                    className="margin-right-5"
                    onClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.name;
                      setEditMode(false);
                    }}
                  >
                    CANCEL
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type={
                      <>
                        {expand ? (
                          <UpSquareFilled width="10px" height="10px" />
                        ) : (
                          <DownSquareFilled width="10px" height="10px" />
                        )}{" "}
                      </>
                    }
                    className="margin-right-5"
                    onClick={() => handleNewComment()}
                  >
                    REPLY
                  </Button>
                  <Button
                    type="dashed"
                    className="margin-right-5"
                    onClick={() => {
                      setEditMode(true);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    danger
                    onClick={() => handleDelete()}
                    className="margin-right-5"
                  >
                    DELETE
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            <Input
              type="text"
              className="inputContainer__input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="primary" onClick={() => onAddComment()}>
              REPLY
            </Button>
            <Button
              onClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            >
              CANCEL
            </Button>
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comment
              key={cmnt.id}
              handleaddComment={handleaddComment}
              handleeditComment={handleeditComment}
              handledeleteComment={handledeleteComment}
              comment={cmnt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
