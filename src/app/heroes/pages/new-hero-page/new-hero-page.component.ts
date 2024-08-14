import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrl: './new-hero-page.component.css'
})
export class NewHeroPageComponent {


  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('',{nonNullable:true}),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),
  })

  public publisher = [
    {
      id: 'DC Comics',
      desc:'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc:'Marvel - Comics'
    }
  ]



  constructor (private heroesServices: HeroesService) {

  }


  public get currentHero() : Hero {
    const hero = this.heroForm.value as Hero;
    return hero
  }


  public onSubmit = (): void => {
    if (this.heroForm.invalid) {
      return
    }

    if(this.currentHero.id){
      this.heroesServices.updateHero(this.currentHero)
        .subscribe(hero => {
          //TODO: mostrar snackbar
        });

        return;
    }

    this.heroesServices.addHero(this.currentHero)
      .subscribe(hero =>{
        //TODO: mostrar snackbar, y navegar a heroes/edit/ hero.id
      })

    // this.heroesServices.updateHero(this.heroForm.value)
  }

}
