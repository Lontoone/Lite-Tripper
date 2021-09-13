import { Box, Button } from "@material-ui/core";
import { KeyboardArrowRightOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { UploadImg } from "./firebase";

function UpLoadImgDemo() {
  const [file, setFile] = useState(null);
  const [imgURL, setImgURL] = useState(
    "https://react.semantic-ui.com/images/wireframe/image.png"
  );

  //表單送出事件
  const handleSubmit = (e) => {
    e.preventDefault();
    //上傳圖片請填入參數，第一參數為要上傳資料夾，第二為檔案名稱，第三為檔案本體
    //UploadImg回傳為promise物件，請自己撰寫then去取得數值利用
    const result = UploadImg("ShopImg", file.name, file);
    result.then((link) => setImgURL(link));
  };
  return (
    <div>
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        src={imgURL}
      />
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Button variant="contained" component="label">
          Upload File
          <input
            hidden
            type="file"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setFile(e.target.files[0]);
            }}
          />
        </Button>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightOutlined />}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default UpLoadImgDemo;
