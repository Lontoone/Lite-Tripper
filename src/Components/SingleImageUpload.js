//import { DropzoneArea } from "material-ui-dropzone";
import { Box, Button } from "@material-ui/core";
import React, { useState } from "react";

function SingleImageUpload({ setFile }) {
  const [imgURL, setImgURL] = useState(
    "https://react.semantic-ui.com/images/wireframe/image.png"
  );

  //讀input圖片 preview
  const setPreview = (e) => {
    console.log(e.file);
    var file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImgURL(url);
  };

  return (
    <div>
      <Box
        component="img"
        style={{
          objectFit: "cover",
          display: "flex",
          margin: "0 auto",
        }}
        sx={{
          height: "90%",
          width: "90%",
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        src={imgURL}
      />
      <form
        noValidate
        autoComplete="off"
        //onSubmit={handleSubmit}
      >
        <Button
          variant="contained"
          component="label"
          style={{
            display:"flex",
            margin: "0 auto",
            margin:8,
          }}
        >
          上傳圖片
          <input
            hidden
            type="file"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setFile(e.target.files[0]); //回傳
              setPreview(e);
            }}
          />
        </Button>
        {/*
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          //endIcon={<KeyboardArrowRightOutlined />}
        >
          送出
        </Button>
         */}
      </form>
    </div>
  );
}

export default SingleImageUpload;
