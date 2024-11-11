import Camera from "../../assets/Media/camera.png";
import React from "react";

function ProfilePic(params) {
    const mystyle = {
        marginLeft: "" + (100 - params.width) / 2 + "%",
        width: "" + params.width + "%",
      };

  return (
    <>
      <img style={mystyle} src={Camera} className="logo" />
        <p className="title" >please upload your profile picture</p>
    </>
  );
}

export default ProfilePic;