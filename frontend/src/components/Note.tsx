import { TableCell, TableRow, Typography } from "@mui/material";
import { NotePatchDTO } from "../types";
import moment from "moment";

interface IProps {
  note: NotePatchDTO;
  handleClick: (note: NotePatchDTO) => void;
}

const renderValue = (value?: boolean) => {
  switch (value) {
    case false:
    case undefined:
      return "Archived";
    case true:
      return "Active";
  }
};

const Note = ({ note, handleClick }: IProps) => {
  return (
    <TableRow className="note-row" onClick={() => handleClick(note)}>
      <TableCell sx={{ maxWidth: "200px" }}>
        <Typography noWrap>{note.id}</Typography>
      </TableCell>
      <TableCell sx={{ maxWidth: "200px" }}>
        <Typography noWrap>{note.title}</Typography>
      </TableCell>
      <TableCell sx={{ maxWidth: "200px" }}>
        <Typography noWrap>{note.content}</Typography>
      </TableCell>
      <TableCell sx={{ maxWidth: "200px" }}>
        <Typography noWrap>{moment(note.date).format("DD/MM/YYYY")}</Typography>
      </TableCell>
      <TableCell sx={{ maxWidth: "200px" }}>
        <Typography noWrap>{renderValue(note.active)}</Typography>
      </TableCell>
      <TableCell sx={{ maxWidth: "200px" }}>
        <Typography noWrap>{note.category}</Typography>
      </TableCell>
    </TableRow>
  );
};

export default Note;
