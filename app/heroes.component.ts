import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router-deprecated'

import { Hero } from './hero'
import { HeroService } from './hero.service'
import { HeroDetailComponent } from './hero-detail.component'

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
      styleUrls:['app/heroes.component.css'],
  directives: [HeroDetailComponent],
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero
  heroes: Hero[]
  addingHero = false
  error: any

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes()
  }

  addHero() {
    this.addingHero = true
    this.selectedHero = null
  }

  close(savedHero: Hero) {
    this.addingHero = false
    if (savedHero) {
      this.getHeroes()
    }
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero
    this.addingHero = false
  }

  delete(hero: Hero, event: any) {
    event.stopPropagation()
    this.heroService
        .delete(hero)
        .then(res => {
          this.heroes = this.heroes.filter(h => h.id !== hero.id)
        })
        .catch(error => this.error = error) // TODO: display error message
  }

  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes)
  }

  gotoDetail() {
    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }])
  }
}
