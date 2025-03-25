import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CardHeaderComponent } from "./commons/components/card-header/card-header.component";
import { filter, map, Subscription } from 'rxjs';
import { MenuBarComponent } from './commons/components/menu-bar/menu-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardHeaderComponent, MenuBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'barber-shop-ui';
  private routeSubscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd), // Observa apenas a conclusão da navegação
      map(() => this.getRouteTitle(this.activatedRoute)) // Obtém o título da rota atual
    ).subscribe(title => {
      this.title = title; // Atualiza o título da aplicação
    });
  }

  ngOnDestroy(): void {
    // Cancela a assinatura para evitar vazamentos de memória
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  // Função que busca o título da rota ativa
  private getRouteTitle(route: ActivatedRoute): string {
    let child = route;
    while (child.firstChild) {
      child = child.firstChild; // Vai até a última rota filha
    }
    // Retorna o título da rota ou 'Default Title' se não houver título definido
    return child.snapshot.data?.['title'] ?? 'Default Title';
  }
}
