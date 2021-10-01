import { Component, OnDestroy, OnInit } from '@angular/core';
import { Element, MainService } from './services/main.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public elements: Array<Element>;
  public selected: Element;
  private elementSubscription: Subscription;

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    this.elementSubscription = this.mainService
      .getAllElements()
      .pipe(take(1))
      .subscribe((res) => {
        this.elements = res;
      });
  }

  onSelected(elementUri: string) {
    this.selected = this.elements.find((el) => el.uri === elementUri);
  }

  ngOnDestroy() {
    if (this.elementSubscription) {
      this.elementSubscription.unsubscribe();
    }
  }
}
