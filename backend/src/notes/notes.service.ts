import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}
  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.noteRepository.create(createNoteDto);
    return this.noteRepository.save(note);
  }

  async findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  async findActive(active: boolean): Promise<Note[]> {
    return this.noteRepository.findBy({ active });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    return this.noteRepository.save({
      ...note,
      ...updateNoteDto,
    });
  }

  async remove(id: number) {
    const note = await this.noteRepository.findOne({ where: { id } });
    return this.noteRepository.delete(note.id);
  }
}
