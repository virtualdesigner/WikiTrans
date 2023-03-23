import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { listSentencesByProject, updateSentencesByProject } from "../services/sentence";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";

const TableWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  margin-bottom: 100px;
`;

const AddNewBtn = styled.button`
  padding: 10px 20px;
  padding-top: 8px;
  background: #ec4816;
  color: white;
  font-family: sans-serif;
  border: none;
  outline: none;
  margin-top: 20px;
  align-self: left;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  border-radius: 3px;
  cursor: pointer;
  text-transform: uppercase;
`;

const Table = styled.table`
  margin-top: 100px;
  max-height: 80%;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 0px 5px 1px #ddd;
  border-collapse: collapse;

  td {
    width: 50px;

    textarea {
      padding: 15px;
      width: 100%;
      height: 100%
    }
  }

  th {
    background: rgba(236, 72, 22, 0.8);
    color: white;
    font-weight: 400;
  }

  th,
  td {
    border-right: 1px solid #ddd;
    padding: 8px;
  }
`;

const Project = () => {
  const [sentences, setSentences] = useState([]);
  const [targetTranslation, setTargetTranslation] = useState("");

  useEffect(() => {
    fetchProjectList();
  }, []);

  const fetchProjectList = () => {
    const projectId = window.location.pathname.split("/").pop();
    setTargetTranslation(projectId.split("_")[0]);
    listSentencesByProject(projectId)
      .then((sentences) => {
        console.log(sentences);
        setSentences(sentences);
      })
      .catch((err) => console.error("Error with fetching projects: ", err));
  };

  const handleSentencesUpdate = () => {
    const projectId = window.location.pathname.split("/").pop();
    updateSentencesByProject(projectId, sentences).then(() => {
        window.alert('Translation submitted successfully. Appreciate your contribution!')
    }).catch(() => window.alert('Something went wrong!'));
  }

  return (
    <TableWrapper>
      <Table>
        <tr>
          <th>Original sentence</th>
          <th>Translation ({targetTranslation.split('-')[0]})</th>
        </tr>
        {sentences &&
          sentences.map((project, idx) => (
            <tr>
              <td>{project.original_sentence}</td>
              <td>
                <ReactTransliterate
                  value={project.translated_sentence}
                  onChangeText={(text) => {
                    const mutatedSentences = [...sentences];
                    mutatedSentences[idx] = {
                      ...mutatedSentences[idx],
                      translated_sentence: text,
                    };
                    setSentences(mutatedSentences);
                  }}
                  renderComponent={(props) => <textarea {...props} />}
                  lang={targetTranslation.split('-')[1]}
                />
              </td>
            </tr>
          ))}
      </Table>
      <AddNewBtn onClick={handleSentencesUpdate}>Submit</AddNewBtn>
    </TableWrapper>
  );
};

export default Project;
