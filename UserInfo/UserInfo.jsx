import Button from "../Layouts/Button";
import Input from "../Layouts/Input";
import Text from "../Layouts/Text";
import ReturnButton from "../Layouts/ReturnButton";
import Link from "../Layouts/Link";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { useTranslation } from "react-i18next";
import CustomLoadingButton from "../Layouts/CustumLoadingButton";

import useScreenOrientation from "react-hook-screen-orientation";
import Landscape from "./Landscape";
import ProfilePic from "../Layouts/ProfilePic";


function UserInfo() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [provedPhone, setProvedPhone] = useState(false);
  const [address, setAddress] = useState("");
  const [provedAddress, setProvedAddress] = useState(false);
  const [gallaries, setGallaries] = useState([]);
  const [pending, setPending] = useState(false);

  const [error, setError] = useState("");

  const { t, i18n } = useTranslation(["login"]);
  const orientation = useScreenOrientation();

  const fetchGallaries = () => {
    fetch("http://172.20.10.10:8000/api/gallaries/")
      .then((res) => res.json())
      .then((data) => {
        setGallaries(data);
      })
      .catch((err) => {
        setError(err.message)
      }
      )
  };

  useEffect(() => {
    fetchGallaries();
  }, []);

  const handleLogin = () => {
    setPending(true);

    for (const gallary of gallaries) {
      if (phone == gallary.phone) {
        setProvedPhone(true);
        if (address == gallary.address) {
          setProvedAddress(true);
          localStorage.setItem("user", JSON.stringify(gallary));
          navigate("/dashboard");
          return;
        } else {
          setPending(false);
          setError(t("Password is not correct!"));

          return;
        }
      }
    }

    if (!provedPhone) {
      setPending(false);
      setError(t("You have to fill"));
    }
  };
  return (
    <>
      {orientation == true ||
      orientation == true ? (
        <Landscape />
      ) : (
        <>
        
          <ReturnButton path="/" />
          <div style={{ alignItems: "center" }}>
          <ProfilePic width={50}/>
          
          <Input text={t("Phone number")} stateChanger={setPhone} />
            <Input
              type={"address"}
              text={t("Address")}
              stateChanger={setAddress}
            />
            
              <textarea placeholder="About you" className="about" name="about" rows="4" cols="100"></textarea>
            <div style={{ marginTop: "30px" }} />
            

            {error != "" && (
              <Text marginTop={"25px"} color={"red-text"} text={error} />
            )}

            <div style={{ marginTop: "50px" }} />
            {!pending && (
              <Button text={t("next")} stateChanger={handleLogin} />
            )}
            {pending && <CustomLoadingButton />}
            
          </div>
        </>
      )}
    </>
  );
}

export default UserInfo;