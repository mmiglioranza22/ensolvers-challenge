import { useEffect, useState } from "react";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import BasicTable from "./components/Table";
import NoteModal from "./components/Modal";
import { NotePatchDTO } from "./types";
import ApiClient from "./client";

const App = () => {
  // Modal logic --
  const [open, setOpen] = useState(false);
  const handleToggle = (open: boolean) => setOpen(open);
  const [initialNote, setInitialNote] = useState<NotePatchDTO | null>(null);
  const [notes, setNotes] = useState<NotePatchDTO[]>([]);
  const [filter, setFilter] = useState<boolean | null>(null);

  const handleClickNote = (note: NotePatchDTO) => {
    setInitialNote(note);
    setOpen(true);
  };
  const handleClose = () => {
    handleToggle(false);
    setInitialNote(null);
  };

  const fetchNotes = async () => {
    try {
      const notes = await ApiClient.getNotes();
      setNotes(notes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (filter === null) {
      fetchNotes();
    } else {
      const fetchFilterNotes = async () => {
        const filteredNotes = await ApiClient.getFilteredNotes(filter);
        setNotes(filteredNotes);
      };
      fetchFilterNotes();
    }
  }, [filter]);

  return (
    <div className="main-container">
      <NoteModal
        open={open}
        handleClose={handleClose}
        initialNote={initialNote}
        setNotes={setNotes}
      />
      <div className="container">
        <nav className="main-actions">
          <Button
            variant="contained"
            className="new-note-btn"
            onClick={() => handleToggle(true)}
          >
            Create new note
          </Button>
          <div className="filter-container">
            <Typography className="title">Filter by status:</Typography>
            <RadioGroup row value={filter}>
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Active"
                aria-label="filter by active status option"
                onClick={() => setFilter(true)}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Archived"
                aria-label="filter by archived status option"
                onClick={() => setFilter(false)}
              />
              <FormControlLabel
                value={null}
                control={<Radio />}
                label="All"
                aria-label="get all notes option"
                onClick={() => setFilter(null)}
              />
            </RadioGroup>
          </div>
        </nav>
        <BasicTable handleClickNote={handleClickNote} notes={notes} />
      </div>
    </div>
  );
};

export default App;
