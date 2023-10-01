import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{
  ngOnInit(): void {
  }
  
  //constructor(private carouselService: CarouselService) {}

  carouselData = [
    {
      id: 1,
      image: 'https://mdbcdn.b-cdn.net/img/new/slides/041.jpg',
      title: 'First slide label',
      description: 'This is the description for the first slide.'
    },
    {
      id: 2,
      image: 'https://mdbcdn.b-cdn.net/img/new/slides/042.jpg',
      title: 'Second Slide',
      description: 'This is the description for the second slide.'
    },
    {
      id: 3,
      image: 'https://mdbcdn.b-cdn.net/img/new/slides/043.jpg',
      title: 'Third Slide',
      description: 'This is the description for the third slide.'
    }
  ];

}
