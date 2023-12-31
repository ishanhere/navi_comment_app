import { useState, useRef, useEffect } from "react";
import { UpSquareFilled, DownSquareFilled } from "@ant-design/icons";
import { Alert, Button, Input, Popconfirm } from "antd";

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
    if (editMode) {
      if (inputRef?.current?.innerText === "") return;
      handleeditComment(comment.id, inputRef?.current?.innerText);
    } else {
      console.log(input);
      if (input === "") return;
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
              className={`${editMode ? "editComment" : ""}`}
            >
              {comment.name}
            </span>
            <div className="margin-left-5 font-size-10 time">
              At : {new Date(comment.id).toLocaleString()}
            </div>
            <div className="flex margin-top-5">
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
                    icon={
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

                  <Popconfirm
                    placement="rightTop"
                    title={"Are you sure want to delete ?"}
                    // description={description}
                    onConfirm={() => handleDelete()}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      danger
                      // onClick={() => handleDelete()}
                      className="margin-right-5"
                    >
                      DELETE
                    </Button>
                  </Popconfirm>
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
