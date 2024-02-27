import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function MyQuill({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  return (
    <div style={{ height: "30vh", marginBottom: "8vh", marginTop: "2vh" }}>
      <ReactQuill modules={modules} value={value} onChange={onChange} style={{ height: "100%" }} />
    </div>
  );
}

export default MyQuill;
