import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';
import { TypeOrmModule,getRepositoryToken  } from '@nestjs/typeorm';
import { Note } from './note.entity';

describe('NoteService', () => {
  let service: NoteService;
  const mockNoteRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        {
          provide: getRepositoryToken(Note),
          useValue: mockNoteRepository,
        },
      ],
    }).compile();
    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

 
  it('Retrieves => Should Retrieves a new note and return its data', async () => {
    // Arrange
    jest.spyOn(mockNoteRepository, 'find');

    // Act
    const result = await service.findAll();

    // Assert
    expect(mockNoteRepository.find).toBeCalled();
    expect(mockNoteRepository.find).toBeCalledWith();
    expect(result);
  });

  it('create => Should create a new note and return its data', async () => {
    // Arrange
    const createNoteDto = {
      id: Date.now(),
      title: 'Sample Note',
      content: 'This is a sample note content.',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const note = {
      id: Date.now(),
      title: 'Sample Note',
      content: 'This is a sample note content.',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(mockNoteRepository, 'save').mockReturnValue(note);

    // Act
    const result = await service.create(createNoteDto);

    // Assert
    expect(mockNoteRepository.save).toBeCalled();
    expect(mockNoteRepository.save).toBeCalledWith(createNoteDto);
    expect(result).toEqual(note);
  });

 it('Updates => Should Updates a new note and return its data', async () => {
    // Arrange
    const updateNoteDto = {
      id: 1,
      title: 'Sample Note',
      content: 'This is a sample note content.',
      createdAt: new Date(),
      updatedAt: new Date(),
   };
    const id = 1
    const note = {
      id: 1,
      title: 'Sample Note',
      content: 'This is a sample note content.',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
   jest.spyOn(mockNoteRepository, 'findOne').mockResolvedValue(note);
  //  jest.spyOn(mockNoteRepository, 'findOne').mockReturnValue(note);
    jest.spyOn(mockNoteRepository, 'update').mockReturnValue({ affected: 1 });

   // Act
    const result = await service.update(id,updateNoteDto);

   // Assert
   expect(result).toEqual({ ...note, ...updateNoteDto });
   expect(mockNoteRepository.findOne).toBeCalled();
   expect(mockNoteRepository.findOne).toBeCalledWith({ where: { id: id } });
   expect(mockNoteRepository.update).toBeCalled();
   expect(mockNoteRepository.update).toBeCalledWith(id, updateNoteDto);
  });

  it('Deletes => Should Deletes a new note and return its data', async () => {
    // Arrange
    const id = 6
    jest.spyOn(mockNoteRepository, 'delete');

    // Act
    const result = await service.delete(id);

    // Assert
    expect(mockNoteRepository.delete).toBeCalled();
    expect(mockNoteRepository.delete).toBeCalledWith(id);
    expect(result);
  });
});
