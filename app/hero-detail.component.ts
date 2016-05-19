import { Component, OnInit } from '@angular/core'
import { RouteParams } from '@angular/router-deprecated'

import { Hero } from './hero';
import { HeroService } from './hero.service'

@Component({
  selector: 'my-hero-detail',
  template: `
  <div *ngIf="hero">
    <h2>{{hero.name}} details!</h2>
    <div>
      <label>id: </label>{{hero.id}}
    </div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="hero.name" placeholder="name"/>
    </div>
  </div>
`
})
export class  HeroDetailComponent implements OnInit {
  hero: Hero

  constructor(
    private heroService: HeroService,
    private routeParams: RouteParams) {
    // body goes here
  }

  ngOnInit() {
    let id = +this.routeParams.get('id');
    this.heroService.getHero(id)
      .then(hero => this.hero = hero)
  }
}
