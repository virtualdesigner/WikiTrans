import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";

import { login } from "../services/auth";
import DropdownWithCheckboxes from "./DropdownList";
import CloseBtnImg from "../assets/close-button.png";
import { getAnnotators } from "../services/user";
import { createProject } from "../services/project";

const PopupWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: rgba(0,0,0,0.1);
`;

const Popup = styled.form`
  height: fit-content;
  position: relative;
  padding: 50px;
  padding-top: 40px;
  background: white;
  width: 80%;
  box-shadow: 0px 0px 3px 1px #aaa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  margin-top: auto;
  margin-bottom: auto;

  h2 {
    font-family: sans-serif;
    font-weight: 400;
    font-size: 1.3rem;
    margin-top: 0;
    margin-bottom: 30px;
    color: #ec4816;
  }

  & > div > input,
  & > div > select {
    padding: 10px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 3px;
    width: 48%;
    font-size: 0.8rem;
  }

  select {
    margin-left: 10px;
  }
`;

const CloseBtn = styled.img`
  position: absolute;
  right: 15px;
  top: 15px;
  height: 18px;
  cursor: pointer;
`;

const AddProjectBtn = styled.button`
  padding: 5px 20px;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  background-color: #ec4816;
  border-radius: 3px;
  font-family: sans-serif;
  font-weight: 800;
  font-size: 1rem;
  margin-top: 25px;
  font-size: 1rem;
  font-weight: 400;
`;

export default function AddProjectPopup({ onClose, reloadProjectList }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [wikiTitle, setWikiTitle] = useState("");
  const [annotators, setAnnotators] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState("bengali-bn");

  useEffect(() => {
    getAnnotators()
      .then((res) => {
        setAnnotators(res.map((annotator) => annotator.username));
      })
      .catch((err) => console.error("Error with fetching annotators: ", err));
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const username = JSON.parse(localStorage.getItem("user")).username;
    if (
      annotators.length > 0 &&
      wikiTitle.length > 0 &&
      !!targetLanguage &&
      !!username
    ) {
      console.log(annotators, wikiTitle, targetLanguage, username);
      createProject({
        project_id: `${targetLanguage}_${wikiTitle}`,
        wiki_title: wikiTitle,
        target_lang: targetLanguage,
        created_by: username,
        created_at: Date.now(),
        assigned_to: annotators,
      }).then(() => {
        reloadProjectList();
        onClose();
      });
    }
  };

  return (
    <PopupWrapper>
      <Popup onSubmit={handleSubmit}>
        <CloseBtn src={CloseBtnImg} onClick={onClose} />
        <h2>New Project</h2>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <input
            placeholder="Wiki Title"
            required
            onChange={(e) => setWikiTitle(e.target.value)}
            value={wikiTitle}
          />
          <select
            name="cars"
            id="cars"
            required
            onChange={(e) => setTargetLanguage(e.target.value)}
            value={targetLanguage}
          >
            <option value="bengali-bn">Bengali (bn)</option>
            <option value="gujarati-gu">Gujarati (gu)</option>
            <option value="hindi-hi">Hindi (hi)</option>
            <option value="kannada-kn">Kannada (kn)</option>
            <option value="malayalam-ml">Malayalam (ml)</option>
            <option value="marathi-mr">Marathi (mr)</option>
            <option value="nepali-ne">Nepali (ne)</option>
            <option value="oriya-or">Oriya (or)</option>
            <option value="punjabi-pa">Punjabi (pa)</option>
            <option value="sinhalese-si">Sinhalese (si)</option>
            <option value="tamil-ta">Tamil (ta)</option>
            <option value="telugu-te">Telugu (te)</option>
            <option value="urdu-ur">Urdu (ur)</option>
          </select>
        </div>
        <DropdownWithCheckboxes
          options={annotators}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <AddProjectBtn type="submit">Create</AddProjectBtn>
      </Popup>
    </PopupWrapper>
  );
}
