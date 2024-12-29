import axios from "axios";

export const imageToUrl = async (file) => {
  const data = new FormData();
  data.append("file", file),
    data.append("upload_preset", "Assignora"),
    data.append("cloud_name", import.meta.env.VITE_cloudinaryAPI);
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_cloudinaryAPI
    }/image/upload`,
    data
  );
  const compressedUrl = `${res.data.url.replace(
    "/upload/",
    "/upload/q_auto:low/"
  )}`;

  return compressedUrl;
};
