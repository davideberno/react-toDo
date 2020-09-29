import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable, { MTableToolbar, MTableCell } from "material-table";

export default function ToDoPage({ user }) {
  const columns = [
    {
      title: "To Do",
      field: "toDo",
      validate: (rowData) => (!rowData.toDo ? "Cannot be empty" : ""),
    },
    {
      title: "Description",
      field: "description",
    },
    { title: "Created", field: "createdAt", type: "date", editable: "never" },
    { title: "Due Date", field: "dueDate", type: "date" },

    {
      title: "Priority",
      field: "priority",
      lookup: { 1: "High", 2: "Medium", 3: "Low" },
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const { data } = await axios.get("/api/todos/all");
      setData(data);
    };
    getTodos();
  }, []);

  const onDone = async (id) => {
    const dataUpdate = [...data];
    const newData = dataUpdate[id];
    newData.isDone = !newData.isDone;
    await axios.put("/api/todos/edit", newData);
    setData([...dataUpdate]);
  };

  const onRowAdd = (newData) =>
    new Promise((resolve, reject) => {
      setTimeout(async () => {
        const res = await axios.post("/api/todos/new", newData);
        setData([...data, res.data]);
        resolve();
      }, 1000);
    });

  const onRowUpdate = (newData, oldData) =>
    new Promise((resolve, reject) => {
      setTimeout(async () => {
        const res = await axios.put("/api/todos/edit", newData);
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = res.data;
        setData([...dataUpdate]);

        resolve();
      }, 1000);
    });

  const onRowDelete = (oldData) =>
    new Promise((resolve, reject) => {
      setTimeout(async () => {
        const res = await axios.post("/api/todos/delete", oldData);
        if (oldData._id === res.data._id) {
          const dataDelete = [...data];
          const index = oldData.tableData.id;
          dataDelete.splice(index, 1);
          setData([...dataDelete]);

          resolve();
        }
      }, 1000);
    });

  const priorityColor = (priority) => {
    if (priority === "High") {
      return "red";
    } else if (priority === "Medium") {
      return "blue";
    } else if (priority === "Low") {
      return "green";
    }
  };

  return (
    <div style={{ maxWidth: "80%", margin: "auto" }}>
      <MaterialTable
        title={`Welcome ${user.firstName} ${user.lastName}`}
        columns={columns}
        data={data}
        editable={{
          onRowAdd,
          onRowUpdate,
          onRowDelete,
        }}
        components={{
          Toolbar: (props) => (
            <div style={{ backgroundColor: "#e8eaf5" }}>
              <MTableToolbar {...props} />
            </div>
          ),
          Cell: (props) => (
            <MTableCell
              {...props}
              style={{
                borderColor: `${priorityColor(props.value)}`,
                textDecoration: `${
                  props.rowData && props.rowData.isDone ? "line-through" : ""
                }`,
              }}
            />
          ),
        }}
        actions={[
          (rowData) =>
            rowData.isDone
              ? {
                  icon: "restore",
                  tooltip: "Restore",
                  onClick: (event, rowData) => onDone(rowData.tableData.id),
                }
              : {
                  icon: "done",
                  tooltip: "Is Done",
                  onClick: (event, rowData) => onDone(rowData.tableData.id),
                },
        ]}
        options={{
          rowStyle: (rowData) => ({
            backgroundColor: rowData.isDone ? "#EEE" : "#FFF",
          }),
        }}
      />
    </div>
  );
}
