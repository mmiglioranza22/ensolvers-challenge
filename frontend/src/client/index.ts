import axios from "axios";
import { INote, NotePatchDTO } from "../types";

export default class ApiClient {
  static instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  static async getNotes(): Promise<NotePatchDTO[]> {
    const response = await ApiClient.instance.get("/notes");
    return response.data;
  }

  static async getFilteredNotes(active: boolean): Promise<NotePatchDTO[]> {
    const response = await ApiClient.instance.get(`/notes?active=${active}`);
    return response.data;
  }

  static async createNote(data: INote): Promise<NotePatchDTO> {
    const response = await ApiClient.instance.post(`/notes`, data);
    return response.data;
  }

  static async updateNote(
    id: string,
    data: NotePatchDTO
  ): Promise<NotePatchDTO> {
    const response = await ApiClient.instance.patch(`/notes/${id}`, data);
    return response.data;
  }

  static async removeNote(id: string) {
    const response = await ApiClient.instance.delete(`/notes/${id}`);
    return response.data;
  }
}
