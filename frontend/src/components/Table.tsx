import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import Note from "./Note";
import { NotePatchDTO } from "../types";

const columns = ["#", "Title", "Content", "Date", "Status", "Tags"];
const tableHead = (
  <TableHead>
    <TableRow>
      {columns.map((column) => {
        return <TableCell key={column}>{column}</TableCell>;
      })}
    </TableRow>
  </TableHead>
);

interface IProps {
  handleClickNote: (note: NotePatchDTO) => void;
  notes: NotePatchDTO[];
}

const BasicTable = ({ handleClickNote, notes }: IProps) => {
  return (
    <TableContainer
      sx={{ minWidth: 800, maxHeight: "70%", overflow: "scroll" }}
      component={Paper}
    >
      <Table aria-label="notes-table" stickyHeader>
        {tableHead}
        <TableBody>
          {notes?.length === 0 ? (
            <TableRow className="no-notes-feedback-container">
              <Typography className="no-notes-feedback">
                You have no notes. Create one!
              </Typography>
            </TableRow>
          ) : (
            notes?.map((note) => (
              <Note
                note={note}
                key={`${note?.id}-${note?.title ?? "note"}`}
                handleClick={handleClickNote}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default BasicTable;
