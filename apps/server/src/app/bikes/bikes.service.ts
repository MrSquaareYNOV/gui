import { Injectable } from '@nestjs/common';

@Injectable()
export class BikesService {

  constructor(private bikes: []) {
    this.bikes = [];
  }

  findAll(): [] {
    return this.bikes;
  }

  find(): string {
    return 'This action returns a bike';
  }

  rent(): string {
    return 'This action rent a bike';
  }

  goBack(): string {
    return 'This action return a bike';
  }

  addBike(): string {
    return 'This action add a bike';
  }

  updateBike(): string {
    return 'this action update a bike';
  }

  deleteBike(): string {
    return 'this action delete a bike';
  }
}
