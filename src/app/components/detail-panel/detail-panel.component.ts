import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Element, ElementType } from 'src/app/interface';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'ui-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPanelComponent implements OnInit, OnDestroy {
  @Input()
  public element: Element;
  public elementTypes: Array<ElementType>;
  public isLoading = true;
  private elementTypeSubscription: Subscription;

  constructor(private readonly mainService: MainService) {}

  ngOnInit() {
    this.elementTypeSubscription = this.mainService
      .getAllElementTypes()
      .pipe(take(1))
      .subscribe((res) => {
        this.isLoading = false;
        this.elementTypes = res;
      });
  }

  ngOnDestroy() {
    if (this.elementTypeSubscription) {
      this.elementTypeSubscription.unsubscribe();
    }
  }
}
