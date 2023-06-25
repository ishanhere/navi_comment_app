import { useState } from "react";
import Comment from "../components/Comment/Comment";
import { addComment, deleteComment, editComment } from "./api/utils";
import { Col, Row } from "antd";
const comments = {
  id: 1,
  items: [],
};
export default function Home() {
  const [commentsData, setCommentsData] = useState(comments);

  const handleaddComment = (folderId, item) => {
    const temp = addComment(commentsData, folderId, item);
    console.log("temp-insert", temp);
    setCommentsData(temp);
  };

  const handleeditComment = (folderId, value) => {
    const temp = editComment(commentsData, folderId, value);
    console.log("temp-edit", temp);

    setCommentsData(temp);
  };

  const handledeleteComment = (folderId) => {
    const temp = deleteComment(commentsData, folderId);
    console.log("temp-delete-1", temp);
    const temp1 = { ...temp };
    console.log("temp-delete-2", temp1);
    setCommentsData(temp1);
  };

  return (
    <Row>
      <Col span={8} />
      <Col span={8}>
        <h3>Comment Widget</h3>
        <Comment
          handleaddComment={handleaddComment}
          handleeditComment={handleeditComment}
          handledeleteComment={handledeleteComment}
          comment={commentsData}
        />
      </Col>
      <Col span={8} />
    </Row>
  );
}
