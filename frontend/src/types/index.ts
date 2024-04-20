export type NotePatchDTO = {
  id: number;
  title?: string;
  content?: string;
  date?: string;
  active?: boolean;
  category?: string | null;
};

export type INote = {
  title: string;
  content: string;
  date: string;
  active: boolean;
  category: string;
};
