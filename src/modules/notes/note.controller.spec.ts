import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

describe('NoteController', () => {
  let controller: NoteController;
  let spyService: NoteService;
  beforeEach(async () => {
    const NoteServiceProvider = {
      provide: NoteService,
      useFactory: () => ({
        findAll: jest.fn(() => 4.5),
        create: jest.fn(() => 4.5),
        update: jest.fn(() => 4.5),
        delete: jest.fn(() => 4.5),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService, NoteServiceProvider],
    }).compile();
    controller = module.get<NoteController>(NoteController);
    spyService = module.get<NoteService>(NoteService);
  });

  describe('findAll', () => {
    it('should call findAll for a note', async () => {
      controller.findAll();
      expect(spyService.findAll).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should retrieve findAll for a note', async () => {
      expect(spyService.findAll()).toBe(4.5);
    });
  });

  describe('create', () => {
    it('should call create for a note', async () => {
      const note = {
        id:4,
        title: "note Title",
        content: "note content",
        createdAt: new Date,
        updatedAt: new Date,
      }
      controller.create(note);
      expect(spyService.create).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should retrieve create for a note', async () => {
      const note = {
        id:4,
        title: "note Title",
        content: "note content",
        createdAt: new Date,
        updatedAt: new Date,
      }
      expect(spyService.create(note)).toBe(4.5);
    });
  });

  describe('update', () => {
    it('should call update for a note', async () => {
      const id = 4
      const note = {
        id:4,
        title: "note Title",
        content: "note content",
        createdAt: new Date,
        updatedAt: new Date,
      }
      controller.update(id,note);
      expect(spyService.update).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should retrieve update for a note', async () => {
      const id = 4
      const note = {
        id:4,
        title: "note Title",
        content: "note content",
        createdAt: new Date,
        updatedAt: new Date,
      }
      expect(spyService.update(id,note)).toBe(4.5);
    });
  });

  describe('delete', () => {
    it('should call delete for a note', async () => {
      const id = 4
      controller.delete(id);
      expect(spyService.delete).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should retrieve delete for a note', async () => {
      const id = 4
      expect(spyService.delete(id)).toBe(4.5);
    });
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
