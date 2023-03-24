import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddProjectPopup from "../components/AddProjectPopup";
import { isLoggedIn } from "../services/auth";
import { fetchProjects } from "../services/project";
import { isManager } from "../services/user";

const TableWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  margin-top: 100px;
`;

const AddNewBtn = styled.button`
  padding: 5px 15px;
  padding-top: 3px;
  color: #ec4816;
  background: white;
  border: 1px solid #ec4816;
  font-family: sans-serif;
  outline: none;
  align-self: left;
  display: block;
  margin-left: 10%;
  margin-bottom: 20px;
  border-radius: 3px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 0.8rem;

  span {
    font-size: 1.2rem;
  }
`;

const Table = styled.table`
  max-height: 80%;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 0px 5px 1px #ddd;
  border-collapse: collapse;

  th {
    background: rgba(236, 72, 22, 0.8);
    color: white;
    font-weight: 400;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 10px;
  }

  td:nth-child(3) {
    display: flex;
  }

  tr {
    cursor: pointer;
  }

  tr:hover {
    background: #eee;
    transition: 0.2s ease background;
  }
`;

const AssigneeBox = styled.div`
  padding: 5px;
  background: #eee;
  width: fit-content;
  border-radius: 3px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const EmptyProjectView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    margin-bottom: 20px;
  }

  button {
    margin-left: 0px;
  }
`;

const EmptyProjectText = styled.h2`
  color: #ec4816;
  font-family: sans-serif;
  font-weight: 400;
  font-size: 1.3rem;
  margin-bottom: 80px;
`;

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showAddPopup, setAddPopupState] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) window.location.assign("/");

    fetchProjectList();
  }, []);

  const fetchProjectList = () => {
    fetchProjects()
      .then((projects) => {
        console.log(projects);
        setProjects(projects);
      })
      .catch((err) => console.error("Error with fetching projects: ", err));
  };

  const handleClose = () => {
    setAddPopupState(false);
  };

  const handleRedirectToProject = (projectId) => {
    window.location.assign(`/project/${projectId}`);
  };

  return (
    <TableWrapper>
      {showAddPopup && (
        <AddProjectPopup
          onClose={handleClose}
          reloadProjectList={fetchProjectList}
        />
      )}
      {isManager() && projects.length > 0 && (
        <AddNewBtn onClick={() => setAddPopupState(true)}>
          <span>+</span> New
        </AddNewBtn>
      )}
      {projects.length > 0 ? (
        <Table>
          <tr>
            <th>Wiki Title</th>
            <th>Target Language</th>
            <th>Assignees</th>
          </tr>
          {projects.map((project) => (
            <tr onClick={() => handleRedirectToProject(project.project_id)}>
              <td>{project.wiki_title}</td>
              <td>{project.target_lang.split("-")[0]}</td>
              <td>
                {project.assigned_to.map((assignee) => (
                  <AssigneeBox>{assignee}</AssigneeBox>
                ))}
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <EmptyProjectView>
          <EmptyProjectText>No projects exist.</EmptyProjectText>
          {isManager() && (
            <AddNewBtn onClick={() => setAddPopupState(true)}>
              <span>+</span> New
            </AddNewBtn>
          )}
        </EmptyProjectView>
      )}
    </TableWrapper>
  );
};

export default Dashboard;
