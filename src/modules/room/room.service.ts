import { Injectable } from '@nestjs/common'
import { Room } from './room.entity'
import { User } from '../user/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addRoom(roomName: string, host: User) {
    return  await this.roomRepository.save({ name: roomName, host, users: [host] })
  }

  async removeRoom(id: number) {
    return  await this.roomRepository.delete(id)
  }

  // async getRoomHost(hostName: string): Promise<User> {
  //   const roomIndex = await this.getRoomByName(hostName)
  //   return this.rooms[roomIndex].host
  // }

  // async getRoomByName(roomName: string): Promise<number> {
  //   const roomIndex = this.rooms.findIndex((room) => room?.name === roomName)
  //   return roomIndex
  // }

  async addUserToRoom(id: number, user: User) {
    let room = await this.roomRepository.findOne({ where: { id: id } });
      room.users.push(user)
      // const host = await this.getRoomHost(roomName)
      // if (host.id === user.id) {
      //   this.rooms[roomIndex].host.socketId = user.socketId
      // }
   
      return await this.roomRepository.save(room)
    
  }

  async findRoomsByUserSocketId(socketId: string) {
    // const filteredRooms = this.rooms.filter((room) => {
    //   const found = room.users.find((user) => user.socketId === socketId)
    //   if (found) {
    //     return found
    //   }
    // })
    // return this.userRepository.findOne({ where: { socketId: socketId } })
  }

  // async removeUserFromAllRooms(socketId: string): Promise<void> {
  //   const rooms = await this.findRoomsByUserSocketId(socketId)
  //   for (const room of rooms) {
  //     await this.removeUserFromRoom(socketId, room.name)
  //   }
  // }

  // async removeUserFromRoom(socketId: string, roomName: string): Promise<void> {
  //   const room = await this.getRoomByName(roomName)
  //   this.rooms[room].users = this.rooms[room].users.filter((user) => user.socketId !== socketId)
  //   if (this.rooms[room].users.length === 0) {
  //     await this.removeRoom(roomName)
  //   }
  // }

  async getRooms(): Promise<Room[]> {
    return this.roomRepository.find()
  }
}
