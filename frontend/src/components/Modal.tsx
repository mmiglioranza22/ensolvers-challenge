import { useFormik } from "formik";
import * as yup from "yup";
import {
  Typography,
  Modal,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextareaAutosize,
  Button,
} from "@mui/material";
import ApiClient from "../client";
import { INote, NotePatchDTO } from "../types";
import moment from "moment";

const validationSchema = yup.object({
  title: yup
    .string()
    .min(4, "Enter a title of at least 4 characters")
    .required("Title is required"),
});

interface IProps {
  open: boolean;
  handleClose: () => void;
  initialNote?: NotePatchDTO | null;
  setNotes: React.Dispatch<React.SetStateAction<NotePatchDTO[]>>;
}

const NoteModal = ({ open, handleClose, initialNote, setNotes }: IProps) => {
  const formik = useFormik({
    initialValues: {
      title: initialNote?.title ?? "",
      content: initialNote?.content ?? "",
      active: initialNote?.active ?? true,
      category: null,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (initialNote && initialNote.id) {
          const payload: NotePatchDTO = {
            id: initialNote.id,
            ...values,
          };

          const updatedNote = await ApiClient.updateNote(
            `${initialNote.id}`,
            payload
          );

          setNotes((prevNotes) => {
            const updatedNotes = prevNotes?.map((note) =>
              note.id === updatedNote.id ? updatedNote : note
            );
            return updatedNotes;
          });
        } else {
          const payload: INote = values as unknown as INote;
          const newNote = await ApiClient.createNote(payload);
          setNotes((prevNotes) => [...prevNotes, newNote]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        handleClose();
        formik.resetForm();
      }
    },
  });

  // TODO TBD
  const handleDelete = async () => {
    if (initialNote && initialNote.id) {
      await ApiClient.removeNote(`${initialNote.id}`);
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes?.filter(
          (note) => note.id !== initialNote.id
        );
        return updatedNotes;
      });
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="note-modal"
      aria-describedby="note-modal-creation-form"
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="modal-note-form">
          <Typography variant="h5" fontWeight={700}>
            {initialNote ? "Edit note" : "New note"}
          </Typography>
          <div className="top-fields">
            <TextField
              aria-label="note title input field"
              variant="standard"
              placeholder="Note title here..."
              defaultValue={initialNote?.title ?? ""}
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.title && formik.errors.title}
              error={formik.touched.title && Boolean(formik.errors.title)}
              sx={{
                width: "280px",
              }}
            />

            <RadioGroup row name="active" value={formik.values.active}>
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Active"
                aria-label="note active status option"
                onClick={() => formik.setFieldValue("active", true)}
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Archived"
                aria-label="note archived status option"
                disabled={initialNote ? false : true}
                onClick={() => formik.setFieldValue("active", false)}
              />
            </RadioGroup>
          </div>
          <Typography>
            Date: {moment(initialNote?.date).format("DD/MM/YYYY") ?? "Today"}
          </Typography>
          <TextareaAutosize
            aria-label="note content input field"
            maxLength={250}
            placeholder="Note content here...(Max 250 characters)"
            defaultValue={initialNote?.content ?? ""}
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
            style={{
              resize: "none",
              minHeight: "100%",
            }}
          />
          <div className="modal-actions">
            <Button
              aria-label="cancel-note-button"
              variant="outlined"
              color="info"
              size="large"
              onClick={handleClose}
              sx={{ minWidth: "100px" }}
            >
              Cancel
            </Button>
            {initialNote ? (
              <Button
                aria-label="clear-note-button"
                variant="contained"
                color="error"
                size="large"
                sx={{ minWidth: "100px" }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            ) : (
              <Button
                aria-label="clear-note-button"
                variant="contained"
                color="info"
                size="large"
                sx={{ minWidth: "100px" }}
                onClick={formik.handleReset}
              >
                Clear
              </Button>
            )}
            <Button
              aria-label="save-note-button"
              variant="contained"
              color="success"
              size="large"
              sx={{ minWidth: "100px" }}
              type="submit"
              disabled={!formik.dirty || !formik.isValid}
            >
              {initialNote ? "Save changes" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default NoteModal;
